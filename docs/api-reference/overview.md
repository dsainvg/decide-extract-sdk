---
title: API overview
description: Endpoints, conventions and shared request fields.
order: 1
---

Base URL in development: `http://localhost:8080`. All endpoints are `POST`, take and return
`application/json`, and authenticate with `Authorization: Bearer <token>`.

## Endpoints

| Endpoint | Operation id | Request | Response |
| --- | --- | --- | --- |
| `/v1/tasks` | `runTasks` | `RunTasksRequest` | `RunTasksResponse` |
| `/v1/decide-extract` | `decideExtract` | `RunTasksRequest` | `RunTasksResponse` |
| `/decide` | `decide` | `DecideRequest` | `DecideResponse` |
| `/extract` | `extract` | `ExtractRequest` | `ExtractResponse` |

- [POST /v1/tasks](/api-reference/run-tasks/)
- [POST /v1/decide-extract](/api-reference/decide-extract/)
- [POST /decide](/api-reference/decide/)
- [POST /extract](/api-reference/extract/)
- [Types](/api-reference/types/)

## Shared conventions

**Input is required.** Every request needs `model` plus exactly one of `context` or
`messages`. The contract expresses this as a `oneOf` over those two fields.

**Output is batched and keyed.** `/v1/tasks` answers every task in one response, keyed by
each task's `name`. See [structured output](/guides/structured-output/).

**Strictness.** Unknown fields are rejected, not ignored. Requests that validate locally in
your client will validate on the server, but requests hand-built as JSON can fail.

**Aliases exist for compatibility.** Old names are still accepted and old names are still
returned. New code should use `name`, `results`, `options` and `keys`.
See [versioning](/guides/versioning/).

**Non-streaming.** There is no streaming endpoint and `stream` is not a valid field.

## Shared request fields

Present on every request:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `model` | string | yes | - |
| `context` | string | one of | - |
| `messages` | array of `Message` | one of | - |
| `images` | array of `ImageInput` | no | - |
| `audio` | array of `AudioInput` | no | - |
| `temperature` | number, 0-2 | no | `0` |
| `max_output_tokens` | integer, 1-4096 | no | `16` |
| `response_format` | `{ type: "json_object" }` | no | `json_object` |
| `target_language` | enum | no | - |
| `output_language` | enum | no | alias |

## Response envelope

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Request id, for logs and support |
| `model` | string | The model that ran |
| `choices` | array, exactly one | OpenAI-shaped copy of the answer |
| `results` | object | The canonical answers, keyed by task name |
| `tasks` | object | Alias of `results` |
| `usage` | `Usage` | Token counts |

## Status codes

| Status | Meaning |
| --- | --- |
| `200` | Success |
| `400` | Malformed request, or missing `context`/`messages` |
| `401` | Missing or invalid API key |
| `403` | Key cannot use this model |
| `422` | Invalid values |
| `429` | Rate limited |
| `500` | Server error |

Every error body has the shape `{ "error": { "type", "message", "param?", "code?" } }`.
See [errors](/guides/errors/).