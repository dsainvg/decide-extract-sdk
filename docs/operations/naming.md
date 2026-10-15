---
title: Naming
description: Why the generated packages are named after the organization, and how to fix it.
order: 6
---

## What the generators produce today

| Language | Package name | Manifest |
| --- | --- | --- |
| TypeScript | sources only, no `package.json` | missing |
| Python | sources only, no `pyproject.toml` | missing |
| Ruby | `dsainvg` | `dsainvg.gemspec` |
| Rust | `dexa-ai-sdk` | `Cargo.toml` |
| Java | `org.dsainvg` | maintained in `templates/sdk-java/pom.xml` |
| .NET | `DexaAiSdk` | `DexaAiSdk.csproj` |

## Why

Fern derives the SDK's package identity from the **API name**. This project was created with

```bash
fern init --api --org dsainvg --openapi contracts/openapi.yaml
```

which registers the API under the organization and leaves it without a name of its own, so
every generator falls back to the organization identifier. `dsainvg`, `dexa-ai-sdk` and
`DexaAiSdk` are all that fallback.

The three generators that need a package name to emit a manifest at all, TypeScript, Python
and Java, fail differently as a result: they write sources and skip the manifest. The Python
generator refuses to start if handed a key it does not recognise, so a wrong key such as
`package-name` fails the generator outright, while `package_name` is accepted and still leaves
the output without a manifest.

`fern.config.json` cannot fix this. It accepts only `organization` and `version`; `projectId`,
`name`, `apiId`, `api-id`, `project-id`, `project`, `apiName` and `api-name` are all rejected
as unrecognized keys.

## The fix

Give the API a name in Fern, which means signing in and creating or renaming the API in the
Fern dashboard, or re-running `fern init` against a named API:

```bash
fern login
fern init --api --org dsainvg --openapi fern/openapi/openapi.yml
```

Once the API is named, set the package name for each generator in `fern/generators.yml` and
regenerate. The manifests and the names follow from the contract's `info.title`,
`Dexa API`.

## What this does not affect

- The API surface itself. Endpoints, schemas and request and response shapes come from the
  contract and are correct in every generated client.
- The TypeScript, Python and Java clients as source. The generated code is complete and
  correct; only the packaging metadata is missing, which is what makes them unbuildable and
  unpublishable.
- Ruby, Rust and .NET, which build and test today under their organization-derived names.

## Working around it

The three clients are still published and usable. Their package manifests are maintained
here rather than in `packages/`, because Fern wipes each output directory before it
generates, so anything written inside `packages/` by hand is deleted on the next run.

The manifests live in `templates/sdk-ts/` and `templates/sdk-py/`, with `__VERSION__` where
the version goes, and `scripts/write-manifests.mjs` renders them into `packages/` after
generation with `info.version` from the contract. `npm run fern:generate` calls it
automatically, so the manifests can never drift from the contract version.

| File | Purpose |
| --- | --- |
| `templates/sdk-ts/package.json` | npm package: name, version, exports, build scripts |
| `templates/sdk-ts/tsconfig.json` | compiler options for the generated sources |
| `templates/sdk-ts/tsconfig.build.json` | build config emitting `dist/` with declarations |
| `templates/sdk-py/pyproject.toml` | PyPI package: name, version, dependencies, packaging |

Because Python's generated tree is flat, `pyproject.toml` maps the whole directory to one
package and lists each subpackage, otherwise setuptools builds a wheel with only the
top-level modules. The import name is `dexa_ai_sdk`, which is what the
generator's own docstrings, User-Agent header and tests reference.

The Ruby gem needs no equivalent: Fern generates `custom.gemspec.rb` as a documented hook
for exactly this, so the gem's name and metadata are set there and protected with
`.fernignore`.

Do not add `.fernignore` to `packages/sdk-ts` or `packages/sdk-py`: Fern runs
`git reset --` on the ignored paths with NUL-separated arguments, which fails on Linux
runners with `ERR_INVALID_ARG_VALUE`.