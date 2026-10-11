/*
 * Bump the released version in the contract (info.version) and regenerate the SDKs.
 *
 *   node scripts/bump.mjs patch|minor|major|0.2.0
 *
 * The contract version is the only version that matters: npm and PyPI both get it,
 * and release CI refuses to publish unless the git tag matches it.
 */

import { readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import process from "node:process";
import { contractVersion, repoRoot, specPath } from "./contract.mjs";

const requested = process.argv[2];

if (!requested) {
  process.stderr.write("usage: node scripts/bump.mjs patch|minor|major|<version>\n");
  process.exit(1);
}

const current = await contractVersion();
const [major, minor, patch] = current.split(".").map(Number);

let next;
if (requested === "major") {
  next = `${major + 1}.0.0`;
} else if (requested === "minor") {
  next = `${major}.${minor + 1}.0`;
} else if (requested === "patch") {
  next = `${major}.${minor}.${patch + 1}`;
} else if (/^\d+\.\d+\.\d+$/.test(requested)) {
  next = requested;
} else {
  process.stderr.write(`Invalid bump target: ${requested}\n`);
  process.exit(1);
}

if (next === current) {
  process.stderr.write(`Version is already ${current}\n`);
  process.exit(1);
}

const spec = await readFile(specPath, "utf8");
const updated = spec.replace(
  /^(\s{2}version:\s*)["']?[^"'\s#]+["']?(\s*)$/m,
  `$1${next}$2`
);

if (updated === spec) {
  process.stderr.write(`Could not rewrite info.version in ${specPath}\n`);
  process.exit(1);
}

await writeFile(specPath, updated, "utf8");
process.stdout.write(`${current} -> ${next}\n`);

const generate = spawnSync(process.execPath, ["scripts/generate.mjs"], {
  cwd: repoRoot,
  stdio: "inherit",
});

if (generate.status !== 0) {
  process.stderr.write(
    "\nVersion bumped but SDK regeneration failed (Docker required).\n" +
      "Run `npm run fern:generate` once Docker is available, then commit both files together.\n"
  );
  process.exit(generate.status ?? 1);
}

process.stdout.write(
  "\nnext steps:\n" +
    "  git add fern/openapi/openapi.yml packages\n" +
    `  git commit -m "release: v${next}"\n` +
    `  git tag -a v${next} -m "v${next}" && git push origin main --tags\n`
);