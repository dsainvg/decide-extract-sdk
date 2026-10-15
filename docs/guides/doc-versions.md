---
title: Documentation versions
description: Every release keeps its own copy of the docs, and the root always shows the newest.
order: 2
---

The documentation is versioned. Each release is published under its own path and
is never rewritten afterwards, so a link to the docs that shipped with a given
version keeps showing that version.

| Path | What it is |
| --- | --- |
| `/` | the newest published version |
| `/v0-5-0/` | the docs exactly as they shipped with 0.5.0 |
| `/v0-3-5/` | the docs exactly as they shipped with 0.3.5 |

A version turns into a path by replacing the dots with dashes, so `0.3.5` is
`v0-3-5`. There is no redirect between them on purpose: a reader who followed a
versioned link stays on the version they asked for.

Use the selector in the header to move between versions. It reads
`versions.json`, which lists every published version with the newest first.

## What gets published when

On every push to `main`, the docs are built and the `Docs` workflow publishes
them:

1. The site for the current contract version is written to `/vX-Y-Z/`.
2. The root is refreshed with the same build.
3. No other version folder is touched.
4. `versions.json` is rewritten to match.

Two consequences follow from that. Rebuilding the same version replaces that one
folder and leaves the history intact, and a new version adds a folder rather than
overwriting the one before it.

## Running it locally

```bash
npm run docs:build      # build into sites/
npm run docs:serve      # serve it on http://localhost:4321
```

`npm run docs:publish` pushes the build to the `sites` branch. It only ever
writes that one branch, and only that one version folder.

## See also

- [Publishing](/operations/publishing/) for what goes to which registry.
- [Deploying the docs](/operations/deploying-docs/) for how the site is served.