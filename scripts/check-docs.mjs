/*
 * Link and content checks for the docs, run in CI after the site build.
 *
 *   node scripts/check-docs.mjs
 *
 * Verifies that every internal link in docs/ resolves to a real page, that no page is
 * missing a title or description, and that docs.config.json stays in step with the
 * contract version.
 */

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { repoRoot } from "./contract.mjs";

const docsDir = path.join(repoRoot, "docs");
const config = JSON.parse(await readFile(path.join(repoRoot, "docs.config.json"), "utf8"));

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (entry.name.endsWith(".md")) files.push(full);
  }
  return files;
}

const problems = [];
const files = await walk(docsDir);

if (files.length === 0) {
  process.stderr.write("no documentation found in docs/\n");
  process.exit(1);
}

const slugs = new Set(
  files.map((file) => {
    const relative = path.relative(docsDir, file).replace(/\\/g, "/").replace(/\.md$/, "");
    return /(^|\/)index$/.test(relative) || relative === "README" ? "" : relative;
  })
);

for (const file of files) {
  const raw = (await readFile(file, "utf8")).replace(/^\uFEFF/, "");
  const relative = path.relative(repoRoot, file).replace(/\\/g, "/");

  if (raw.startsWith("---")) {
    const end = raw.indexOf("\n---", 3);
    if (end === -1) {
      problems.push(`${relative}: unterminated front matter`);
      continue;
    }
    const meta = raw.slice(3, end);
    if (!/^title:\s*\S/m.test(meta)) problems.push(`${relative}: no title in front matter`);
    if (!/^description:\s*\S/m.test(meta)) problems.push(`${relative}: no description in front matter`);
  }

  for (const [, href] of raw.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^(https?:|mailto:)/.test(href)) continue;
    const [target] = href.split("#");
    if (!target) continue;

    if (target.endsWith(".md")) {
      const resolved = path
        .relative(docsDir, path.resolve(path.dirname(file), target))
        .replace(/\\/g, "/")
        .replace(/\.md$/, "");
      const slug = /(^|\/)index$/.test(resolved) ? "" : resolved;
      if (!slugs.has(slug)) problems.push(`${relative}: broken link ${href}`);
    }
  }
}

const spec = await readFile(path.join(repoRoot, config.api.spec), "utf8");
const contractVersion = /^\s{2}version:\s*(\S+)/m.exec(spec)?.[1];
if (contractVersion !== config.version) {
  problems.push(`docs.config.json version ${config.version} != contract ${contractVersion}`);
}

if (problems.length) {
  process.stderr.write(`documentation problems:\n${problems.map((p) => `  ${p}`).join("\n")}\n`);
  process.exit(1);
}

process.stdout.write(`documentation checks passed (${files.length} pages)\n`);