# Releasing

The version lives in exactly one place: `info.version` in `fern/openapi/openapi.yml`. Every
registry, the git tag and the GitHub Release get that number. Release CI refuses to publish
if the tag and the contract disagree.

## One-time registry setup

See [PUBLISHING.md](PUBLISHING.md) for the full walkthrough. In short:

| Destination | Secret(s) | Required |
| --- | --- | --- |
| npm | `NPM_TOKEN` | yes for npm publishing |
| PyPI | none, or `PYPI_API_TOKEN` | no, trusted publishing by default |
| Ruby, Rust, Java, .NET | none | files attached to the GitHub Release |
| Docs site | none | pushed to the `sites` branch with `GITHUB_TOKEN` |

The four non-npm registries need no account and no tokens. Their packages are built during
the release and attached to it.

## Cutting a release

```bash
# 1. bump the contract version and regenerate (needs Docker)
npm run version:bump -- minor

# 2. review, then commit spec + generated clients together
git add fern/openapi/openapi.yml packages
git commit -m "release: v0.4.0"

# 3. tag and push
git tag -a v0.4.0 -m "v0.4.0"
git push origin main --tags
```

Or set the version explicitly: `npm run version:bump -- 0.4.0`.

Run the gate locally first, it is the same code CI runs:

```bash
npm run release:check -- --tag v0.4.0
npm run build:artifacts
```

## What the workflow does

`.github/workflows/release.yml`, triggered by the `v*` tag:

| Job | Checks |
| --- | --- |
| `verify` | tag equals the contract version |
| `gate` | `scripts/prepublish-check.mjs`: contract, tag, `fern check`, no drift, every package version, every package build and artifact, credentials present |
| `npm` | install, build, `npm publish --provenance` |
| `pypi` | `uv build`, publish by token or trusted publishing |
| `artifacts` | builds every package, collects `.gem`, `.crate`, `.jar`, `.nupkg`, `.tgz`, `.whl` |
| `github-release` | attaches the files and creates the release with auto-generated notes |

Publish jobs run in parallel, so a failure on npm does not block PyPI or the artifacts. The
release is created only once every configured publish succeeded, so its download list always
matches what is actually on the registries.

To re-run a failed publish, re-run that job from the Actions tab. Versions are immutable on
every registry, so re-running a job that already succeeded will fail.

## Checklist

- [ ] Contract change reviewed, `fern check` clean
- [ ] `packages/` regenerated and committed
- [ ] `CHANGELOG.md` updated under the new version
- [ ] `npm test` green locally
- [ ] `npm run release:check` green
- [ ] Tag matches `info.version`
- [ ] CI green on `main` before tagging