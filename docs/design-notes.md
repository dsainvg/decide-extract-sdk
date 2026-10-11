---
title: design-notes.md
description: Internal design notes, not published to the site.
hidden: true
---

# Documentation

Design notes from the contract-first work. The API contract itself lives at
[`fern/openapi/openapi.yml`](../fern/openapi/openapi.yml) and is the source of truth -
these notes describe how it got here, they do not override it.

| File | Contents |
| --- | --- |
| [DESIGN-DECIDER-EXTRACTOR.md](DESIGN-DECIDER-EXTRACTOR.md) | Why decider/extractor task types, the original API sketch and trade-offs |
| [README-DESIGN.md](README-DESIGN.md) | Summary of what was designed and what remains |
| [FERN-HANDOFF.md](FERN-HANDOFF.md) | Session handoff used to bootstrap the Fern project |

## Lost during reorganisation

These notes were present in the repository root before the Fern project was set up and
disappeared while the tree was being restructured. They have not been recovered:

- `EXAMPLES-DECIDER-EXTRACTOR.md` (request/response examples for single, mixed and multi task requests)
- `EXAMPLES-TYPESAFE-STYLE.md`
- `COMPARISON-TYPESAFE.md`
- `ALIGNMENT-VERIFICATION.md`
- `NEXT-TASKS.md`
- `TWEAK-PROPOSAL.md`

Recover them from wherever they were last committed or backed up and drop them back
into `docs/`. The request/response examples are also worth re-deriving from the contract
once the API server exists.

## Regenerated project layout

The notes above describe an older layout. The repository now looks like this:

```
fern/openapi/openapi.yml   contract (was contracts/openapi.yaml)
fern/generators.yml        Fern generators
packages/sdk-ts            generated TypeScript client
packages/sdk-py            generated Python client
```

The path `contracts/openapi.yaml` was retired: Fern resolves spec paths inside the
project directory, and SDK Config rejects paths that escape it.