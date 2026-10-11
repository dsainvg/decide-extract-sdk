---
title: Publishing
description: What goes to a registry, what is attached to the release, and how a release runs.
order: 3
---

Releases are driven by git tags. Push a `v*` tag and the release workflow verifies the repo,
publishes to npm and PyPI, attaches every other package to the GitHub Release, and opens the
release itself.

Two secrets, and only two: `NPM_TOKEN` and, optionally, `PYPI_API_TOKEN`. The docs site is
published from the `sites` branch with the automatic `GITHUB_TOKEN`, so no Cloudflare
credentials live in this repository.

## Where each package goes

| Package | Destination |
| --- | --- |
| TypeScript | npm, published |
| Python | PyPI, published |
| Ruby | GitHub Release asset, a `.gem` |
| Rust | GitHub Release asset, a `.crate` |
| Java | GitHub Release asset, a `.jar` |
| .NET | GitHub Release asset, a `.nupkg` |
| C++ | none, call the HTTP API directly |

The release also carries the exact `.tgz` and `.whl` sent to npm and PyPI, so a download
exists for every language whether or not it has a registry.

## Installing the release-asset packages

```bash
gem install ./decide_extractor-0.3.0.gem

cargo install --index https://github.com/dsainvg/decide-extract-sdk/releases/download/v0.3.0/decide-extractor-0.3.0.crate

dotnet add package --source https://github.com/dsainvg/decide-extract-sdk/releases/download/v0.3.0 DecideExtractor.0.3.0.nupkg
```

Maven has no equivalent one-liner. Point your build at the release download, or add it as an
artifact repository.

## The gate

Before anything is published or attached, one job runs every check that must hold:

```bash
npm run release:check
```

- the contract exists and parses
- the tag matches `info.version`
- `fern check` passes
- regenerating produces no drift
- every generated package carries the contract version
- every generated package builds and produces its distributable artifact
- the npm and PyPI credentials are present

If any of it fails, nothing is published and nothing is attached.

## Cutting a release

```bash
npm run version:bump -- minor

git add fern/openapi/openapi.yml packages
git commit -m "release: v0.4.0"

git tag -a v0.4.0 -m "v0.4.0"
git push origin main --tags
```

The bump script edits the contract, regenerates and prints these commands. If regeneration
fails because Docker is not running, run it again once Docker is up and commit both changes
together.

## What the workflow does

| Job | Does |
| --- | --- |
| `verify` | Compares the tag with `info.version` |
| `gate` | Runs the full pre-publish check |
| `npm` | install, build, publish with provenance |
| `pypi` | build, publish by token or trusted publishing |
| `artifacts` | builds every package and collects the files |
| `github-release` | attaches the files and creates the release with generated notes |

The release is created only after the publishes succeed, so the download list on a release
always matches what is actually on npm and PyPI.

## Publishing the other four to real registries later

It is a small change: add a publish job, its secret, and a `registry` entry in
`scripts/prepublish-check.mjs`. Until then the release assets are the distribution channel,
and nothing is lost by switching later, since the same version can be uploaded to a registry
without republishing to npm or PyPI.

## Troubleshooting

**The gate says a package version does not match the contract.** The generated code is from
an older contract. Run `npm run fern:generate` and commit.

**A publish job was skipped.** Its secret is not set. Only npm and PyPI can be skipped this
way.

**An artifact job failed.** Usually a toolchain issue: `cargo package` needs `description` and
`license` in `Cargo.toml`, `dotnet pack` needs a non-empty `PackageId`. Set them in
`fern/generators.yml` so the fix survives regeneration.