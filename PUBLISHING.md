# Publishing

Releases are driven by git tags. Push a `v*` tag and the release workflow verifies the repo,
publishes to npm and PyPI, attaches every other package to the GitHub Release, and opens the
release itself.

**You only need two secrets.** Everything else is a downloadable file on the release.

## Secrets

| Secret | For | Required |
| --- | --- | --- |
| `NPM_TOKEN` | npm | yes for npm publishing |
| `PYPI_API_TOKEN` | PyPI | no, PyPI uses trusted publishing without it |

Nothing else. `GITHUB_TOKEN` is provided automatically, and the docs deploy uses it too, so
there is no Cloudflare token in this repository.

## What goes where

| Package | Destination | Notes |
| --- | --- | --- |
| `@dsainvg/decide-extractor-sdk` | npm | `npm publish --provenance` |
| `dsainvg-decide-extractor-sdk` | PyPI | token, or trusted publishing |
| gem | GitHub Release asset | `ruby-<gem>.gem` |
| crate | GitHub Release asset | `rust-<crate>-<version>.crate` |
| jar | GitHub Release asset | `java-<artifact>-<version>.jar` |
| nupkg | GitHub Release asset | `csharp-<package>-<version>.nupkg` |
| TypeScript and Python tarballs | GitHub Release asset | the exact files sent to npm and PyPI |

Ruby, Rust, Java and .NET are downloadable from the release rather than published to a
registry. That means no RubyGems, crates.io, Maven Central or NuGet account, and no tokens
for them. Each artifact is built and attached by the `artifacts` job and can be installed
directly:

```bash
gem install ./decide_extractor-0.3.0.gem

cargo install --index https://github.com/dsainvg/decide-extract-sdk/releases/download/v0.3.0/decide-extractor-0.3.0.crate

dotnet add package --source https://github.com/dsainvg/decide-extract-sdk/releases/download/v0.3.0 DecideExtractor.0.3.0.nupkg
```

Maven has no equivalent one-liner, so add the release download as an artifact repository in
your `pom.xml` or resolve the jar directly in CI.

Publishing those four to real registries later is a small change: add the publish job, its
secret, and a `registry` entry in `scripts/prepublish-check.mjs`.

## npm

1. `npmjs.com -> Access Tokens -> Generate New Token -> Automation`.
2. Grant *read/write* to the `@dsainvg` scope: select the org and the package.
3. Add as `NPM_TOKEN`.
4. The `@dsainvg` scope must exist and be **public** on npmjs.com, or the first publish is
   rejected. Create it once at `https://www.npmjs.com/org/dsainvg/access/tokens/new-scope`.
5. The package name `@dsainvg/decide-extractor-sdk` must be free.

The workflow publishes with `--provenance`, which needs no extra setup but only works when
the publish runs on GitHub Actions, which it does.

## PyPI

Two options. The workflow uses the token if it exists, and trusted publishing otherwise.

**Token**

1. PyPI -> Account settings -> API tokens -> Add token, scoped to
   `dsainvg-decide-extractor-sdk`.
2. The project must already exist on PyPI, so the first publish has to come from a local
   `uv publish` or from a placeholder upload.
3. Add as `PYPI_API_TOKEN`.

**Trusted publishing, recommended, no secret**

1. Create the PyPI project once.
2. PyPI -> Manage -> Publishing -> add a GitHub publisher:
   - owner: your GitHub user or org
   - repository: `decide-extractor-sdk`
   - workflow filename: `release.yml`
   - environment: leave blank
3. Do not set `PYPI_API_TOKEN`. The job authenticates with an OIDC token.

## The pre-publish gate

Before anything is published or attached, one job runs every check that must hold:

```bash
npm run release:check
```

- the contract exists and parses
- the tag matches `info.version`
- `fern check` passes
- regenerating produces no drift
- every generated package carries the contract version
- every generated package builds, and produces its distributable artifact
- `NPM_TOKEN` is present, and `PYPI_API_TOKEN` unless trusted publishing is in use

If any of it fails, nothing is published and nothing is attached. There is no half-finished
release to clean up.

## Cutting a release

```bash
npm run version:bump -- minor

git add fern/openapi/openapi.yml packages
git commit -m "release: v0.4.0"

git tag -a v0.4.0 -m "v0.4.0"
git push origin main --tags
```

## What the workflow does

| Job | Does |
| --- | --- |
| `verify` | Compares the tag with `info.version` |
| `gate` | Runs the full pre-publish check |
| `npm` | install, build, publish with provenance |
| `pypi` | build, publish by token or trusted publishing |
| `artifacts` | builds every package and collects the files |
| `github-release` | attaches the files and creates the release with generated notes |

The release is created once every publish succeeded, so the download list on a release always
matches what is actually on npm and PyPI.

## Troubleshooting

**The gate says a package version does not match the contract.** The generated code is from an
older contract. Run `npm run fern:generate` and commit.

**A publish job was skipped.** Its secret is not set. Only npm and PyPI can be skipped this
way; check `NPM_TOKEN`.

**An artifact job failed.** Usually a toolchain: `cargo package` needs `description` and
`license` in `Cargo.toml`, and `dotnet pack` needs a non-empty `PackageId`. Set them in
`fern/generators.yml` so the fix survives regeneration, then regenerate.

**A registry rejected the name.** npm, PyPI and the release asset names come from the
generators. Pin them in `fern/generators.yml` before releasing.