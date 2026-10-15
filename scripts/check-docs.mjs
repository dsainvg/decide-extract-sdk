/*
 * Link and content checks for the docs, run in CI after the site build.
 *
 *   node scripts/check-docs.mjs
 *
 * Verifies that every internal link in docs/ resolves to a real page, that no page is
 * missing a title or description, and that docs.config.json stays in step with the
 * contract version.
 */

import { existsSync, readFileSync, readdirSync } from "node:fs";
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

/* The machine-readable summary must be built, and both names must match. */
const sites = path.join(repoRoot, "sites");
const llms = path.join(sites, "llms.txt");
const llm = path.join(sites, "llm.txt");

if (!existsSync(sites)) {
  problems.push("sites/ not built, run `npm run docs:build`");
} else {
  if (!existsSync(llms)) {
    problems.push("sites/llms.txt missing");
  }
  if (!existsSync(llm)) {
    problems.push("sites/llm.txt missing");
  }
  if (existsSync(llms) && existsSync(llm)) {
    const a = readFileSync(llms, "utf8");
    const b = readFileSync(llm, "utf8");
    if (a !== b) problems.push("sites/llms.txt and sites/llm.txt differ");
    if (!a.startsWith("# ")) problems.push("sites/llms.txt does not start with a title");
    if (a.length < 2000) problems.push("sites/llms.txt looks too short to be useful");
    for (const section of ["## Endpoints", "## Task types", "## Errors", "## Documentation index"]) {
      if (!a.includes(section)) problems.push(`sites/llms.txt is missing ${section}`);
    }
  }
}

for (const page of ["index.html", "assets/site.css", "assets/site.js", "404.html"]) {
  if (existsSync(sites) && !existsSync(path.join(sites, page))) {
    problems.push(`sites/${page} missing`);
  }
}

/*
 * Assets and internal links must be relative. A page served from a subpath
 * resolves /assets/site.css against the domain root, gets a 404, and renders
 * as unstyled HTML.
 */
if (existsSync(sites)) {
  const htmlFiles = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".html")) htmlFiles.push(full);
    }
  };
  walk(sites);

  for (const file of htmlFiles) {
    const html = readFileSync(file, "utf8");
    const rel = path.relative(sites, path.dirname(file)).replace(/\\/g, "/");

    const absolute = html.match(/(?:href|src)="\/assets\/[^"]+"/g);
    if (absolute) {
      problems.push(
        `${path.relative(sites, file)}: absolute asset path ${absolute[0]}, use a relative one`
      );
    }

    for (const [, ref] of html.matchAll(/(?:href|src)="((?:\.\.\/)*assets\/[^"]+)"/g)) {
      const resolved = path.resolve(path.dirname(file), ref);
      if (!existsSync(resolved)) {
        problems.push(`${path.relative(sites, file)}: missing asset ${ref}`);
      }
    }

    if (!html.includes('href="' + (rel ? "../".repeat(rel.split("/").filter(Boolean).length) : "") + 'assets/site.css"')) {
      problems.push(`${path.relative(sites, file)}: stylesheet is not linked with the expected relative path`);
    }
  }
}

if (problems.length) {
  process.stderr.write(`documentation problems:\n${problems.map((p) => `  ${p}`).join("\n")}\n`);
  process.exit(1);
}

process.stdout.write(`documentation checks passed (${files.length} pages)\n`);