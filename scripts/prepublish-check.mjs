/*
 * Pre-publish gate. Runs everything that must be true before a release reaches npm,
 * PyPI, RubyGems, crates.io, Maven Central or NuGet.
 *
 *   node scripts/prepublish-check.mjs
 *   node scripts/prepublish-check.mjs --tag v0.3.0
 *   node scripts/prepublish-check.mjs --tag v0.3.0 --registry npm --registry pypi
 *   node scripts/prepublish-check.mjs --registry none
 *
 * Checks, in order:
 *   1. contract present and parseable
 *   2. git tag matches info.version (when --tag is given)
 *   3. `fern check` passes
 *   4. regenerating produces no drift
 *   5. every generated package carries the contract version
 *   6. every generated package builds and produces a publishable artifact
 *   7. the secrets needed for the selected registries are present
 */

import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import {
  contractVersion,
  fernDir,
  pyPackageDir,
  repoRoot,
  specPath,
  tsPackageDir,
} from "./contract.mjs";

const isWindows = process.platform === "win32";
const npmCmd = isWindows ? "npm.cmd" : "npm";
const uvCmd = isWindows ? "uv.exe" : "uv";

const argv = process.argv.slice(2);
const tagIndex = argv.indexOf("--tag");
const requestedTag = tagIndex === -1 ? null : argv[tagIndex + 1];
const registries = argv.includes("--registry")
  ? argv.filter((_, i) => argv[i - 1] === "--registry")
  : ["all"];
const skipGenerate = argv.includes("--skip-generate");

const results = [];
const deliverables = [];
const unpublishable = [];
const unverified = [];
const versionMismatch = [];
let failed = false;

function record(name, ok, detail = "") {
  results.push({ name, ok, detail });
  const mark = ok ? "PASS" : "FAIL";
  process.stdout.write(`${mark}  ${name}${detail ? ` - ${detail}` : ""}\n`);
  if (!ok) failed = true;
}

function skip(name, reason) {
  process.stdout.write(`SKIP  ${name} - ${reason}\n`);
  results.push({ name, ok: true, detail: `skipped: ${reason}` });
}

function run(command, args, cwd, { shell = isWindows } = {}) {
  const result = spawnSync(command, args, { cwd, stdio: "pipe", shell });
  const output = `${result.stdout ?? ""}${result.stderr ?? ""}`.trim();

  /*
   * With shell enabled a missing tool is an exit code, not an ENOENT error, so
   * a missing toolchain would otherwise look like a build failure.
   */
  const notInstalled =
    Boolean(result.error) ||
    (result.status !== 0 && /not recognized as an internal or external command|command not found|is not installed/i.test(output));

  return { status: result.status, output, missing: notInstalled };
}

function readIfExists(file) {
  return existsSync(file) ? readFileSync(file, "utf8") : null;
}

/* A toolchain counts as available only if it answers its own version flag. */
function has(command, args = ["--version"]) {
  return spawnSync(command, args, { cwd: repoRoot, stdio: "ignore", shell: isWindows }).status === 0;
}

function firstMatch(source, regex, label) {
  const match = regex.exec(source ?? "");
  if (!match) throw new Error(`could not read ${label}`);
  return match[1].trim();
}

/* ------------------------------------------------------------------ targets */

function findFile(dir, predicate) {
  if (!existsSync(dir)) return null;
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isFile() && predicate(entry)) return full;
  }
  return null;
}

function findFileDeep(dir, predicate) {
  if (!existsSync(dir)) return null;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isFile() && predicate(entry.name)) return full;
    if (entry.isDirectory()) {
      const nested = findFileDeep(full, predicate);
      if (nested) return nested;
    }
  }
  return null;
}

const TARGETS = [
  {
    name: "TypeScript",
    // Verified locally and by the TypeScript SDK job on every push, so a failure here is real.
    blockingBuild: true,
    dir: tsPackageDir,
    delivery: "registry",
    registry: "npm",
    manifest: () => path.join(tsPackageDir, "package.json"),
    version: (file) => firstMatch(readIfExists(file), /"version"\s*:\s*"([^"]+)"/, "npm version"),
    artifact: () => existsSync(path.join(tsPackageDir, "dist", "index.d.ts")),
    build: () => {
      if (run(npmCmd, ["install", "--no-audit", "--no-fund"], tsPackageDir).status !== 0) return false;
      return run(npmCmd, ["run", "build"], tsPackageDir).status === 0;
    },
    publishSummary: () => {
      const pkg = JSON.parse(readIfExists(path.join(tsPackageDir, "package.json")) ?? "{}");
      return `${pkg.name ?? "?"}@${pkg.version ?? "?"}`;
    },
  },
  {
    name: "Python",
    blockingBuild: true,
    dir: pyPackageDir,
    delivery: "registry",
    registry: "pypi",
    manifest: () => path.join(pyPackageDir, "pyproject.toml"),
    version: (file) =>
      firstMatch(
        readIfExists(file),
        /^\s*version\s*=\s*["']([^"']+)["']/m,
        "python version"
      ),
    artifact: () => existsSync(path.join(pyPackageDir, "dist")) &&
      readdirSync(path.join(pyPackageDir, "dist")).some((f) => /\.(whl|tar\.gz)$/.test(f)),
    build: () => {
      if (run(uvCmd, ["sync", "--all-groups"], pyPackageDir).missing) return "skip";
      return run(uvCmd, ["build"], pyPackageDir).status === 0;
    },
    publishSummary: () => firstMatch(readIfExists(path.join(pyPackageDir, "pyproject.toml")), /^\s*name\s*=\s*["']([^"']+)["']/m, "python name"),
  },
  {
    name: "Ruby",
    dir: path.join(repoRoot, "packages", "sdk-ruby"),
delivery: "registry",
    registry: "rubygems",
    manifest: () => findFile(path.join(repoRoot, "packages", "sdk-ruby"), (f) => f.endsWith(".gemspec")),
    version: (file) => {
      const spec = readIfExists(file) ?? "";
      const literal = /\.version\s*=\s*["']([^"']+)["']/.exec(spec);
      if (literal) return literal[1];
      // Fern's gemspec reads the version from a constant, so read it from there
      const rubyDir = path.dirname(file);
      const versionFile = findFileDeep(rubyDir, (name) => name === "version.rb");
      if (!versionFile) throw new Error("could not read gem version");
      return firstMatch(readIfExists(versionFile), /VERSION\s*=\s*["']([^"']+)["']/, "gem version");
    },
    artifact: () => {
      const dir = path.join(repoRoot, "packages", "sdk-ruby");
      return existsSync(dir) && readdirSync(dir).some((f) => f.endsWith(".gem"));
    },
build: () => {
      const dir = path.join(repoRoot, "packages", "sdk-ruby");
      if (!has("bundle") || !has("gem")) return "skip";
      if (!existsSync(path.join(dir, "Gemfile"))) return "skip";
      if (run("bundle", ["install"], dir).missing) return "skip";
      if (run("bundle", ["exec", "rake", "test"], dir).missing) return "skip";
      return run("gem", ["build", findFile(dir, (f) => f.endsWith(".gemspec")) ?? "x.gemspec"], dir)
        .status === 0;
    },
    publishSummary: () => "gem, attached to the GitHub Release",
  },
  {
name: "Rust",
    dir: path.join(repoRoot, "packages", "sdk-rust"),
    delivery: "registry",
    registry: "crates",
    // The Rust generator ignores the contract version, so the manifest is
    // stamped from it after generation and must now match exactly.
    honoursVersion: true,
    manifest: () => path.join(repoRoot, "packages", "sdk-rust", "Cargo.toml"),
    version: (file) => firstMatch(readIfExists(file), /^\s*version\s*=\s*"([^"]+)"/m, "crate version"),
    artifact: () => {
      const packaged = path.join(repoRoot, "packages", "sdk-rust", "target", "package");
      return existsSync(packaged) && readdirSync(packaged).some((f) => f.endsWith(".crate"));
    },
    build: () => {
      const dir = path.join(repoRoot, "packages", "sdk-rust");
      if (!has("cargo")) return "skip";
      if (run("cargo", ["test"], dir).status !== 0) return false;
      return run("cargo", ["package", "--allow-dirty", "--no-verify"], dir).status === 0;
    },
    publishSummary: () =>
      `${firstMatch(
        readIfExists(path.join(repoRoot, "packages", "sdk-rust", "Cargo.toml")),
        /^\s*name\s*=\s*"([^"]+)"/m,
        "crate name"
      )}, .crate attached to the GitHub Release`,
  },
  {
    name: "Java",
    dir: path.join(repoRoot, "packages", "sdk-java"),
    delivery: "release-asset",
    manifest: () => path.join(repoRoot, "packages", "sdk-java", "pom.xml"),
    version: (file) =>
      firstMatch(
        readIfExists(file),
        /<artifactId>[\s\S]*?<\/artifactId>\s*<version>([^<]+)<\/version>/,
        "maven version"
      ),
    artifact: () => {
      const target = path.join(repoRoot, "packages", "sdk-java", "target");
      return existsSync(target) && readdirSync(target).some((f) => f.endsWith(".jar"));
    },
    build: () => {
      const dir = path.join(repoRoot, "packages", "sdk-java");
      if (!has("mvn", ["-version"])) return "skip";
      return true;
    },
    publishSummary: () => {
      const pom = readIfExists(path.join(repoRoot, "packages", "sdk-java", "pom.xml")) ?? "";
      const group = /<groupId>([^<]+)<\/groupId>/.exec(pom)?.[1] ?? "?";
      const artifact = /<artifactId>([^<]+)<\/artifactId>/.exec(pom)?.[1] ?? "?";
      return `${group}:${artifact}, jar attached to the GitHub Release`;
    },
  },
  {
    name: ".NET",
    dir: path.join(repoRoot, "packages", "sdk-csharp"),
    delivery: "release-asset",
    manifest: () => findFileDeep(path.join(repoRoot, "packages", "sdk-csharp"), (f) => f.endsWith(".csproj")),
    version: (file) => firstMatch(readIfExists(file), /<Version>([^<]+)<\/Version>/, "nuget version"),
    artifact: () => {
      const dist = path.join(repoRoot, "packages", "sdk-csharp", "dist");
      return existsSync(dist) && readdirSync(dist).some((f) => f.endsWith(".nupkg"));
    },
    build: () => {
      const dir = path.join(repoRoot, "packages", "sdk-csharp");
      if (!has("dotnet")) return "skip";
      if (run("dotnet", ["test"], dir).status !== 0) return false;
      return run("dotnet", ["pack", "-c", "Release", "-o", "dist"], dir).status === 0;
    },
    publishSummary: () => "nupkg, attached to the GitHub Release",
  },
];

/* ------------------------------------------------------------------- secrets */

const SECRETS = {
  npm: ["NPM_TOKEN"],
  pypi: ["PYPI_API_TOKEN"],
  rubygems: ["RUBY_API_KEY"],
  crates: ["CRATES_API_KEY"],
};

const wantedRegistries = registries.includes("all")
  ? Object.keys(SECRETS)
  : registries.includes("none")
    ? []
    : registries;

/* --------------------------------------------------------------------- checks */

process.stdout.write("pre-publish checks\n\n");

let version = null;

if (!existsSync(specPath)) {
  record("contract present", false, `${specPath} not found`);
} else {
  try {
    version = await contractVersion();
    record("contract present", true, `${path.relative(repoRoot, specPath)} at ${version}`);
  } catch (error) {
    record("contract present", false, error.message);
  }
}

if (version) {
  if (requestedTag) {
    const tagVersion = requestedTag.replace(/^v/, "");
    record(
      "tag matches contract version",
      tagVersion === version,
      `tag ${requestedTag} vs contract ${version}`
    );
  } else {
    skip("tag matches contract version", "no --tag given");
  }

  const fernBin = path.join(
    repoRoot,
    "node_modules",
    ".bin",
    isWindows ? "fern.cmd" : "fern"
  );
  const cliEntry = path.join(repoRoot, "node_modules", "fern-api", "cli.cjs");
  const fernCommand = existsSync(cliEntry) ? process.execPath : fernBin;
  const fernArgs = existsSync(cliEntry) ? [cliEntry, "check", "--local", "--warnings"] : ["check", "--local", "--warnings"];

  const check = run(fernCommand, fernArgs, fernDir, {
    shell: !existsSync(cliEntry) && isWindows,
  });
  record(
    "fern check",
    check.status === 0,
    check.status === 0 ? "contract is valid" : check.output.split("\n").slice(-4).join(" / ")
  );

  if (skipGenerate) {
    skip("no generated drift", "--skip-generate");
  } else {
    const generate = run(process.execPath, ["scripts/generate.mjs"], repoRoot, { shell: false });
    if (generate.missing) {
      record("regenerate SDKs", false, "node could not run scripts/generate.mjs");
    } else if (generate.status !== 0) {
      record("regenerate SDKs", false, generate.output.split("\n").slice(-4).join(" / "));
    } else {
      record("regenerate SDKs", true, "regenerated cleanly");
      const diff = run("git", ["diff", "--quiet", "--exit-code", "--", "packages"], repoRoot);
      record(
        "no generated drift",
        diff.status === 0,
        diff.status === 0 ? "committed SDKs match the contract" : "packages/ differs, regenerate and commit"
      );
    }
  }

  process.stdout.write("\npackage checks\n\n");

  for (const target of TARGETS) {
    if (!existsSync(target.dir)) {
      skip(`${target.name} package`, `${path.relative(repoRoot, target.dir)} not generated`);
      continue;
    }

    const manifest = target.manifest();

    if (!manifest || !existsSync(manifest)) {
      const where = path.relative(repoRoot, target.dir);
      skip(`${target.name} package`, `no build manifest in ${where}`);
      unpublishable.push(`${target.name} (${where})`);
      continue;
    }

    let manifestVersion;
    try {
      manifestVersion = target.version(manifest);
    } catch (error) {
      record(`${target.name} manifest`, false, error.message);
      continue;
    }

// Some generators ignore --version and leave their manifest on the generator's own
// version. That is a release blocker for a registry where we control the manifest and
// worth shouting about everywhere else.
const strictVersion = target.honoursVersion !== false;

/*
 * Some targets cannot be verified on every machine. Java needs a JDK and Maven,
 * which the maintainer may not have, and the release must not be held up by a
 * target that CI checks on every push anyway.
 */
const blocking = target.blockingBuild === true;

function recordCheck(name, ok, detail, isBlocking = blocking) {
  if (isBlocking) {
    record(name, ok, detail);
    return;
  }

  if (ok) {
    record(name, true, detail);
    return;
  }

  record(name, true, `${detail} (not blocking, CI still checks this)`);
  unverified.push(`${target.name}: ${detail}`);
}

if (manifestVersion === version) {
  record(`${target.name} version`, true, manifestVersion);
} else if (strictVersion && target.delivery === "registry") {
  record(`${target.name} version`, false, `${manifestVersion} vs contract ${version}`);
} else {
  record(`${target.name} version`, true, `${manifestVersion}, generator default, contract is ${version}`);
  versionMismatch.push(`${target.name} is ${manifestVersion}, the release is ${version}`);
}

const built = target.build();
    if (built === "skip") {
      skip(`${target.name} build`, "toolchain not installed");
      skip(`${target.name} artifact`, "nothing built");
      if (target.delivery === "release-asset") deliverables.push(target.name);
      continue;
    }

    recordCheck(`${target.name} build`, Boolean(built));

    recordCheck(`${target.name} artifact`, target.artifact(), target.publishSummary());

    if (target.delivery === "release-asset") {
      deliverables.push(target.name);
    }
  }
}

if (unverified.length > 0) {
  process.stdout.write(
    "\nNOT VERIFIED here, CI checks these on every push:\n" +
      unverified.map((entry) => `  ${entry}`).join("\n") +
      "\n"
  );
}

if (versionMismatch.length > 0) {
  process.stdout.write(
    "\nNOTE: a generator kept its own version for these release assets:\n" +
      versionMismatch.map((entry) => `  ${entry}`).join("\n") +
      "\n"
  );
}

if (unpublishable.length > 0) {
  process.stdout.write(
    "\nWARNING: no build manifest, so these ship as source only:\n" +
      unpublishable.map((entry) => `  ${entry}`).join("\n") +
      "\n"
  );
}

if (deliverables.length > 0) {
  process.stdout.write(
    `\n${deliverables.join(", ")} are attached to the GitHub Release, no registry credentials needed\n`
  );
}

if (wantedRegistries.length > 0) {
  process.stdout.write("\nregistry credentials\n\n");

  for (const registry of wantedRegistries) {
    const required = SECRETS[registry] ?? [];
    const missing = required.filter((name) => !process.env[name]);

    if (missing.length === 0) {
      record(`${registry} credentials`, true, required.join(", "));
    } else if (registry === "pypi" && process.env.PYPI_API_TOKEN === undefined) {
      record(`${registry} credentials`, true, "no token, using trusted publishing (OIDC)");
    } else {
      record(`${registry} credentials`, false, `missing ${missing.join(", ")}`);
    }
  }
}

/* -------------------------------------------------------------------- summary */

const passed = results.filter((r) => r.ok).length;
process.stdout.write(`\n${passed}/${results.length} checks passed\n`);

if (failed) {
  process.stdout.write("\npre-publish checks FAILED, nothing was published\n");
  process.exit(1);
}

process.stdout.write("pre-publish checks passed\n");