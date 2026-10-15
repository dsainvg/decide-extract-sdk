/*
 * Generate every SDK from the OpenAPI contract, stamped with info.version.
 *
 *   node scripts/generate.mjs                  generate
 *   node scripts/generate.mjs --check          generate, then fail if committed output drifted
 *   node scripts/generate.mjs --print-version  print info.version and exit
 *
 * Generators run one at a time. Run as a group they execute concurrently and, in
 * CI, the outputs of one generator disappear before the run finishes, so each
 * generator gets its own fern invocation and its output directory is checked
 * before moving on.
 */

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { contractVersion, fernDir, repoRoot } from "./contract.mjs";

const argv = new Set(process.argv.slice(2));
const version = await contractVersion();

if (argv.has("--print-version")) {
  process.stdout.write(`${version}\n`);
  process.exit(0);
}

const isWindows = process.platform === "win32";
const cliEntry = path.join(repoRoot, "node_modules", "fern-api", "cli.cjs");
const fernBin = path.join(repoRoot, "node_modules", ".bin", isWindows ? "fern.cmd" : "fern");

if (!existsSync(fernBin) && !existsSync(cliEntry)) {
  process.stderr.write("fern CLI not found. Run `npm install` first.\n");
  process.exit(1);
}

/* Read the generators straight out of generators.yml: name, then its output path. */
function readGenerators() {
  const source = readFileSync(path.join(fernDir, "generators.yml"), "utf8");
  const generators = [];
  const blocks = source.split(/\n\s*-\s+name:\s*/).slice(1);

  for (const block of blocks) {
    const name = block.split("\n")[0].trim();
    const pathMatch = /output:[\s\S]*?path:\s*(\S+)/.exec(block);
    if (!name || !pathMatch) continue;
    const output = pathMatch[1].replace(/^["']|["']$/g, "");
    generators.push({ name, output: path.resolve(fernDir, output) });
  }

  return generators;
}

function countFiles(dir) {
  if (!existsSync(dir)) return 0;
  let total = 0;
  const walk = (current) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full);
      else total += 1;
    }
  };
  walk(dir);
  return total;
}

const useNode = existsSync(cliEntry);
const command = useNode ? process.execPath : fernBin;

function runFern(generator) {
  const qualified = generator.name.includes("/") ? generator.name : `fernapi/${generator.name}`;
  const args = [
    "generate",
    "--local",
    "--no-prompt",
    "--force",
    "--version",
    version,
    "--generator",
    qualified,
  ];
  return spawnSync(command, useNode ? [cliEntry, ...args] : args, {
    cwd: fernDir,
    stdio: "inherit",
    shell: !useNode && isWindows,
  });
}

if (argv.has("--check")) {
  const packagesDir = path.join(repoRoot, "packages");

  if (!existsSync(packagesDir) || countFiles(packagesDir) === 0) {
    process.stderr.write(
      "\npackages/ is empty, so no SDK has ever been generated here.\n" +
        "Run `npm run fern:generate`, or merge the 'chore: regenerate SDKs' pull request.\n"
    );
    process.exit(1);
  }

  const status = spawnSync("git", ["status", "--porcelain", "--", "packages"], {
    cwd: repoRoot,
    encoding: "utf8",
    shell: isWindows,
  });

  if (status.status !== 0) {
    process.stderr.write("\ngit status failed, cannot verify the generated SDKs\n");
    process.exit(1);
  }

  const dirty = (status.stdout ?? "").trim();

  if (dirty) {
    const missing = dirty.split("\n").every((line) => line.startsWith("??"));
    process.stderr.write(
      missing
        ? "\npackages/ is not committed yet, but the SDKs are generated from a contract.\n" +
            "Merge the 'chore: regenerate SDKs' pull request, or run `npm run fern:generate`\n" +
            "and commit packages/ yourself.\n"
        : "\nGenerated SDKs are out of date with fern/openapi/openapi.yml.\n" +
            "Run `npm run fern:generate` and commit packages/ in the same commit as the\n" +
            "contract change, or merge the 'chore: regenerate SDKs' pull request.\n"
    );
    process.stderr.write(`\n${dirty.split("\n").slice(0, 8).join("\n")}\n`);
    process.exit(1);
  }

  process.stdout.write("generated SDKs match the committed output\n");
  process.exit(0);
}

const generators = readGenerators();

if (generators.length === 0) {
  process.stderr.write("no generators found in fern/generators.yml\n");
  process.exit(1);
}

process.stdout.write(`generating ${generators.length} SDKs at version ${version}, one at a time\n\n`);

const failed = [];

for (const [index, generator] of generators.entries()) {
  process.stdout.write(`[${index + 1}/${generators.length}] ${generator.name}\n`);

  const before = countFiles(generator.output);
  const result = runFern(generator);
  const after = countFiles(generator.output);

  if (result.status !== 0) {
    process.stderr.write(`  fern exited with ${result.status}\n`);
    failed.push(generator.name);
    continue;
  }

  if (after === 0) {
    process.stderr.write(`  produced no files in ${path.relative(repoRoot, generator.output)}\n`);
    failed.push(generator.name);
    continue;
  }

  process.stdout.write(
    `  ${path.relative(repoRoot, generator.output)}: ${before} -> ${after} files\n`
  );
}

process.stdout.write("\n");

if (failed.length > 0) {
  process.stderr.write(
    `generation failed or produced nothing for: ${failed.join(", ")}\n` +
      "`fern generate --local` runs each generator in Docker; check that Docker is running.\n"
  );
  process.exit(1);
}

/*
 * Fern wipes each output directory before generating, so the package manifests
 * are written afterwards from templates/, stamped with the contract version.
 */
const manifests = spawnSync(process.execPath, ["scripts/write-manifests.mjs"], {
  cwd: repoRoot,
  stdio: "inherit",
  shell: isWindows,
});

if (manifests.status !== 0) {
  process.stderr.write("\nfailed to write the package manifests\n");
  process.exit(manifests.status ?? 1);
}

/*
 * An OpenAPI-only Fern definition has no API name, so the generators fall back
 * to the organization. Rewrite the generated symbols to dexa-sdk here, while
 * the drift check below is still going to catch a rename that does not compile.
 */
const renamed = spawnSync(process.execPath, ["scripts/rename-symbols.mjs"], {
  cwd: repoRoot,
  stdio: "inherit",
  shell: isWindows,
});

if (renamed.status !== 0) {
  process.stderr.write("\nfailed to rename the generated symbols\n");
  process.exit(renamed.status ?? 1);
}