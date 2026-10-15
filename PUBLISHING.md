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
| `RUBY_API_KEY` | RubyGems | no, the gem is pushed only when this is set |
| `CRATES_API_KEY` | crates.io | no, the crate is pushed only when this is set |

Nothing else. `GITHUB_TOKEN` is provided automatically, and the docs deploy uses it too, so
there is no Cloudflare token in this repository.

## RubyGems

1. rubygems.org -> Profile -> Credentials -> Edit -> API keys.
2. Copy the key. Add it to this repository as `RUBY_API_KEY`.
3. The gem is `dexa-ai-sdk`. Set in
   `packages/sdk-ruby/custom.gemspec.rb`, because the Fern API has no name of its own and
   the generator otherwise builds a gem called after the organization. That file is listed
   in `packages/sdk-ruby/.fernignore` so regeneration keeps it.
4. `gem build` requires a `RUBYGEMS_API_KEY` in your shell when pushing by hand:

## crates.io

1. crates.io -> Account Settings -> API Tokens -> New token.
2. Tick **Publish new crates** as well as Publish, otherwise the first publish of the
   crate name is rejected.
3. Add the token as `CRATES_API_KEY`.

The crate is currently named `dexa-ai-sdk` and carries the generator's own version rather
than the contract version, because the Rust generator ignores `--version`. Both come from
the Fern API having no name; see [docs/operations/naming.md](docs/operations/naming.md).
A crate name on crates.io is permanent, so claim it before publishing if you want a
different one.

```bash
cd packages/sdk-ruby
bundle install
gem build *.gemspec
gem push ./*.gem
```

## What goes where

| Package | Destination | Notes |
| --- | --- | --- |
| `@dsainvg/dexa-ai-sdk` | npm | `npm publish --provenance` |
| `dexa-ai-sdk` | PyPI | token, or trusted publishing |
| `dexa-ai-sdk` | RubyGems | pushed with `gem push` |
| `dexa-ai-sdk` | crates.io | pushed with `cargo publish` |
| `com.dsainvg:dexa-ai-sdk` | GitHub Release asset | `java-dexa-ai-sdk-<version>.jar` |
| `DexaAiSdk` | GitHub Release asset | `DexaAiSdk.<version>.nupkg` |
| TypeScript archive | GitHub Release asset | `dexa-ai-sdk-typescript-<version>.zip`, the built client |

Java and .NET are downloadable from the release rather than published to a registry. That
means no Maven Central or NuGet account, and no tokens for them. The other four publish to
their registries and are attached to the release as well:

```bash
npm install @dsainvg/dexa-ai-sdk
pip install dexa-ai-sdk
gem install dexa-ai-sdk
cargo add dexa-ai-sdk

dotnet add package --source https://github.com/dsainvg/decide-extract-sdk/releases/download/v0.5.0 DexaAiSdk.0.5.0.nupkg
```

A GitHub release is not a Maven repository, so a `<repository>` element cannot resolve the
jar and it has to be installed from the download URL:

```bash
curl -L -o dexa-ai-sdk.jar \
  https://github.com/dsainvg/decide-extract-sdk/releases/download/v0.5.0/java-dexa-ai-sdk-0.5.0.jar
mvn install:install-file -Dfile=dexa-ai-sdk.jar -DgroupId=com.dsainvg -DartifactId=dexa-ai-sdk -Dversion=0.5.0
```

Publishing Java and .NET to real registries later is a small change: add the publish job, its
secret, and a `registry` entry in `scripts/prepublish-check.mjs`.

## RubyGems authentication

The gem is published with **trusted publishing**, so there is no API key to
store. On rubygems.org, before the first release, register a *pending* trusted
publisher for the gem name, then release it:

| Field | Value |
| --- | --- |
| Gem name | `dexa-ai-sdk` |
| Repository owner | `dsainvg` |
| Repository name | `decide-extract-sdk` |
| Workflow filename | `release.yml`, exactly |
| Environment | leave blank unless this repo defines a matching one |

The workflow exchanges the run's OIDC identity for a short lived push token.
`RUBY_API_KEY` is kept only as a fallback, so a release still works if the
trusted publisher has not been registered yet.

Two things that will otherwise fail:

- The filename must match the workflow file character for character. `release.yaml`
  is not `release.yml`.
- Multi-factor authentication must be set to **UI only**. At *UI and API*,
  RubyGems demands a second factor on every push and CI cannot answer it.

## Naming

The Java client is `com.dsainvg:dexa-ai-sdk`, named after Decide + Extract. The bare names `dexa`
and `dexa-ai-sdk` are already taken on npm and PyPI by unrelated projects, so only the Maven
coordinates use them; the other languages stay under the `@dsainvg` and `dsainvg-` names that
are free.

## npm

1. `npmjs.com -> Access Tokens -> Generate New Token -> Automation`.
2. Grant *read/write* to the `@dsainvg` scope: select the org and the package.
3. Add as `NPM_TOKEN`.
4. The `@dsainvg` scope must exist and be **public** on npmjs.com, or the first publish is
   rejected. Create it once at `https://www.npmjs.com/org/dsainvg/access/tokens/new-scope`.
5. The package name `@dsainvg/dexa-ai-sdk` must be free.

The workflow publishes with `--provenance`, which needs no extra setup but only works when
the publish runs on GitHub Actions, which it does.

## PyPI

Two options. The workflow uses the token if it exists, and trusted publishing otherwise.

**Token**

1. PyPI -> Account settings -> API tokens -> Add token, scoped to
   `dexa-ai-sdk`.
2. The project must already exist on PyPI, so the first publish has to come from a local
   `uv publish` or from a placeholder upload.
3. Add as `PYPI_API_TOKEN`.

**Trusted publishing, recommended, no secret**

1. Create the PyPI project once.
2. PyPI -> Manage -> Publishing -> add a GitHub publisher:
   - owner: your GitHub user or org
   - repository: `dexa-ai-sdk`
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