/*
 * Write the package manifests, and stamp the version into every language.
 *
 * Fern wipes each output directory before it generates, so anything written by
 * hand inside packages/ is deleted on the next run. The manifests live in
 * templates/ instead and are rendered here after generation, with the version
 * taken from the contract so they can never drift from it.
 *
 *   node scripts/write-manifests.mjs
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { contractVersion, javaPackageDir, pyPackageDir, repoRoot, tsPackageDir } from "./contract.mjs";

const templatesDir = path.join(repoRoot, "templates");

const TARGETS = [
  { dir: tsPackageDir, files: ["package.json", "tsconfig.json", "tsconfig.build.json"] },
  { dir: pyPackageDir, files: ["pyproject.toml"] },
  { dir: javaPackageDir, files: ["pom.xml"] },
];

const version = await contractVersion();
let written = 0;

for (const target of TARGETS) {
  for (const file of target.files) {
    const source = path.join(templatesDir, path.basename(target.dir), file);

    if (!existsSync(source)) {
      process.stderr.write(`template missing: ${path.relative(repoRoot, source)}\n`);
      process.exit(1);
    }

    const rendered = readFileSync(source, "utf8").replaceAll("__VERSION__", version);

    mkdirSync(target.dir, { recursive: true });
    writeFileSync(path.join(target.dir, file), rendered, "utf8");
    written += 1;
    process.stdout.write(`wrote ${path.relative(repoRoot, path.join(target.dir, file))} at ${version}\n`);
  }
}

/*
 * The generators that embed the version in their own sources are stamped here.
 *
 * Rust in particular ignores the contract version entirely, which left the crate
 * publishing as 0.1.0 while every other SDK was on the release version, and it
 * carried the generator's own license and repository URL rather than ours.
 */
const REPO_URL = "https://github.com/dsainvg/decide-extract-sdk";

const STAMPS = [
  {
    label: "ruby version",
    file: () => {
      const dir = path.join(repoRoot, "packages", "sdk-ruby", "lib");
      if (!existsSync(dir)) return null;
      const entry = readdirSync(dir).find((name) => existsSync(path.join(dir, name, "version.rb")));
      return entry ? path.join(dir, entry, "version.rb") : null;
    },
    rewrite: (text) => text.replace(/VERSION = "[^"]*"/, `VERSION = "${version}"`),
  },
  {
    label: "rust manifest",
    file: () => path.join(repoRoot, "packages", "sdk-rust", "Cargo.toml"),
    rewrite: (text) =>
      text
        .replace(/^version = "[^"]*"/m, `version = "${version}"`)
        .replace(/^license = "[^"]*"/m, 'license = "Apache-2.0"')
        .replace(/^repository = "[^"]*"/m, `repository = "${REPO_URL}"`)
        .replace(/^documentation = "[^"]*"/m, `documentation = "${REPO_URL}/tree/main/packages/sdk-rust"`),
  },
  {
    label: "dotnet version",
    file: () => {
      const src = path.join(repoRoot, "packages", "sdk-csharp", "src");
      if (!existsSync(src)) return null;
      const entry = readdirSync(src).find((name) => existsSync(path.join(src, name, `${name}.csproj`)));
      return entry ? path.join(src, entry, `${entry}.csproj`) : null;
    },
    rewrite: (text) => text.replace(/<Version>[^<]*<\/Version>/, `<Version>${version}</Version>`),
  },
  {
    label: "dotnet version constant",
    file: () => {
      const src = path.join(repoRoot, "packages", "sdk-csharp", "src");
      if (!existsSync(src)) return null;
      for (const entry of readdirSync(src)) {
        const candidate = path.join(src, entry, "Core", "Public", "Version.cs");
        if (existsSync(candidate)) return candidate;
      }
      return null;
    },
    rewrite: (text) => text.replace(/Current = "[^"]*"/, `Current = "${version}"`),
  },
];

for (const stamp of STAMPS) {
  const file = stamp.file();
  if (!file || !existsSync(file)) {
    process.stdout.write(`skip ${stamp.label}, nothing generated there yet\n`);
    continue;
  }

  const before = readFileSync(file, "utf8");
  const after = stamp.rewrite(before);
  if (after === before) {
    process.stdout.write(`${stamp.label} already at ${version}\n`);
    continue;
  }

  writeFileSync(file, after, "utf8");
  written += 1;
  process.stdout.write(`stamped ${path.relative(repoRoot, file)} at ${version}\n`);
}

process.stdout.write(`${written} manifest(s) written\n`);

/* The lockfiles belong to the toolchain, not the contract, and churn per run. */
const generatedLockfiles = [
  path.join(tsPackageDir, "package-lock.json"),
  path.join(pyPackageDir, "uv.lock"),
];

for (const lockfile of generatedLockfiles) {
  if (existsSync(lockfile)) {
    process.stdout.write(`note: ${path.relative(repoRoot, lockfile)} is gitignored\n`);
  }
}