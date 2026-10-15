/*
 * Rename the SDKs to dexa-ai-sdk.
 *
 * Fern derives every symbol from the API name, and an OpenAPI-only definition
 * has none, so every generator falls back to the organization and emits
 * DsainvgApiClient, dsainvg_api, DsainvgApi and so on. The API name cannot be
 * set in fern.config.json either, the CLI rejects the key.
 *
 * The package manifests are ours, so the published names were already right.
 * This pass rewrites the generated symbols so the code matches the name that
 * is published, instead of shipping a package called dexa-ai-sdk whose client is
 * called DsainvgApiClient.
 *
 * It runs after generation and before the drift check, so a rename that does
 * not compile turns CI red rather than shipping.
 *
 *   node scripts/rename-symbols.mjs
 */

import { existsSync, readFileSync, readdirSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { repoRoot } from "./contract.mjs";

const packages = path.join(repoRoot, "packages");

/*
 * Ordered so the longest identifiers are replaced first. Replacing DsainvgApi
 * before DsainvgApiClient would leave Client behind.
 */
const RENAMES = {
  "sdk-ts": [
    ["DexaSdk", "DexaAiSdk"],
    ["DsainvgApi", "DexaAiSdk"],
    ["dexa-sdk", "dexa-ai-sdk"],
    ["dsainvg_api", "dexa-ai-sdk"],
    ["com.dsainvg.fern", "com.dsainvg.dexa"],
  ],
  "sdk-py": [
    ["DexaSdk", "DexaAiSdk"],
    ["DsainvgApi", "DexaAiSdk"],
    ["dsainvg_decide_extractor_sdk", "dexa_ai_sdk"],
    ["dexa_sdk", "dexa_ai_sdk"],
    ["dsainvg_api", "dexa-ai-sdk"],
    ["dsainvg-decide-extractor-sdk", "dexa-ai-sdk"],
  ],
  "sdk-ruby": [
    ["DexaSdk", "DexaAiSdk"],
    ["DsainvgApi", "DexaAiSdk"],
    ["Dsainvg", "DexaAiSdk"],
    ["dexa-sdk", "dexa-ai-sdk"],
    ["dsainvg", "dexa-ai-sdk"],
  ],
  "sdk-rust": [
    ["DexaSdk", "DexaAiSdk"],
    ["DsainvgApi", "DexaAiSdk"],
    ["dexa-sdk", "dexa-ai-sdk"],
    ["dsainvg_api", "dexa-ai-sdk"],
  ],
  "sdk-java": [
    ["DexaSdk", "DexaAiSdk"],
    ["DsainvgApi", "DexaAiSdk"],
    ["org.dsainvg.decide_extractor_sdk", "org.dsainvg.dexa_ai_sdk"],
    ["com.dsainvg.fern", "com.dsainvg.dexa"],
  ],
  "sdk-csharp": [
    ["DexaSdk", "DexaAiSdk"],
    ["DsainvgApi", "DexaAiSdk"],
    ["dsainvg", "dexa-ai-sdk"],
  ],
};

const EXTENSIONS = {
  "sdk-ts": [".ts", ".js", ".json", ".md"],
  "sdk-py": [".py", ".pyi", ".md", ".toml"],
  "sdk-ruby": [".rb", ".md", ".gemspec"],
  "sdk-rust": [".rs", ".md", ".toml"],
  "sdk-java": [".java", ".md"],
  "sdk-csharp": [".cs", ".csproj", ".md", ".slnx"],
};

const SKIP = new Set(["node_modules", "target", "dist", "build", ".fern", "__pycache__", "obj", "bin"]);

function walk(dir, extensions, visit) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP.has(entry.name)) continue;
      walk(path.join(dir, entry.name), extensions, visit);
    } else if (extensions.some((extension) => entry.name.endsWith(extension))) {
      visit(path.join(dir, entry.name));
    }
  }
}

let changed = 0;

for (const [language, pairs] of Object.entries(RENAMES)) {
  const dir = path.join(packages, language);
  if (!existsSync(dir)) continue;

  let languageChanges = 0;

/*
   * The bare organization also appears in the repository URL, where it must not
   * be renamed. It is however part of a require path, so only the URL is
   * protected: guarding every slash prefixed occurrence renamed the directory
   * but left lib/dsainvg/version in the gemspec, and the gem would not build.
   */
  const renameToken = (text, from, to) => {
    if (from !== "dsainvg") return text.split(from).join(to);
    return text.replace(/(?<!github\.com\/)dsainvg(?![\w-])/g, to);
  };

  const apply = (value) =>
    pairs.reduce((result, [from, to]) => renameToken(result, from, to), value);

  walk(dir, EXTENSIONS[language], (file) => {
    const before = readFileSync(file, "utf8");
    const after = apply(before);
    if (after !== before) {
      writeFileSync(file, after);
      languageChanges += 1;
    }
  });

  /*
   * Contents first, then the paths. A generator that emitted
   * DsainvgApiError.ts with an import of ./DexaSdkError.js cannot compile until
   * the file is renamed too, and imports are resolved against the real name on
   * disk rather than whatever the source says.
   */
  const paths = [];
  const collect = (current) => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      if (SKIP.has(entry.name)) continue;
      const full = path.join(current, entry.name);
      paths.push({ full, isDirectory: entry.isDirectory() });
      if (entry.isDirectory()) collect(full);
    }
  };
  collect(dir);

  const depth = (item) => item.full.split(path.sep).length;

  // Files deepest first, then directories shallowest first. The other order
  // renames a parent directory and then tries to rename files inside a path
  // that no longer exists.
  const files = paths.filter((item) => !item.isDirectory).sort((a, b) => depth(b) - depth(a));
  const directories = paths.filter((item) => item.isDirectory).sort((a, b) => depth(a) - depth(b));

  for (const item of [...files, ...directories]) {
    if (!existsSync(item.full)) continue;
    const renamed = apply(path.basename(item.full));
    if (renamed === path.basename(item.full)) continue;
    const target = path.join(path.dirname(item.full), renamed);
    if (existsSync(target)) continue;
    renameSync(item.full, target);
    languageChanges += 1;
  }

  process.stdout.write(`  ${language}: renamed in ${languageChanges} file(s) or path(s)\n`);
  changed += languageChanges;
}

process.stdout.write(`\n${changed} file(s) or path(s) renamed to dexa-ai-sdk\n`);