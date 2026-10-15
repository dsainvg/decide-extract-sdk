---
title: Publishing
description: What goes to a registry, what is attached to the release, and how a release runs.
order: 3
---

Releases are driven by git tags. Push a `v*` tag and the release workflow verifies the repo,
publishes to npm, PyPI, RubyGems and crates.io, attaches every language to the GitHub Release,
and opens the release itself.

Four secrets: `NPM_TOKEN`, `PYPI_API_TOKEN`, `RUBY_API_KEY` and `CRATES_API_KEY`. The docs
site is published from the `sites` branch with the automatic `GITHUB_TOKEN`, so no
Cloudflare credentials live in this repository.

## Where each package goes

| Package | Destination |
| --- | --- |
| TypeScript | npm, published as `@dsainvg/dexa-ai-sdk` |
| Python | PyPI, published as `dexa-ai-sdk` |
| Ruby | RubyGems, published as `dexa-ai-sdk` |
| Rust | crates.io, published as `dexa-ai-sdk` |
| Java | GitHub Release asset, `com.dsainvg:dexa-ai-sdk` |
| .NET | GitHub Release asset, `DexaAiSdk` |
| C++ | none, call the HTTP API directly |

The release also carries one archive per language, so a download
exists for every language whether or not it has a registry.

## Installing the release-asset packages

```bash
npm install @dsainvg/dexa-ai-sdk
pip install dexa-ai-sdk
gem install dexa-ai-sdk
cargo add dexa-ai-sdk

dotnet add package --source https://github.com/dsainvg/decide-extract-sdk/releases/download/v0.5.0 DexaAiSdk.0.5.0.nupkg
```

Maven has no equivalent one-liner. Point your build at the release download, or add it as an
artifact repository and depend on `com.dsainvg:dexa-ai-sdk`.

## What each branch is for

| Branch | Written by | Holds |
| --- | --- | --- |
| main | you | the contract, the generated SDKs, the workflows |
| generated/sdks | Regenerate SDKs | freshly generated SDKs waiting to be merged |
| diagnostics/java-build | CI | the Java build log, because a failed job's log cannot be read otherwise |
| sites | nothing writes to it any more | the last site published by the old branch deployer |

The docs site is published by the Docs workflow itself, with
ctions/configure-pages, ctions/upload-pages-artifact and ctions/deploy-pages.

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