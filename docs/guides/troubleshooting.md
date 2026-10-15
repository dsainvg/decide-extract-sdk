---
title: Troubleshooting
description: Symptoms, causes and fixes for the problems that actually come up.
order: 7
---

## `400: one of context or messages is required`

Every endpoint needs something to work from. Send `context` as a single string, or `messages`
when you need roles or content parts. The two are alternatives, never both.

## `400: Unrecognized property`

Requests are strict. The most common offenders are `stream` (this API never streams) and
snake_case fields that do not exist, such as `max_tokens` instead of `max_output_tokens`. The
error names the offending property.

## `400: Unrecognized property: 'max_tokens'`

The field is `max_output_tokens`, matching OpenAI's newer naming rather than the old one.

## `422: tasks must contain at least one task`

`tasks` cannot be empty. If you built the list dynamically and it came out empty, check the
filter that filled it before calling.

## `422: task names must be unique`

Two tasks shared a `name`, so one answer overwrote the other in `results`. This passes
validation and produces wrong data, so validate names yourself when you build task lists
dynamically.

## The answer is cut off

`finish_reason` is `length`. The batch hit `max_output_tokens`, usually an extractor asking
for more fields than the default 16 tokens allows. Raise it, or split the batch.

```json
{ "max_output_tokens": 256 }
```

## `finish_reason` is `content_filter`

The request was stopped by a safety filter. Retrying the same input gives the same result;
change the content or split the request.

## Answers come back in the wrong language

Set `target_language`, or `output_language` if that reads better. It applies to the whole
request, and each task can override it.

```json
{ "target_language": "fr" }
```

Keep keys in English and translate values. Code that reads `results.invoice_number` keeps
working when the language changes.

## `401` on every call

Check the header is `Authorization: Bearer <token>` and not `Authorization: <token>`, and
that the token is not quoted, has no trailing newline from a `.env` file, and has not been
rotated out from under the process.

## Everything is slow and the bill went up

Look at `usage.prompt_tokens`. Batching many tasks over a large context, or attaching base64
media, dominates the cost. Put more tasks in each call instead of making more calls, and
trim the context to what the tasks actually need.

## Base64 media is rejected

Send `mime_type`. The server should not have to infer the format from the payload's first
bytes, and some clients require it. Valid values are `image/png`, `image/jpeg`, `image/webp`,
`image/gif`, `audio/mp3`, `audio/wav`, `audio/mpeg`, `audio/ogg`, `audio/mp4`.

## The client cannot reach the server

The contract's default base URL is `http://localhost:8080`. Against anything else, set
`baseUrl` (or `base_url` in Python, `base_url` in Ruby) explicitly.

## Generated client names differ from the docs

Method names follow the contract's operation ids and tag names, so a rename in
`fern/openapi/openapi.yml` changes them after the next generation. Check the generated
source in `packages/sdk-<language>/` if something does not match, and upgrade your client.