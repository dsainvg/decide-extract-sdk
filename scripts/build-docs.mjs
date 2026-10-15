/*
 * Build the documentation site: docs/*.md -> sites/.
 *
 *   node scripts/build-docs.mjs [--out sites] [--base /] [--strict]
 *
 * Markdown lives in docs/ and is the source of truth for both the website and the
 * repository README. The generated site is disposable: it is gitignored and deployed
 * by .github/workflows/docs.yml.
 */

import { cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { marked } from "marked";
import hljs from "highlight.js";
import { highlightCss, siteCss, siteJs } from "./site-assets.mjs";
import { repoRoot } from "./contract.mjs";

const docsDir = path.join(repoRoot, "docs");
const configPath = path.join(repoRoot, "docs.config.json");

const outIndex = process.argv.indexOf("--out");
const baseIndex = process.argv.indexOf("--base");
const outDir = path.join(repoRoot, outIndex === -1 ? "sites" : process.argv[outIndex + 1]);
const basePath = (baseIndex === -1 ? "/" : process.argv[baseIndex + 1]).replace(/\/?$/, "/");
const strict = process.argv.includes("--strict");

const config = JSON.parse(await readFile(configPath, "utf8"));

if (config.version) {
  const spec = await readFile(path.join(repoRoot, config.api.spec), "utf8");
  const match = /^\s{2}version:\s*(\S+)/m.exec(spec);
  if (!match) throw new Error(`could not read info.version from ${config.api.spec}`);
  if (match[1] !== config.version) {
    throw new Error(
      `docs.config.json version ${config.version} does not match the contract ${match[1]}.\n` +
        `Update docs.config.json when you bump the contract.`
    );
  }
}

const sectionTitles = new Map(
  (config.sections ?? []).map((section) => [section.match, section.title])
);

const configuredSections = (config.sections ?? []).map((section) => section.title);

function sectionRank(title) {
  if (title === "Overview") return -1;
  const index = configuredSections.indexOf(title);
  return index === -1 ? configuredSections.length : index;
}

/* ------------------------------------------------------------------ discovery */

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "assets" || entry.name === "node_modules") continue;
      files.push(...(await walk(full)));
    } else if (entry.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[`*_~]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function titleCase(text) {
  return text
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function parseFrontMatter(input, file) {
  const raw = input.replace(/^\uFEFF/, "");
  if (!raw.startsWith("---")) {
    return { meta: {}, body: raw };
  }
  const end = raw.indexOf("\n---", 3);
  if (end === -1) throw new Error(`unterminated front matter in ${file}`);

  const block = raw.slice(3, end);
  const body = raw.slice(end + 4).replace(/^\r?\n/, "");
  const meta = {};

  for (const line of block.split(/\r?\n/)) {
    const match = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line.trim());
    if (!match) continue;
    let value = match[2].trim();
    if (/^".*"$|^'.*'$/.test(value)) value = value.slice(1, -1);
    if (value === "true") value = true;
    else if (value === "false") value = false;
    else if (/^-?\d+(\.\d+)?$/.test(value)) value = Number(value);
    meta[match[1]] = value;
  }

  return { meta, body };
}

/* ------------------------------------------------------------------ markdown */

const CALLOUTS = {
  NOTE: ["callout", "Note"],
  TIP: ["callout callout-tip", "Tip"],
  WARNING: ["callout callout-warning", "Warning"],
  IMPORTANT: ["callout callout-warning", "Important"],
  CAUTION: ["callout callout-danger", "Caution"],
  DANGER: ["callout callout-danger", "Danger"],
};

function extractCallouts(markdown) {
  const blocks = [];
  const lines = markdown.split("\n");
  const out = [];

  for (let i = 0; i < lines.length; i += 1) {
    const head = /^>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION|DANGER)\]\s*(.*)$/.exec(lines[i]);
    if (!head) {
      out.push(lines[i]);
      continue;
    }

    const kind = head[1];
    const inner = [];
    let rest = head[2];

    if (rest.trim()) {
      inner.push(rest);
      i += 1;
    } else {
      i += 1;
    }

    while (i < lines.length && /^>\s?/.test(lines[i])) {
      inner.push(lines[i].replace(/^>\s?/, ""));
      i += 1;
    }
    i -= 1;

    blocks.push({ kind, markdown: inner.join("\n") });
    out.push(`@@CALLOUT${blocks.length - 1}@@`);
  }

  return { markdown: out.join("\n"), blocks };
}

function renderCallouts(html, blocks) {
  return html.replace(/@@CALLOUT(\d+)@@/g, (_, index) => {
    const block = blocks[Number(index)];
    const [className, label] = CALLOUTS[block.kind];
    const inner = marked.parse(block.markdown, { gfm: true });
    return `<div class="${className}"><div class="callout-title">${label}</div>${inner}</div>`;
  });
}

function highlight(html) {
  return html.replace(
    /<pre><code class="language-([\w+-]+)">([\s\S]*?)<\/code><\/pre>/g,
    (_, language, code) => {
      const decoded = code
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&");

      if (language && hljs.getLanguage(language)) {
        const highlighted = hljs.highlight(decoded, { language, ignoreIllegals: true }).value;
        return (
          `<pre data-lang="${language}">` +
          `<span class="lang">${language}</span>` +
          `<code class="hljs language-${language}">${highlighted}</code></pre>`
        );
      }

      return `<pre><code>${code}</code></pre>`;
    }
  );
}

function addHeadingIds(html) {
  const seen = new Map();

  return html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, level, inner) => {
    const text = inner.replace(/<[^>]+>/g, "");
    let id = slugify(text) || "section";
    if (seen.has(id)) {
      seen.set(id, seen.get(id) + 1);
      id = `${id}-${seen.get(id)}`;
    } else {
      seen.set(id, 0);
    }
    return `<h${level} id="${id}">${inner}<a class="anchor" href="#${id}" aria-label="Link to ${text}">#</a></h${level}>`;
  });
}

function collectHeadings(html) {
  return [...html.matchAll(/<h([23]) id="([^"]+)">([\s\S]*?)<\/h\1>/g)].map((match) => ({
    level: Number(match[1]),
    id: match[2],
    text: match[3].replace(/<[^>]+>/g, ""),
  }));
}

function rewriteLinks(html, pageUrl) {
  return html.replace(/href="([^"]+)"/g, (full, href) => {
    if (/^(https?:|mailto:|#)/.test(href)) {
      return /^https?:/.test(href) ? full.replace('href="', 'href="') : full;
    }
    if (href.startsWith(basePath) || href.startsWith("/")) return full;

    const [pathname, hash] = href.split("#");
    if (pathname.endsWith(".md")) {
      let target = pathname.slice(0, -3).replace(/^\.\//, "");
      if (target === "index" || target === "README") {
        target = "";
      } else if (!target) {
        target = "";
      }
      const url = `${basePath}${target}${target.endsWith("/") || !target ? "" : "/"}`;
      return `href="${url}${hash ? `#${hash}` : ""}"`;
    }

    return full;
  });
}

/* --------------------------------------------------------------------- pages */

const files = await walk(docsDir);
const pages = [];

for (const file of files) {
  const raw = await readFile(file, "utf8");
  const { meta, body } = parseFrontMatter(raw, file);

  if (meta.hidden) continue;

  const relative = path.relative(docsDir, file).replace(/\\/g, "/");
  const isIndex = /(^|\/)index\.md$/.test(relative) || relative === "README.md";
  const slug = isIndex ? "" : relative.replace(/\.md$/, "");
  const url = `${basePath}${slug}${slug.endsWith("/") || !slug ? "" : "/"}`;

  const directory = relative.includes("/") ? relative.split("/")[0] : "";
  const section = meta.section ?? sectionTitles.get(directory) ?? titleCase(directory || "Overview");

  const extracted = extractCallouts(body);
  let html = marked.parse(extracted.markdown, { gfm: true, mangle: false, headerIds: false });
  html = renderCallouts(html, extracted.blocks);
  html = highlight(html);
  html = addHeadingIds(html);
  html = rewriteLinks(html, url);

  const firstH1 = /<h1>([\s\S]*?)<\/h1>/.exec(html);
  const title = meta.title ?? (firstH1 ? firstH1[1].replace(/<[^>]+>/g, "") : slugify(relative));

  if (firstH1) html = html.replace(/<h1>[\s\S]*?<\/h1>/, "");

  pages.push({
    file,
    relative,
    url,
    slug,
    section,
    order: Number(meta.order ?? 999),
    title,
    description: meta.description ?? "",
    html,
    headings: collectHeadings(html),
    text: html
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 4000),
  });
}

pages.sort((a, b) => {
  if (a.section !== b.section) {
    const rankA = sectionRank(a.section);
    const rankB = sectionRank(b.section);
    if (rankA !== rankB) return rankA - rankB;
    return a.section.localeCompare(b.section);
  }
  if (a.order !== b.order) return a.order - b.order;
  return a.title.localeCompare(b.title);
});

/* -------------------------------------------------------------------- render */

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const sections = [];
for (const page of pages) {
  let section = sections.find((s) => s.title === page.section);
  if (!section) {
    section = { title: page.section, pages: [] };
    sections.push(section);
  }
  section.pages.push(page);
}

function renderSidebar(activeUrl, rel) {
  return sections
    .map(
      (section) => `<div class="section">
  <div class="section-title">${escapeHtml(section.title)}</div>
  ${section.pages
    .map((page) => `<a href="${rel}${page.url.replace(/^\//, "")}">${escapeHtml(page.title)}</a>`)
    .join("\n  ")}
</div>`
    )
    .join("\n");
}

function renderToc(headings) {
  const items = headings.filter((h) => h.level === 2 || h.level === 3);
  if (items.length === 0) return "";
  return `<div class="toc-title">On this page</div>
${items
  .map(
    (h) =>
      `<a class="depth-${h.level}" href="#${h.id}">${escapeHtml(h.text)}</a>`
  )
  .join("\n")}`;
}

/*
 * Assets and internal links are relative to the page, so the site works
 * wherever it is served: at a domain root, from a GitHub Pages project
 * subpath, or from a Cloudflare Pages project. Absolute paths such as
 * /assets/site.css resolve against the domain root and 404 in a subpath,
 * which leaves the page unstyled.
 */
function relPrefix(page) {
  const depth = page.slug ? page.slug.split("/").filter(Boolean).length : 0;
  return "../".repeat(depth);
}

function renderPage(page, index) {
  const rel = page.flat ? "" : relPrefix(page);
  const previous = pages[index - 1];
  const next = pages[index + 1];

  const pager = [
    previous
      ? `<a class="prev" href="${rel}${previous.url.replace(/^\//, "")}"><small>Previous</small>${escapeHtml(previous.title)}</a>`
      : "",
    next
      ? `<a class="next" href="${rel}${next.url.replace(/^\//, "")}"><small>Next</small>${escapeHtml(next.title)}</a>`
      : "",
  ].join("");

  return `<!doctype html>
<html lang="en" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(page.title)} - ${escapeHtml(config.name)}</title>
<meta name="description" content="${escapeHtml(page.description || config.description)}">
<link rel="stylesheet" href="${rel}assets/hljs.css">
<link rel="stylesheet" href="${rel}assets/site.css">
<script>var basePath = ${JSON.stringify(`${rel}`)};</script>
</head>
<body data-path="${page.url}" data-version="${escapeHtml(config.version)}">
<header class="site">
  <button class="icon-button nav-toggle" aria-label="Menu">&#9776;</button>
  <a class="brand" href="${rel}"><span class="dot"></span>${escapeHtml(config.name)}<span class="version">v${escapeHtml(config.version)}</span></a>
  <div class="search">
    <input id="search-input" type="search" placeholder="Search docs" aria-label="Search docs">
    <kbd>Ctrl K</kbd>
    <div class="search-results" id="search-results"></div>
  </div>
  <select id="version-picker" class="version-picker" aria-label="Documentation version"></select>
  <button class="icon-button" id="theme-toggle" aria-label="Toggle theme">&#9789;</button>
</header>
<div class="layout">
  <nav class="sidebar">
${renderSidebar(page.url, rel)}
  </nav>
  <main class="content">
    <h1>${escapeHtml(page.title)}</h1>
    ${page.description ? `<p class="lede">${escapeHtml(page.description)}</p>` : ""}
${page.html}
    <div class="pager">${pager}</div>
  </main>
  <aside class="toc">
${renderToc(page.headings)}
  </aside>
</div>
<footer class="site"><div class="inner">
  <span>${escapeHtml(config.name)} v${escapeHtml(config.version)}</span>
  <a href="${rel}llms.txt">llms.txt</a>
  <a href="${config.repo}">Repository</a>
  <a href="${config.repo}/blob/main/CHANGELOG.md">Changelog</a>
  <a href="${config.repo}/blob/main/PUBLISHING.md">Publishing</a>
  <a href="${config.repo}/blob/main/fern/openapi/openapi.yml">OpenAPI</a>
</div></footer>
<script src="${rel}assets/site.js"></script>
</body>
</html>
`;
}

/* ---------------------------------------------------------------------- write */

await rm(outDir, { recursive: true, force: true });
await mkdir(path.join(outDir, "assets"), { recursive: true });

for (const [index, page] of pages.entries()) {
  const target = page.slug ? path.join(outDir, page.slug, "index.html") : path.join(outDir, "index.html");
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, renderPage(page, index), "utf8");
}

await writeFile(path.join(outDir, "assets", "site.css"), siteCss, "utf8");
await writeFile(path.join(outDir, "assets", "site.js"), siteJs, "utf8");
await writeFile(path.join(outDir, "assets", "hljs.css"), highlightCss, "utf8");

await writeFile(
  path.join(outDir, "search-index.json"),
  JSON.stringify(
    pages.map((page) => ({
      url: page.url,
      title: page.title,
      section: page.section,
      description: page.description,
      headings: page.headings.map((h) => h.text),
      text: page.text,
    })),
    null,
    0
  ),
  "utf8"
);

const origin = config.origin ?? `https://${(config.repo ?? "").replace("https://github.com/", "")}.pages.dev`;
await writeFile(
  path.join(outDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url><loc>${origin}${page.url}</loc></url>`).join("\n")}
</urlset>
`,
  "utf8"
);

/*
 * llms.txt, the machine-readable summary recommended by llmstxt.org. Published as
 * both llms.txt and llm.txt because both names are in use.
 */
const llmsTemplate = path.join(docsDir, "llms-template.md");
if (existsSync(llmsTemplate)) {
  const { body } = parseFrontMatter(await readFile(llmsTemplate, "utf8"), llmsTemplate);

  const index = sections
    .map(
      (section) =>
        `## ${section.title}\n` +
        section.pages
          .map((page) => `- [${page.title}](${page.url})${page.description ? `: ${page.description}` : ""}`)
          .join("\n")
    )
    .join("\n\n");

  const llms = `${body.trim()}\n\n## Documentation index\n\n${index}\n`;

  await writeFile(path.join(outDir, "llms.txt"), llms, "utf8");
  await writeFile(path.join(outDir, "llm.txt"), llms, "utf8");
}

await writeFile(path.join(outDir, "robots.txt"), `User-agent: *\nAllow: /\n`, "utf8");

const notFound = { url: "404.html", title: "Not found", section: "", order: 0, description: "", html: "<p>The page you were looking for does not exist.</p>", headings: [], slug: "404", flat: true, relative: "404.md" };
await writeFile(path.join(outDir, "404.html"), renderPage(notFound, 0), "utf8");

if (existsSync(path.join(docsDir, "assets"))) {
  await cp(path.join(docsDir, "assets"), path.join(outDir, "assets"), { recursive: true });
}

if (strict) {
  const problems = [];
  for (const page of pages) {
    if (!page.title) problems.push(`${page.relative}: missing title`);
    if (!page.description) problems.push(`${page.relative}: missing description`);
  }
  if (problems.length) {
    process.stderr.write(`${problems.join("\n")}\n`);
    process.exit(1);
  }
}

const size = (await stat(path.join(outDir, "index.html"))).size;
process.stdout.write(`built ${pages.length} pages into ${path.relative(repoRoot, outDir)} (${size} bytes on home)\n`);