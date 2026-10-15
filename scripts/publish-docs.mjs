/*
 * Publish the built docs site to the sites branch.
 *
 * The site is versioned. Every release gets its own folder, the root holds the
 * newest one, and no version is ever rewritten by a later release:
 *
 *   /                the latest published version
 *   /v0-5-0/         0.5.0, exactly as it was published
 *   /v0-3-5/         0.3.5, left alone since
 *   /versions.json   the list the version switcher reads
 *
 * This is the only thing in the repository that writes to a branch other than
 * main, and it writes to one branch only.
 *
 *   node scripts/publish-docs.mjs [--version 0.5.0] [--work .docs-publish]
 */

import { spawnSync } from "node:child_process";
import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { contractVersion, repoRoot } from "./contract.mjs";

const BRANCH = "sites";
const REMOTE = process.env.DOCS_REMOTE || "origin";

const argOf = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
};

const siteDir = path.join(repoRoot, argOf("--site", "sites"));
const workDir = path.join(repoRoot, argOf("--work", ".docs-publish"));
const version = argOf("--version") || (await contractVersion());

/* 0.5.0 -> v0-5-0, so a version folder is always a valid directory name. */
const folderFor = (value) => `v${value.replace(/\./g, "-")}`;

/*
 * Arguments are passed through a shell so that git is found on Windows without
 * an .exe suffix, which means anything with a space in it has to be quoted. The
 * commit message is the first thing that has one.
 */
const quote = (value) => (/[\s&|<>^]/.test(value) ? `"${value.replace(/"/g, '\\"')}"` : value);

function run(command, args, cwd = workDir) {
  const passed = args.map(quote);
  const result = spawnSync(command, passed, {
    cwd,
    encoding: "utf8",
    shell: process.platform === "win32",
  });
  if (result.status !== 0) {
    process.stderr.write(`\n$ ${command} ${passed.join(" ")}\n${result.stdout || ""}${result.stderr || ""}\n`);
    process.exit(result.status ?? 1);
  }
  return (result.stdout || "").trim();
}

if (!existsSync(siteDir)) {
  process.stderr.write(`nothing built at ${path.relative(repoRoot, siteDir)}, run npm run docs:build\n`);
  process.exit(1);
}

const folder = folderFor(version);

await rm(workDir, { recursive: true, force: true });
await mkdir(workDir, { recursive: true });

run("git", ["init", "-q"]);
run("git", ["checkout", "-q", "-b", BRANCH]);

/*
 * Reuse the existing site so earlier versions survive. The remote has to exist
 * before it can be probed, which is why this is not simply a fetch.
 */
const remoteUrl =
  process.env.DOCS_REMOTE_URL ||
  `https://x-access-token:${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`;

run("git", ["remote", "add", REMOTE, remoteUrl]);

const existing = run("git", ["ls-remote", "--heads", REMOTE, BRANCH]);
if (existing) {
  run("git", ["fetch", "-q", "--depth", "1", REMOTE, BRANCH]);
  run("git", ["checkout", "-q", "-B", BRANCH, "FETCH_HEAD"]);
  run("git", ["reset", "-q", "--hard", "FETCH_HEAD"]);
}

/*
 * Replace this version only. An existing folder for the same version is
 * overwritten, which is what makes a rebuild of the same version idempotent.
 */
const destination = path.join(workDir, folder);
await rm(destination, { recursive: true, force: true });
await cp(siteDir, destination, { recursive: true });

/* The root is the newest release, rebuilt every time. */
for (const entry of await readdir(destination, { withFileTypes: true })) {
  const from = path.join(destination, entry.name);
  const to = path.join(workDir, entry.name);
  if (entry.isDirectory()) await rm(to, { recursive: true, force: true });
  else await rm(to, { force: true });
  await cp(from, to, { recursive: true });
}

/* Every folder that looks like a version, newest first. */
const versions = [];
for (const entry of await readdir(workDir, { withFileTypes: true })) {
  if (!entry.isDirectory() || !/^v\d+-\d+/.test(entry.name)) continue;
  const found = /^v(\d+)-(\d+)-(\d+)/.exec(entry.name);
  if (!found) continue;
  const plain = `${found[1]}.${found[2]}.${found[3]}`;
  versions.push({
    version: plain,
    path: `/${entry.name}/`,
    label: plain === version ? `${plain} (latest)` : plain,
    current: plain === version,
  });
}

versions.sort((a, b) => b.version.localeCompare(a.version, undefined, { numeric: true }));

const manifest = `${JSON.stringify(versions, null, 2)}\n`;
await writeFile(path.join(workDir, "versions.json"), manifest, "utf8");

/* Also inside this version's folder, so the switcher works from a nested page
   without having to know where the site is mounted. */
await writeFile(path.join(workDir, folder, "versions.json"), manifest, "utf8");

run("git", ["add", "-A"]);

/* git diff --quiet exits 1 when there is something to commit, which is the
   interesting case, so ask for the names instead. */
const staged = run("git", ["diff", "--cached", "--name-only"]);
if (!staged) {
  process.stdout.write(`nothing changed for ${version}, the published site is already current\n`);
  process.exit(0);
}

run("git", ["config", "user.name", "github-actions[bot]"]);
run("git", ["config", "user.email", "41898282+github-actions[bot]@users.noreply.github.com"]);
run("git", ["commit", "-q", "-m", `docs: publish ${version}`]);
run("git", ["push", "-q", "--force", REMOTE, BRANCH]);

process.stdout.write(
  `pushed ${BRANCH}: ${folder} plus the root, ${versions.length} version(s) in total\n`
);

/* Local runs leave the checkout behind; CI does not care but the repo stays tidy. */
if (!process.env.GITHUB_ACTIONS) {
  const manifest = await readFile(path.join(workDir, "versions.json"), "utf8").catch(() => "[]");
  process.stdout.write(`${manifest}\n`);
}