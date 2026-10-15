---
title: Types
description: Every schema in the contract, field by field.
order: 6
---

Generated from `fern/openapi/openapi.yml`. When this page and the contract disagree, the
contract wins and the clients follow it.

## Tasks

### DecideTask

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `type` | `"decide"` | yes | Discriminator |
| `name` | string | yes | Result key. `^[a-zA-Z0-9_][a-zA-Z0-9_.-]{0,63}$` |
| `question` | string | yes | The question to answer |
| `options` | array of string | no | At least one item |
| `choices` | array of string | no | Alias of `options` |
| `instruction` | string | no | Extra guidance |
| `target_language` | enum | no | Per-task language override |
| `id` | string | no | Legacy alias of `name` |

### ExtractTask

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `type` | `"extract"` | yes | Discriminator |
| `name` | string | yes | Result key, same pattern as `DecideTask` |
| `instruction` | string | yes | What to extract |
| `keys` | array of string | no | Expected field names |
| `fields` | array of string | no | Alias of `keys` |
| `schema` | object | no | JSON-Schema-like shape, extra properties allowed |
| `target_language` | enum | no | Per-task language override |
| `id` | string | no | Legacy alias of `name` |

### Task

`oneOf` of `DecideTask` and `ExtractTask`, discriminated on `type`.

## Content

### Message

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `role` | enum | yes | `system`, `user`, `assistant` |
| `content` | string or array of `ContentPart` | yes | |
| `language` | enum | no | Language of the message |

### ContentPart

| Field | Type | Notes |
| --- | --- | --- |
| `type` | enum | `text`, `image_url`, `image`, `audio`, `input_audio` |
| `text` | string | When `type` is `text` |
| `language` | enum | Language of this part |
| `image_url` | `ImageUrl` | When `type` is `image_url` |
| `image` | `ImageInput` | When `type` is `image` |
| `audio` | `AudioInput` | When `type` is `audio` |
| `input_audio` | `AudioInput` | When `type` is `input_audio` |

### ImageUrl

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `url` | string | yes | - |
| `detail` | enum | no | `auto`. One of `low`, `high`, `auto` |

### ImageInput

| Field | Type | Notes |
| --- | --- | --- |
| `type` | enum | `url` or `base64` |
| `url` | string | When `type` is `url` |
| `data` | string | Base64 payload, when `type` is `base64` |
| `mime_type` | string | `image/png`, `image/jpeg`, `image/webp`, `image/gif` |

### AudioInput

| Field | Type | Notes |
| --- | --- | --- |
| `type` | enum | `url` or `base64` |
| `url` | string | When `type` is `url` |
| `data` | string | Base64 payload, when `type` is `base64` |
| `mime_type` | string | `audio/mp3`, `audio/wav`, `audio/mpeg`, `audio/ogg`, `audio/mp4` |

## Responses

### Choice

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `message` | `ResponseMessage` | yes | |
| `finish_reason` | enum | yes | `stop`, `length`, `content_filter`. Defaults to `stop` |

### ResponseMessage

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `role` | `"assistant"` | yes | |
| `content` | string | yes | The answers as a JSON string |
| `language` | enum | no | Language of the answer |

### DecideResult

| Field | Type | Required |
| --- | --- | --- |
| `value` | string | yes |
| `reason` | string | no |

### Usage

| Field | Type | Required |
| --- | --- | --- |
| `prompt_tokens` | integer >= 0 | yes |
| `completion_tokens` | integer >= 0 | yes |
| `total_tokens` | integer >= 0 | yes |

## Errors

### ErrorResponse

| Field | Type | Required |
| --- | --- | --- |
| `error` | object | yes |

### Error object

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `type` | string | yes | Broad category |
| `message` | string | yes | Safe to log |
| `param` | string | no | Offending field |
| `code` | string | no | Stable machine-readable code |

## Language enum

Used by `target_language`, `output_language`, `Message.language`, `ContentPart.language` and
`ResponseMessage.language`:

`en`, `es`, `fr`, `de`, `it`, `pt`, `nl`, `ru`, `ja`, `ko`, `zh`, `ar`, `hi`, `tr`, `pl`,
`sv`, `da`, `no`, `fi`, `cs`