/*
 * scripts/contract.mjs
 * Single source of truth helpers: the contract's info.version is the released version.
 */

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(here, "..");
export const fernDir = path.join(repoRoot, "fern");
export const specPath = path.join(fernDir, "openapi", "openapi.yml");
export const tsPackageDir = path.join(repoRoot, "packages", "sdk-ts");
export const pyPackageDir = path.join(repoRoot, "packages", "sdk-py");

const VERSION_RE = /^\s{2}version:\s*["']?([^"'\s#]+)["']?\s*$/m;

export async function readSpec() {
  return readFile(specPath, "utf8");
}

export async function contractVersion() {
  const spec = await readSpec();
  const match = VERSION_RE.exec(spec);
  if (!match) {
    throw new Error(`Could not read info.version from ${specPath}`);
  }
  return match[1];
}