---
title: README-DESIGN.md
description: Internal design notes, not published to the site.
hidden: true
---

# Summary
Created:
- DESIGN-DECIDER-EXTRACTOR.md: design/spec explanation, goals, API sketch, examples, notes
- contracts/openapi.yaml: OpenAPI 3.1 contract for POST /v1/decide-extract with discriminated tasks (decide/extract), OpenAI-compatible structure, non-streaming
- EXAMPLES-DECIDER-EXTRACTOR.md: concrete request/response examples covering single/mixed/multi tasks

Contract-first, monorepo-ready (contracts/, fern/, packages/sdk-ts, packages/sdk-py, apps/api). Next steps: init Fern, configure TS+Python generators, generate SDKs, implement backend.