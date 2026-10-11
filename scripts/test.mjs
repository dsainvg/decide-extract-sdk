/*
 * Build and test every generated SDK. Missing packages are skipped, so this is
 * safe to run before the first generation.
 *
 *   node scripts/test.mjs              all languages
 *   node scripts/test.mjs --ts --py     one or more of:
 *                                       --ts --py --rb --rs --java --cs
 */

import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { pyPackageDir, repoRoot, tsPackageDir } from "./contract.mjs";

const isWindows = process.platform === "win32";
const npmCmd = isWindows ? "npm.cmd" : "npm";

function findFile(dir, predicate) {
  if (!existsSync(dir)) return null;
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isFile() && predicate(entry)) return full;
  }
  return null;
}

const TARGETS = [
  {
    flag: "--ts",
    label: "TypeScript",
    dir: tsPackageDir,
    present: () => existsSync(path.join(tsPackageDir, "package.json")),
    steps: () => [
      [npmCmd, ["install", "--no-audit", "--no-fund"]],
      [npmCmd, ["run", "build"]],
      [npmCmd, ["test", "--if-present"]],
    ],
  },
  {
    flag: "--py",
    label: "Python",
    dir: pyPackageDir,
    present: () => existsSync(path.join(pyPackageDir, "pyproject.toml")),
    steps: () => {
      const steps = [["uv", ["sync", "--all-groups"]]];
      const hasTests =
        existsSync(path.join(pyPackageDir, "test")) ||
        existsSync(path.join(pyPackageDir, "tests"));
      if (hasTests) steps.push(["uv", ["run", "--group", "dev", "pytest", "-q"]]);
      return steps;
    },
  },
  {
    flag: "--rb",
    label: "Ruby",
    dir: path.join(repoRoot, "packages", "sdk-ruby"),
    present: () => existsSync(path.join(repoRoot, "packages", "sdk-ruby", "Gemfile")),
    steps: () => {
      const steps = [["bundle", ["install"]], ["bundle", ["exec", "rspec"]]];
      const gemspec = findFile(path.join(repoRoot, "packages", "sdk-ruby"), (f) =>
        f.endsWith(".gemspec")
      );
      if (gemspec) steps.push(["gem", ["build", path.basename(gemspec)]]);
      return steps;
    },
  },
  {
    flag: "--rs",
    label: "Rust",
    dir: path.join(repoRoot, "packages", "sdk-rust"),
    present: () => existsSync(path.join(repoRoot, "packages", "sdk-rust", "Cargo.toml")),
    steps: () => [
      ["cargo", ["build"]],
      ["cargo", ["test"]],
    ],
  },
  {
    flag: "--java",
    label: "Java",
    dir: path.join(repoRoot, "packages", "sdk-java"),
    present: () => existsSync(path.join(repoRoot, "packages", "sdk-java", "pom.xml")),
    steps: () => [["mvn", ["-q", "test"]]],
  },
  {
    flag: "--cs",
    label: ".NET",
    dir: path.join(repoRoot, "packages", "sdk-csharp"),
    present: () =>
      Boolean(findFile(path.join(repoRoot, "packages", "sdk-csharp"), (f) => f.endsWith(".csproj"))),
    steps: () => [
      ["dotnet", ["build"]],
      ["dotnet", ["test"]],
    ],
  },
];

function run(command, args, cwd, { optional = false } = {}) {
  const where = path.relative(repoRoot, cwd) || ".";
  process.stdout.write(`\n$ ${command} ${args.join(" ")}   [${where}]\n`);

  const result = spawnSync(command, args, { cwd, stdio: "inherit", shell: isWindows });

  if (result.error) {
    if (optional) {
      process.stdout.write(`  skipped: ${command} not installed\n`);
      return true;
    }
    process.stderr.write(`\n${result.error.message}\n`);
    process.exit(1);
  }

  if (result.status !== 0) {
    if (optional) return true;
    process.exit(result.status ?? 1);
  }

  return true;
}

const wanted = new Set(process.argv.slice(2));
const selected = TARGETS.filter((t) => wanted.size === 0 || wanted.has(t.flag));

let ran = 0;

for (const target of selected) {
  if (!target.present()) {
    process.stdout.write(
      `skipping ${target.label} SDK: ${path.relative(repoRoot, target.dir)} not generated yet\n`
    );
    continue;
  }

  process.stdout.write(`\n${target.label} SDK\n`);
  for (const [command, args] of target.steps()) {
    run(command, args, target.dir, { optional: true });
  }
  ran += 1;
}

if (ran === 0) {
  process.stdout.write("\nnothing to test yet, run `npm run fern:generate` first\n");
}