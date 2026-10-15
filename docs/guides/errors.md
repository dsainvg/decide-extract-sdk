---
title: Errors
description: Status codes, the error body, and what to do about each failure.
order: 5
---

## Error body

Every failure, at every endpoint, returns the same shape:

```json
{
  "error": {
    "type": "invalid_request_error",
    "message": "tasks must contain at least one task",
    "param": "tasks",
    "code": "too_few_tasks"
  }
}
```

| Field | Always present | Notes |
| --- | --- | --- |
| `type` | yes | Broad category, `invalid_request_error` style |
| `message` | yes | Human-readable, safe to log |
| `param` | no | Which field was wrong |
| `code` | no | Stable machine-readable code, safe to branch on |

Branch on `code`, log `message`, show neither to end users.

## Status codes

| Status | When it happens | Retry? |
| --- | --- | --- |
| `400` | Malformed JSON, unknown field, missing `context` or `messages` | No, fix the request |
| `401` | Missing or invalid API key | No |
| `403` | Key cannot use this model | No |
| `422` | Well-formed JSON, invalid values | No, fix the request |
| `429` | Rate limited | Yes, after `Retry-After` |
| `500` | Server-side failure | Yes, with backoff |

## Common errors

### `400` no input

```json
{ "error": { "type": "invalid_request_error", "message": "one of context or messages is required", "code": "missing_input" } }
```

Every endpoint needs text to work from. Send `context` for a single blob, or `messages` when
you need roles or content parts.

### `400` unknown field

```json
{ "error": { "type": "invalid_request_error", "message": "Unrecognized property: 'stream'", "param": "stream", "code": "unknown_field" } }
```

Requests are strict. Unknown fields are rejected rather than ignored, so a typo fails loudly
instead of silently doing nothing. The API is also non-streaming, so `stream` is never valid.

### `422` bad task name

```json
{ "error": { "type": "validation_error", "message": "name must match ^[a-zA-Z0-9_][a-zA-Z0-9_.-]{0,63}$", "param": "tasks[1].name", "code": "invalid_task_name" } }
```

`param` points at the exact index in `tasks` that failed.

### `422` out of range

```json
{ "error": { "type": "validation_error", "message": "max_output_tokens must be between 1 and 4096", "param": "max_output_tokens", "code": "out_of_range" } }
```

`temperature` is `0` to `2`, `max_output_tokens` is `1` to `4096`.

### `429` rate limited

```json
{ "error": { "type": "rate_limit_error", "message": "Rate limit reached", "code": "rate_limit_exceeded" } }
```

Honour the `Retry-After` header, fall back to exponential backoff with jitter, and batch more
tasks per call rather than retrying in a tight loop.

### `500` server error

```json
{ "error": { "type": "api_error", "message": "Internal server error", "code": "internal_error" } }
```

Retry with backoff. If it persists, the `request id` from the response is what support needs.

## Handling in the clients

The generated clients throw on any non-2xx response, with the status code and the parsed
error body attached.

```ts
import { DexaAiSdkError } from "@dsainvg/dexa-ai-sdk";

try {
  await client.tasks.decideExtract(request);
} catch (error) {
  if (error instanceof DexaAiSdkError) {
    console.error(error.statusCode, error.body?.error?.code);
  }
}
```

```python
from dexa_ai_sdk.core.api_error import ApiError

try:
    client.tasks.decide_extract(request)
except ApiError as error:
    print(error.status_code, error.body["error"]["code"])
```

Retry only on `429` and `5xx`. Everything else needs a change to the request.