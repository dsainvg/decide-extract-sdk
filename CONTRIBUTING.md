# Contributing

The contract is the product here. Code in `packages/` is generated and must never be edited by
hand: a hand edit is overwritten by the next `npm run fern:generate`, and the CI drift check
fails.

## Making a change

1. Edit `fern/openapi/openapi.yml`.
2. `npm run fern:check`.
3. `npm run fern:generate` (needs Docker).
4. Bump `info.version` if the change is releasable: `npm run version:bump -- patch`.
5. `npm test`.
6. Commit the contract and `packages/` together, open a PR.

## Adding an endpoint

- Give it an `operationId`; it becomes the method name in every client.
- Document it with `summary` and `description`; they become docstrings and JSDoc.
- Use `oneOf` plus a `discriminator` for polymorphic payloads, as `Task` does.
- Add it to the docs under `docs/api-reference/` in the same commit.

## Compatibility

| Change | Version |
| --- | --- |
| New optional field, new endpoint | minor |
| Fix that cannot break a correct caller | patch |
| Remove or rename a field, change a type, change a default, tighten validation | major |

For a rename: add the new name, keep the old one as an alias for a full minor release, remove
it in the next major. `id` to `name` and `tasks` to `results` were done that way.

## Keeping the generated code honest

`npm run fern:check:drift` regenerates from the contract and fails if the committed output
differs. CI runs it on every push and pull request. If it fails, run `npm run fern:generate`
and commit the result.

## Documentation

Documentation is markdown in `docs/`, built into `sites/` and published to Cloudflare.

```bash
npm run docs:serve      # preview locally
npm run docs:build      # build into sites/
node scripts/check-docs.mjs   # links, front matter, contract version
```

Every page needs `title` and `description` in its front matter. Use `order` to place it, and
`hidden: true` for internal notes that should stay in the repository without being published.

## Pull requests

CI must be green:

| Job | Checks |
| --- | --- |
| `Contract` | the contract validates |
| `Generate SDKs` | regeneration produces no drift |
| `TypeScript`, `Python`, `Ruby`, `Rust`, `Java`, `.NET` | each client builds and tests |
| `Docs site` | the site builds and links resolve |

- Update `CHANGELOG.md` under *Unreleased* for user-visible changes.
- Update the reference pages under `docs/` when you change the contract.

## Upgrading generators

```bash
npm run fern:upgrade
cd fern && fern generator upgrade --generator fern-typescript-sdk --list
cd fern && fern generator upgrade --generator fern-python-sdk --list
```

Generator bumps are ordinary dependency updates: regenerate, test, commit.

## Releasing

Maintainers only, see [RELEASING.md](RELEASING.md) and [PUBLISHING.md](PUBLISHING.md).