---
title: Decider-Extractor API
description: Run many decider and extractor tasks in one compact, non-streaming request. Official SDKs for TypeScript, Python, Ruby, Rust, Java and .NET.
order: 1
---

The Decider-Extractor API runs many small judgement tasks against the same context in a
single request. Instead of paying for one completion per question, you send a list of
tasks and get back every answer in one response.

```json
{
  "model": "decider-extractor-v1",
  "context": "User says: renew subscription for 2 years. Previous plan expired 3 months ago.",
  "tasks": [
    { "type": "decide", "name": "should_renew", "question": "Should we offer a renewal discount?", "options": ["yes", "no"] },
    { "type": "extract", "name": "renew_term", "instruction": "Extract the renewal term in months", "keys": ["months"] }
  ]
}
```

```json
{
  "id": "req_9X2kFvTnQpR4w",
  "model": "decider-extractor-v1",
  "results": {
    "should_renew": { "value": "yes" },
    "renew_term": { "months": 24 }
  },
  "usage": { "prompt_tokens": 61, "completion_tokens": 9, "total_tokens": 70 }
}
```

## What it is built for

- **One call, many answers.** Ten questions about one document cost one round trip, not ten.
- **Tiny outputs.** Decisions are short strings, extractions are small objects. Pure decisions
  are designed to stay under ten completion tokens.
- **Deterministic by default.** `temperature` defaults to `0`.
- **OpenAI-shaped.** `model`, `messages`, `choices`, `usage` mean existing OpenAI tooling and
  mental models carry over.

> [!NOTE]
> The API is non-streaming by design. There is no SSE endpoint and none is planned for the
> current version.

## Start here

- [Installation](/getting-started/installation/) - add an SDK to your project
- [Quickstart](/getting-started/quickstart/) - first request in five minutes
- [Authentication](/getting-started/authentication/) - tokens and base URLs
- [Task types](/guides/task-types/) - deciders and extractors in depth
- [API reference](/api-reference/overview/) - every endpoint and field

## Endpoints

| Endpoint | Use it for |
| --- | --- |
| `POST /v1/tasks` | Any mix of decider and extractor tasks |
| `POST /v1/decide-extract` | Backwards-compatible alias of `/v1/tasks` |
| `POST /decide` | A single decider task, without wrapping it in a list |
| `POST /extract` | A single extractor task, without wrapping it in a list |

Prefer `/v1/tasks`. The other three exist so that simple calls stay simple and so that
clients written against the first version of the contract keep working.

## Client libraries

| Language | Package | Client class |
| --- | --- | --- |
| TypeScript | `@dsainvg/decide-extractor-sdk` | `DeciderExtractorClient` |
| Python | `dsainvg-decide-extractor-sdk` | `DeciderExtractorClient` |
| Ruby | gem | `DecideExtractor::Client` |
| Rust | crate | `DecideExtractorClient` |
| Java | Maven artifact | `DeciderExtractorClient` |
| .NET | NuGet package | `DeciderExtractorClient` |

C++ has no generated client. Call the HTTP API directly from any HTTP library, the payloads
are plain JSON. See [clients](/operations/clients/) for a worked C++ example.