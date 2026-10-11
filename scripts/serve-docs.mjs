/*
 * Local preview for the generated docs site.
 *
 *   node scripts/serve-docs.mjs [--port 4321] [--build]
 *
 * Serves sites/ with clean URLs (/guide/quickstart/ -> sites/guide/quickstart/index.html)
 * and 404.html for anything missing. No dependencies.
 */

import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { repoRoot } from "./contract.mjs";
import { spawnSync } from "node:child_process";

const portIndex = process.argv.indexOf("--port");
const port = Number(portIndex === -1 ? 4321 : process.argv[portIndex + 1]);
const outDir = path.join(repoRoot, "sites");

if (process.argv.includes("--build") || !existsSync(outDir)) {
  const build = spawnSync(process.execPath, ["scripts/build-docs.mjs"], {
    cwd: repoRoot,
    stdio: "inherit",
    shell: false,
  });
  if (build.status !== 0) process.exit(build.status ?? 1);
}

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const target = path.join(outDir, clean);
  const normalized = path.normalize(target);

  if (!normalized.startsWith(outDir)) return null;

  if (existsSync(normalized)) {
    const info = await stat(normalized);
    if (info.isFile()) return normalized;
    const index = path.join(normalized, "index.html");
    if (existsSync(index)) return index;
  }

  return null;
}

createServer(async (request, response) => {
  const file = await resolveFile(request.url ?? "/");

  if (!file) {
    const notFound = path.join(outDir, "404.html");
    response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    response.end(existsSync(notFound) ? await readFile(notFound) : "Not found");
    return;
  }

  response.writeHead(200, {
    "content-type": TYPES[path.extname(file)] ?? "application/octet-stream",
    "cache-control": "no-cache",
  });
  response.end(await readFile(file));
}).listen(port, () => {
  process.stdout.write(`docs preview on http://localhost:${port}\n`);
});