/*
 * Build and test every generated SDK. Missing packages and missing toolchains are
 * skipped, but a real build or test failure fails the run.
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

/*
 * The C# generator writes into src/<Project>/, not into the package root, so a
 * top level search finds nothing and the SDK reads as absent when it is not.
 */
function findProject(root, predicate) {
  if (!existsSync(root)) return null;

  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const found = walk(full);
        if (found) return found;
      } else if (entry.name.endsWith(".csproj") && predicate(entry.name)) {
        return full;
      }
    }
    return null;
  };

  return walk(root);
}

function has(command, args = ["--version"]) {
  return spawnSync(command, args, { stdio: "ignore", shell: isWindows }).status === 0;
}

function missingTools(tools) {
  return tools.filter((tool) => !has(tool));
}

const TARGETS = [
  {
    flag: "--ts",
    label: "TypeScript",
    dir: tsPackageDir,
    present: () => existsSync(path.join(tsPackageDir, "package.json")),
    tools: [],
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
    tools: ["uv"],
    steps: () => {
      const steps = [["uv", ["sync", "--all-groups"]]];
      const hasTests =
        existsSync(path.join(pyPackageDir, "test")) || existsSync(path.join(pyPackageDir, "tests"));
      if (hasTests) steps.push(["uv", ["run", "--group", "dev", "pytest", "-q"]]);
      return steps;
    },
  },
  {
    flag: "--rb",
    label: "Ruby",
    dir: path.join(repoRoot, "packages", "sdk-ruby"),
    present: () => existsSync(path.join(repoRoot, "packages", "sdk-ruby", "Gemfile")),
    tools: ["bundle", "gem"],
    steps: () => {
      const dir = path.join(repoRoot, "packages", "sdk-ruby");
      const steps = [["bundle", ["install"]]];

      if (existsSync(path.join(dir, "Rakefile"))) {
        // Fern's Ruby SDK uses minitest through rake
        steps.push(["bundle", ["exec", "rake", "test"]]);
      } else {
        steps.push(["bundle", ["exec", "rspec"]]);
      }

      const gemspec = findFile(dir, (f) => f.endsWith(".gemspec"));
      if (gemspec) steps.push(["gem", ["build", path.basename(gemspec)]]);
      return steps;
    },
  },
  {
    flag: "--rs",
    label: "Rust",
    dir: path.join(repoRoot, "packages", "sdk-rust"),
    present: () => existsSync(path.join(repoRoot, "packages", "sdk-rust", "Cargo.toml")),
    tools: ["cargo"],
    steps: () => [
      ["cargo", ["build"]],
      ["cargo", ["test"]],
    ],
  },
  {
    flag: "--java",
    label: "Java",
    dir: path.join(repoRoot, "packages", "sdk-java"),
    present: () => existsSync(path.join(repoRoot, "packages", "sdk-java")),
    tools: ["mvn"],
    steps: () => {
      const dir = path.join(repoRoot, "packages", "sdk-java");
      if (existsSync(path.join(dir, "pom.xml"))) return [["mvn", ["-B", "verify"]]];
      if (existsSync(path.join(dir, "build.gradle")) || existsSync(path.join(dir, "build.gradle.kts"))) {
        return [[isWindows ? "gradlew.bat" : "./gradlew", ["test"]]];
      }
      process.stdout.write("  no pom.xml or build.gradle in packages/sdk-java\n");
      return [];
    },
  },
{
    flag: "--cs",
    label: ".NET",
    dir: path.join(repoRoot, "packages", "sdk-csharp"),
    present: () => Boolean(findProject(path.join(repoRoot, "packages", "sdk-csharp"), () => true)),
    tools: ["dotnet"],
    steps: () => {
      const root = path.join(repoRoot, "packages", "sdk-csharp");
      const main = findProject(root, (name) => !name.includes(".Test."));
      const tests = findProject(root, (name) => name.includes(".Test."));
      if (!main) return [];

      const steps = [["dotnet", ["build", "-c", "Release", path.relative(root, main)]]];
      if (tests) steps.push(["dotnet", ["test", "-c", "Release", path.relative(root, tests)]]);
      return steps;
    },
  },
];

function run(command, args, cwd) {
  const where = path.relative(repoRoot, cwd) || ".";
  process.stdout.write(`\n$ ${command} ${args.join(" ")}   [${where}]\n`);

  const result = spawnSync(command, args, { cwd, stdio: "inherit", shell: isWindows });

  if (result.error) {
    process.stderr.write(`\n${result.error.message}\n`);
    process.exit(1);
  }

  if (result.status !== 0) {
    process.stderr.write(`\n${command} ${args[0]} failed in ${where} with exit code ${result.status}\n`);
    process.exit(result.status ?? 1);
  }
}

const wanted = new Set(process.argv.slice(2));
const selected = TARGETS.filter((t) => wanted.size === 0 || wanted.has(t.flag));

let ran = 0;
let skipped = 0;
const idle = [];

for (const target of selected) {
  if (!target.present()) {
    process.stdout.write(
      `skipping ${target.label} SDK: ${path.relative(repoRoot, target.dir)} not generated yet\n`
    );
skipped += 1;
    idle.push(`${target.label}: not generated`);
    continue;
  }

  const absent = missingTools(target.tools);
  if (absent.length > 0) {
    process.stdout.write(
      `skipping ${target.label} SDK: ${absent.join(", ")} not installed\n`
    );
    skipped += 1;
    idle.push(`${target.label}: ${absent.join(", ")} not installed`);
    continue;
  }

  const steps = target.steps();
  if (steps.length === 0) {
    /*
     * Nothing to run means nothing was verified. A CI job that lands here and
     * still reports success is worse than a red one, because it reads as though
     * the language was built and tested.
     */
    process.stderr.write(`\n${target.label} SDK: no build file, nothing was verified\n`);
    idle.push(`${target.label}: no build file`);
    continue;
  }

  process.stdout.write(`\n${target.label} SDK\n`);
  for (const [command, args] of steps) {
    run(command, args, target.dir);
  }
  ran += 1;
}

process.stdout.write(`\n${ran} SDK(s) built and tested, ${skipped} skipped\n`);

if (idle.length > 0) {
  process.stderr.write(`\nnothing was verified for: ${idle.join("; ")}\n`);
  process.exit(1);
}

if (idle.length === 0 && wanted.size > 0 && ran === 0) {
  process.stdout.write("nothing to test yet, run `npm run fern:generate` first\n");
  process.exit(1);
}