---
title: Repository
description: How this SDK repository is laid out, and what each part is for.
order: 1
---

The SDKs are generated from one contract. Nothing in `packages/` is written by hand.

```text
fern/
  fern.config.json      Fern project config, pins the CLI version
  generators.yml        which generators run, at which versions, writing where
  openapi/openapi.yml   THE CONTRACT, including the released version
packages/
  sdk-ts/               generated TypeScript client   -> npm
  sdk-py/               generated Python client       -> PyPI
  sdk-ruby/             generated Ruby client         -> RubyGems
  sdk-rust/             generated Rust client         -> crates.io
  sdk-java/             generated Java client         -> Maven Central
  sdk-csharp/           generated .NET client         -> NuGet
scripts/
  generate.mjs          regenerate every SDK at the contract version
  bump.mjs              bump the version and regenerate
  test.mjs              build and test whichever SDKs exist
  prepublish-check.mjs  everything that must hold before a release
  build-artifacts.mjs   build every package, collect files for the release
  build-docs.mjs        docs/*.md -> sites/
  check-docs.mjs        link and front matter checks
docs/                   the documentation you are reading
sites/                  generated site, gitignored, pushed to the sites branch
release-artifacts/      generated files attached to the GitHub Release
```

## The contract is the source of truth

`fern/openapi/openapi.yml` defines the endpoints, the schemas and `info.version`. Everything
else is derived: the clients, the docs' type reference, the version stamped into every
package.

`info.version` is the only version in the repository. npm, PyPI, RubyGems, crates.io, Maven
Central, NuGet, the git tag and the GitHub Release all carry that number.

## Generated code is committed

`packages/` is committed so the clients are browsable, greppable and diffable in review. The
cost is that it can go stale, which CI prevents: the `Generate SDKs` job regenerates from the
contract and fails if the result differs from what is committed.

That is why contract changes and `packages/` changes belong in the same commit.

## Local commands

| Command | What it does |
| --- | --- |
| `npm run fern:check` | Validate the contract and generator config |
| `npm run fern:generate` | Regenerate every SDK. Needs Docker |
| `npm run fern:check:drift` | Regenerate and fail if the committed SDKs are stale |
| `npm run version:print` | Print the contract version |
| `npm run version:bump -- patch` | Bump the version and regenerate |
| `npm test` | Build and test every generated SDK |
| `npm run release:check` | The full pre-publish gate |
| `npm run build:artifacts` | Build every package and collect release files |
| `npm run docs:build` | Build the docs site into `sites/` |
| `npm run docs:serve` | Preview the docs site locally |

## Upgrading

```bash
npm run fern:upgrade                                    # the Fern CLI
cd fern && fern generator upgrade --generator fern-typescript-sdk --list
cd fern && fern generator upgrade --generator fern-python-sdk --list
```

Then regenerate, test and commit. Generator bumps are ordinary dependency updates.

## See also

- [Developing the SDKs](/operations/sdk-development/)
- [Publishing](/operations/publishing/)
- [Deploying the docs](/operations/deploying-docs/)