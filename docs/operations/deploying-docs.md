---
title: Deploying the docs
description: Building sites/ and publishing it to the sites branch.
order: 5
---

The documentation is markdown in `docs/`. The site in `sites/` is generated from it and
pushed to a `sites` branch in this repository, which is what gets published. Only the
markdown is committed to `main`.

## Build

```bash
npm run docs:build      # docs/*.md -> sites/
npm run docs:serve      # preview on http://localhost:4321
```

```bash
npm run docs:build -- --base /decide-extractor-docs/
npm run docs:serve -- --base /decide-extractor-docs/
```

`--base` matters if the site is served from a subpath rather than the root of a domain.

## What the build does

- renders every page in `docs/` that is not marked `hidden: true`
- groups pages into sections from the folder they live in
- adds heading anchors, a table of contents, a sidebar and previous/next links
- resolves `.md` links to real URLs and fails on broken ones
- highlights code blocks, styles callouts and tables
- emits `llms.txt` and `llm.txt`, the machine-readable summary from `docs/llms-template.md`
  with the page index appended, plus `search-index.json`, `sitemap.xml` and `robots.txt`

## llms.txt

`llms.txt` is the summary an assistant reads instead of crawling the site. It carries what
is needed to call the API: authentication, the four endpoints, both task types with every
field, the shared request fields, the response envelope, multimodal input, the language
enum, the error codes and the conventions that bite. It is written by hand in
`docs/llms-template.md`; the build appends an index of every page.

Both `llms.txt` and `llm.txt` are published, with identical content, because both names are
in use. `npm run docs:build && node scripts/check-docs.mjs` fails if they drift apart, go
missing, or lose a required section.

## Front matter

```markdown
---
title: Quickstart
description: Send your first request.
order: 2
---
```

| Key | Purpose |
| --- | --- |
| `title` | Sidebar label and page heading. Required |
| `description` | The one-line summary. Required, also used for meta tags |
| `order` | Position within the section |
| `section` | Override the section name, which otherwise comes from the folder |
| `hidden` | `true` keeps the page out of the site, nav and search |

Design notes and internal documents live in `docs/` with `hidden: true`, so they stay in the
repository without ending up on the website.

## Checks

```bash
node scripts/check-docs.mjs
```

Fails on broken internal links, missing front matter, and a `docs.config.json` version that
has drifted from the contract.

## How it is published

`.github/workflows/docs.yml` runs on every push to `main`:

1. builds the site into `sites/`
2. runs the link and front matter checks
3. publishes to the `sites` branch

Pull requests only build and check.

The `sites` branch is the only branch here that anything but a human writes to.

### The site is versioned

Each release keeps the documentation it shipped with:

```
/                the newest published version
/v0-5-0/         0.5.0 exactly as published
/v0-3-5/         0.3.5 exactly as published
/versions.json   the list the version switcher reads
```

Publishing writes the folder for the current contract version and refreshes the
root. No other version folder is touched, so rebuilding a version replaces only
that version, and a new release adds a folder instead of overwriting the last
one. `npm run docs:publish` does the same thing locally.

```bash
git clone --branch sites --depth 1 https://github.com/dsainvg/decide-extract-sdk.git _site
```

The push uses the automatic `GITHUB_TOKEN` with `contents: write`, so there is nothing to
configure in this repository and no Cloudflare credentials to store.

## Pointing a host at the branch

Any static host that can build from a git branch works. Create the project once, then set it
to watch `sites` rather than `main`.

For a Cloudflare Pages project: connect the repository, then set the production branch to
`sites` and leave the build command empty, since the branch already contains the finished
site. Cloudflare redeploys whenever the branch moves, which is every push to `main`.

Add `CNAME` to `docs/` if you want a custom domain: the build copies it to the site root, and
the branch will carry it.

## See also

- [Repository layout](/operations/repository/)
- [Contributing to the docs](https://github.com/dsainvg/decide-extract-sdk/blob/main/CONTRIBUTING.md)