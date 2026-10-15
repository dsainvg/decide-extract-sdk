---
title: DESIGN-DECIDER-EXTRACTOR.md
description: Internal design notes, not published to the site.
hidden: true
---

# OpenAI-compatible non-streaming minimal design: decider + extractor

## Goal
Build a minimal OpenAI-compatible style API (non-streaming) but with two structured "task" types:
- **Decider**: returns a short decision (often yes/no/class) based on context + question. Think "should I do X?" or classification.
- **Extractor**: pulls structured fields from text/context (extract entities, answers, or small JSON-like fields).

Both can be combined in a single request (decide + extract in one call) so the response is compact. Target response is small (max ~10 tokens for simple cases, but can carry structured results). 

## Core idea (inspired by Type=thought "decider/extractor" style)
Want a single endpoint like POST /v1/completions (or /v1/chat/completions style but constrained) that takes:
- `model` (string)
- `messages` or `input` + `context`
- `tasks`: array of task specs where each is either `{type: "decide", name, question, options?}` or `{type: "extract", name, schema, fields?}`. 
- `response_format` optional (enforce JSON output)
- `temperature` etc (optional)

Single response returns results for all tasks in order, e.g.:
{
  "tasks": {
    "decide_x": { "value": "yes", "reason": "..." }, // small
    "extract_y": { "name": "John", "age": 30 }
  }
}

But keep minimal.

## Requirements
- External SDK: TS + Python + others later
- Contract-first: OpenAPI 3.1 as source of truth
- Monorepo: contracts/, fern/, packages/sdk-ts, packages/sdk-py, apps/api
- Non-streaming only
- Compact outputs (aim < 10 tokens for pure boolean/class decisions)
- Combine multiple deciders + extractors in one request
- Easy to extend with new task types
- OpenAI-compatible structure where sensible (model, messages/context)

## OpenAPI sketch
Endpoint: POST /v1/decide-extract
Request:
- model: string
- context: string (or messages array)
- tasks: array with items discriminated by type
- max_output_tokens? small default
- temperature? low default for determinism
- response_format: { type: "json_object" } default

Task discriminators:
```yaml
oneOf:
  - $ref: '#/components/schemas/DecideTask'
  - $ref: '#/components/schemas/ExtractTask'
```

DecideTask: { type: enum[decide], id, question, options?: string[], instruction?: string }
ExtractTask: { type: enum[extract], id, instruction, schema?: object, keys?: string[] }

Response:
{
  "id": "...",
  "model": "...",
  "choices": [ { "message": { "content": "{\"tasks\": {...}}" }, "finish_reason": "stop" } ],
  "usage": {...},
  "tasks": { ... } (normalized)
}
But keep content minimal.

Also can return compact form: tasks keyed by id.

## SDK design goals
- TS client: minimal fetch-based (no deps). Methods like `decideExtract({ tasks: [...] })`.
- Python: requests/httpx based.
- Both strongly typed from OpenAPI via Fern.

## How to achieve with Fern
1. Write contracts/openapi.yaml with discriminated unions for tasks.
2. fern init -> generators.yml with ts+python.
3. fern generate -> packages/sdk-ts, packages/sdk-py.
4. apps/api implements endpoint.

## Example request
{
  "model": "decider-extractor-v1",
  "context": "User says: renew subscription for 2 years. Previous plan expired 3 months ago.",
  "tasks": [
    { "type": "decide", "id": "should_renew", "question": "Should we offer renewal discount?", "options": ["yes", "no"] },
    { "type": "extract", "id": "renew_term", "instruction": "Extract renewal term in months", "keys": ["months"] }
  ]
}

Example response (compact):
{
  "tasks": {
    "should_renew": { "value": "yes" },
    "renew_term": { "months": 24 }
  }
}

Yes this is small.

## Implementation notes
- Keep non-streaming only (no SSE). Simpler.
- Deterministic defaults (temperature low).
- Error handling via standard HTTP codes + JSON errors.

## Next steps (for approval)
I need to create contracts/openapi.yaml + DESIGN.md with this exact shape and examples. Then proceed.