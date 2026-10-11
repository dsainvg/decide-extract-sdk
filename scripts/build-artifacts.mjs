/*
 * Build every generated SDK and collect the distributable artifacts into
 * release-artifacts/, which the release workflow attaches to the GitHub Release.
 *
 *   node scripts/build-artifacts.mjs
 *
 * npm and PyPI artifacts are also collected here so the release pane has one complete
 * set of files, even though those two are published to their registries as well.
 * Missing toolchains are skipped with a message rather than failing the run.
 */

import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { repoRoot } from "./contract.mjs";

const isWindows = process.platform === "win32";
const outDir = path.join(repoRoot, "release-artifacts");
const packagesDir = path.join(repoRoot, "packages");

function run(command, args, cwd) {
  process.stdout.write(`\n$ ${command} ${args.join(" ")}   [${path.relative(repoRoot, cwd)}]\n`);
  const result = spawnSync(command, args, { cwd, stdio: "inherit", shell: isWindows });
  return { ok: result.status === 0, missing: Boolean(result.error) };
}

function collect(patterns, language) {
  const found = [];

  for (const pattern of patterns) {
    const [dir, extension] = pattern.split("|");
    const absolute = path.join(packagesDir, dir);
    if (!existsSync(absolute)) continue;

    const walk = (current) => {
      for (const entry of readdirSync(current, { withFileTypes: true })) {
        const full = path.join(current, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (!extension || entry.name.endsWith(extension)) found.push(full);
      }
    };

    walk(absolute);
  }

  if (found.length === 0) return 0;

  for (const file of found) {
    copyFileSync(file, path.join(outDir, `${language}-${path.basename(file)}`));
  }

  process.stdout.write(`  collected ${found.length} ${language} artifact(s)\n`);
  return found.length;
}

const BUILDS = [
  {
    language: "typescript",
    dir: "sdk-ts",
    ready: () => existsSync(path.join(packagesDir, "sdk-ts", "package.json")),
    build: () => {
      const dir = path.join(packagesDir, "sdk-ts");
      if (run("npm", ["install", "--no-audit", "--no-fund"], dir).missing) return false;
      if (!run("npm", ["run", "build"], dir).ok) return false;
      const tarball = run("npm", ["pack", "--pack-destination", "../../release-artifacts"], dir);
      if (tarball.ok) {
        const packed = readdirSync(path.join(packagesDir, "sdk-ts"))
          .filter((f) => f.endsWith(".tgz"))
          .map((f) => path.join(packagesDir, "sdk-ts", f));
        for (const file of packed) {
          const target = path.join(outDir, `typescript-${path.basename(file)}`);
          if (existsSync(file) && file !== target) copyFileSync(file, target);
        }
      }
      return tarball.ok;
    },
    patterns: ["sdk-ts/dist|"],
  },
  {
    language: "python",
    dir: "sdk-py",
    ready: () => existsSync(path.join(packagesDir, "sdk-py", "pyproject.toml")),
    build: () => {
      const dir = path.join(packagesDir, "sdk-py");
      const uv = run("uv", ["build", "--out-dir", "../../release-artifacts"], dir);
      return uv.ok;
    },
    patterns: [],
  },
  {
    language: "ruby",
    dir: "sdk-ruby",
    ready: () => existsSync(path.join(packagesDir, "sdk-ruby")),
    build: () => {
      const dir = path.join(packagesDir, "sdk-ruby");
      const gemspec = readdirSync(dir).find((f) => f.endsWith(".gemspec"));
      if (!gemspec) return false;
      return run("gem", ["build", gemspec], dir).ok;
    },
    patterns: ["sdk-ruby|.gem"],
  },
  {
    language: "rust",
    dir: "sdk-rust",
    ready: () => existsSync(path.join(packagesDir, "sdk-rust", "Cargo.toml")),
    build: () => {
      const dir = path.join(packagesDir, "sdk-rust");
      if (!run("cargo", ["build"], dir).ok) return false;
      if (!run("cargo", ["test"], dir).ok) return false;
      return run("cargo", ["package", "--allow-dirty", "--no-verify"], dir).ok;
    },
    patterns: ["sdk-rust/target/package|.crate"],
  },
  {
    language: "java",
    dir: "sdk-java",
    ready: () => existsSync(path.join(packagesDir, "sdk-java", "pom.xml")),
    build: () => {
      const dir = path.join(packagesDir, "sdk-java");
      const built = run("mvn", ["-q", "package"], dir);
      if (!built.ok) return false;
      return run(
        "mvn",
        ["-q", "dependency:copy-dependencies", "-DoutputDirectory=../../release-artifacts/java"],
        dir
      ).ok;
    },
    patterns: ["sdk-java/target|.jar"],
  },
  {
    language: "csharp",
    dir: "sdk-csharp",
    ready: () => existsSync(path.join(packagesDir, "sdk-csharp")),
    build: () => {
      const dir = path.join(packagesDir, "sdk-csharp");
      if (!run("dotnet", ["build", "-c", "Release"], dir).ok) return false;
      return run("dotnet", ["pack", "-c", "Release", "-o", "../../release-artifacts"], dir).ok;
    },
    patterns: [],
  },
];

mkdirSync(outDir, { recursive: true });

let built = 0;
let skipped = 0;

for (const build of BUILDS) {
  const label = build.language;
  if (!build.ready()) {
    process.stdout.write(`\nskipping ${label}: packages/${build.dir} not generated\n`);
    skipped += 1;
    continue;
  }

  process.stdout.write(`\n${label}\n`);
  if (!build.build()) {
    process.stderr.write(`\n${label} failed to build\n`);
    process.exit(1);
  }
  collect(build.patterns, label);
  built += 1;
}

const files = existsSync(outDir) ? readdirSync(outDir) : [];
const bytes = files.reduce((total, file) => total + statSync(path.join(outDir, file)).size, 0);

process.stdout.write(
  `\n${built} package(s) built, ${skipped} skipped, ${files.length} artifact(s) in ` +
    `${path.relative(repoRoot, outDir)} (${(bytes / 1024).toFixed(1)} KiB)\n`
);

if (files.length === 0) {
  process.stderr.write("\nno artifacts collected, the release would have nothing to attach\n");
  process.exit(1);
}