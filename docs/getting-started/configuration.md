---
title: Configuration
description: Base URLs, model selection, determinism and the controls every request shares.
order: 4
---

Every endpoint, single or batched, accepts the same generation controls.

| Field | Type | Default | Notes |
| --- | --- | --- | --- |
| `model` | string | required | Which model runs the tasks |
| `context` | string | - | Free-form text the tasks read. Required unless `messages` is given |
| `messages` | array | - | OpenAI-style turns. Required unless `context` is given |
| `temperature` | number | `0` | `0` to `2`. `0` is deterministic |
| `max_output_tokens` | integer | `16` | `1` to `4096`. Raise it when extracting many fields |
| `response_format` | object | `{ "type": "json_object" }` | JSON output is enforced |
| `target_language` | enum | - | Language for the results |
| `output_language` | enum | - | Alias of `target_language` |

## Base URL

The contract's default server is `http://localhost:8080`. Point clients at your deployment:

```ts
new DeciderExtractorClient({ baseUrl: "https://api.example.com" });
```

```python
DeciderExtractorClient(base_url="https://api.example.com", token=token)
```

## Determinism

`temperature` defaults to `0`, which makes repeated calls against the same input produce the
same answer. That is what you want for routing and compliance decisions.

If you need variation, raise it deliberately:

```json
{ "temperature": 0.7 }
```

Decisions are short by design. If a `decide` task comes back truncated, the whole request hit
`max_output_tokens`, not that one task. The default of `16` is plenty for several decisions;
raise it when a batch contains an extractor pulling a larger object.

## JSON output

`response_format` only accepts `json_object`, which is also the default, so you can leave it
out. It exists so the request shape matches the OpenAI API and so it can be relaxed later
without breaking clients.

## Language of the results

`target_language` (or its alias `output_language`) asks for the values in `results` to come
back in a given language. Supported values:

`en`, `es`, `fr`, `de`, `it`, `pt`, `nl`, `ru`, `ja`, `ko`, `zh`, `ar`, `hi`, `tr`, `pl`,
`sv`, `da`, `no`, `fi`, `cs`

A task can override the request default:

```json
{
  "target_language": "en",
  "tasks": [
    { "type": "decide", "name": "intent", "question": "What is the customer asking for?", "target_language": "fr" }
  ]
}
```

> [!TIP]
> Keep the keys stable and only translate the values. Downstream code that reads
> `results.invoice_number` keeps working when the content language changes.