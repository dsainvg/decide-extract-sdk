---
title: Developing the SDKs
description: Changing the API, regenerating, and keeping CI green.
order: 4
---

## Changing the API

1. Edit `fern/openapi/openapi.yml`.
2. `npm run fern:check` to validate it.
3. `npm run fern:generate` to regenerate every client. Needs Docker.
4. `npm test` to build and test them.
5. Commit the contract and `packages/` together.

CI regenerates from scratch and fails if the committed output differs, so step 3 is not
optional.

## Adding an endpoint

- Give it an `operationId`. It becomes the method name in every client.
- Give it a `summary`. It becomes the docstring and JSDoc comment.
- Tag it, so it lands in the right subclient.
- Use `oneOf` with a `discriminator` for polymorphic payloads, the way `Task` does.

## Making a change safely

**Adding an optional field** is a minor version. Existing requests stay valid, and clients
gain the field.

**Renaming a field** is a major version. Add the new name, keep the old one as an alias for a
full minor release, then remove it in the next major. `id` to `name`, and `tasks` to `results`,
were done exactly this way.

**Adding an endpoint** is a minor version.

**Tightening validation** is a major version. Rejecting a request that used to succeed breaks
callers who never find out until they deploy.

## Keeping the docs in step

The reference pages are written by hand, so they can drift from the contract. Two checks keep
that visible:

- `npm run docs:build` fails if `docs.config.json` says a different version than the contract.
- `node scripts/check-docs.mjs` fails on broken internal links and on pages missing a title or
  description.

If you add a field, update the type reference and the relevant guide in the same commit.

## What CI runs

| Job | Checks |
| --- | --- |
| `Contract` | `fern check` |
| `Generate SDKs` | regenerates, then fails on drift |
| `TypeScript`, `Python`, `Ruby`, `Rust`, `Java`, `.NET` | build and test each client |
| `Docs site` | builds the site, checks links |
| `Regenerate SDKs` | opens a pull request when `packages/` is missing or stale |
| `Release` | the full pre-publish gate, then publishes and attaches artifacts |

## Without Docker

`npm run fern:generate` needs Docker because Fern runs each generator in a container. If you
cannot run it locally, push the contract change: the `Regenerate SDKs` workflow does it on a
runner and opens a `chore: regenerate SDKs` pull request containing `packages/`. Merge it and
the drift check passes.

## Requirements for a local run

| Tool | Needed for |
| --- | --- |
| Node 20+ | everything |
| Docker | `fern generate --local`, which is how all six generators run |
| Python 3.9+, uv | the Python client |
| Ruby 3.3+ | the Ruby client |
| Rust stable | the Rust client |
| JDK 17+, Maven | the Java client |
| .NET SDK 8 | the .NET client |

Toolchains that are not installed are skipped with a message rather than failing, so you can
work on just the languages you have.

## See also

- [Repository layout](/operations/repository/)
- [Publishing](/operations/publishing/)
- [Deploying the docs](/operations/deploying-docs/)