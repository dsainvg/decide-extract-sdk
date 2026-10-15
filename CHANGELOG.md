# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Versions are recorded once, in `info.version` of `fern/openapi/openapi.yml`. An entry is added
here when that version is tagged and published.

## [Unreleased]

### Added

- Fern project in `fern/` generating clients for TypeScript, Python, Ruby, Rust, Java and
  .NET from `fern/openapi/openapi.yml`.
- Documentation in `docs/`, built into `sites/` and published to Cloudflare by
  `.github/workflows/docs.yml`.
- CI validating the contract and failing when `packages/` drifts from it, with a build and
  test job per language.
- `Regenerate SDKs` workflow that regenerates `packages/` on a runner and opens a pull
  request, so Docker is not needed locally.
- `scripts/prepublish-check.mjs`, the gate that runs before anything is published or
  attached.
- Release workflow publishing the TypeScript client to npm and the Python client to PyPI,
  building the Ruby, Rust, Java and .NET packages, and attaching every artifact to the GitHub
  Release.
- Documentation site published from the `sites` branch, built by `.github/workflows/docs.yml`.
- Dependabot for npm, pip and GitHub Actions.

## [0.3.0]

- `/v1/tasks` for any mix of decider and extractor tasks, plus `/decide` and `/extract`
  shortcuts.
- Multimodal input: `images`, `audio`, and content parts on `messages`.
- `target_language` and `output_language` for output language selection.
- `DecideResult` with an optional `reason`.
- `name` on tasks, with `id` kept as an alias; `results` on responses, with `tasks` kept as an
  alias.

## [0.2.0]

- Single `/v1/decide-extract` endpoint with mixed decider and extractor tasks.

## [0.1.0]

- Initial OpenAPI contract for `POST /v1/decide-extract`.

[Unreleased]: https://github.com/dsainvg/decide-extract-sdk/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/dsainvg/decide-extract-sdk/releases/tag/v0.3.0
[0.2.0]: https://github.com/dsainvg/decide-extract-sdk/releases/tag/v0.2.0
[0.1.0]: https://github.com/dsainvg/decide-extract-sdk/releases/tag/v0.1.0