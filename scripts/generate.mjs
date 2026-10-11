/*
 * Generate both SDKs from the OpenAPI contract, stamped with info.version.
 *
 *   node scripts/generate.mjs                  generate
 *   node scripts/generate.mjs --check          generate, then fail if committed output drifted
 *   node scripts/generate.mjs --print-version  print info.version and exit
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
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
const fernBin = path.join(
  repoRoot,
  "node_modules",
  ".bin",
  isWindows ? "fern.cmd" : "fern"
);

if (!existsSync(fernBin) && !existsSync(cliEntry)) {
  process.stderr.write("fern CLI not found. Run `npm install` first.\n");
  process.exit(1);
}

const args = ["generate", "--local", "--no-prompt", "--version", version];

process.stdout.write(`generating SDKs at version ${version}\n`);

const useNode = existsSync(cliEntry);
const command = useNode ? process.execPath : fernBin;
const commandArgs = useNode ? [cliEntry, ...args] : args;

const result = spawnSync(command, commandArgs, {
  cwd: fernDir,
  stdio: "inherit",
  shell: !useNode && isWindows,
});

if (result.status !== 0) {
  if (result.error) {
    process.stderr.write(`${result.error.message}\n`);
  }
  process.stderr.write(
    "\nGeneration failed. `fern generate --local` runs the generators inside Docker.\n" +
      "  - make sure Docker is running\n" +
      "  - on a machine without Docker, push the contract and let CI generate it\n"
  );
  process.exit(result.status ?? 1);
}

if (argv.has("--check")) {
  const diff = spawnSync("git", ["diff", "--quiet", "--exit-code", "--", "packages"], {
    cwd: repoRoot,
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (diff.status !== 0) {
    process.stderr.write(
      "\nGenerated SDKs are out of date with fern/openapi/openapi.yml.\n" +
        "Run `npm run fern:generate` and commit packages/ in the same commit as the contract change.\n"
    );
    process.exit(1);
  }

  process.stdout.write("generated SDKs match the committed output\n");
}