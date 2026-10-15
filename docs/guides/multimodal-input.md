---
title: Multimodal input
description: Attaching images and audio to a request through messages content parts.
order: 3
---

Tasks can read images and audio as well as text. Inputs are attached at the request level
with `images` and `audio`, or inside a message as content parts. Both forms reach the same
model context.

## Images

```json
{
  "model": "decider-extractor-v1",
  "context": "Which of these two invoices is larger?",
  "images": [
    { "type": "url", "url": "https://example.com/invoice-a.png" },
    { "type": "base64", "data": "iVBORw0KGgoAAAANSUhEUg...", "mime_type": "image/png" }
  ],
  "tasks": [
    { "type": "decide", "name": "a_is_larger", "question": "Is invoice A larger than invoice B?", "options": ["yes", "no"] },
    { "type": "extract", "name": "invoice_a_total", "instruction": "Extract the total from invoice A", "keys": ["amount", "currency"] }
  ]
}
```

| Field | Notes |
| --- | --- |
| `type` | `url` or `base64` |
| `url` | Set when `type` is `url` |
| `data` | Base64-encoded payload, set when `type` is `base64` |
| `mime_type` | `image/png`, `image/jpeg`, `image/webp`, `image/gif` |

Always send `mime_type` with base64 data. Without it the server has to guess the format from
the first bytes, which is slower and occasionally wrong.

## Audio

```json
{
  "model": "decider-extractor-v1",
  "context": "Summarise what the customer asked for",
  "audio": [
    { "type": "base64", "data": "SUQzBAAAAA...", "mime_type": "audio/mp3" }
  ],
  "tasks": [
    { "type": "extract", "name": "requested_items", "instruction": "Extract the items the customer asked about", "keys": ["items"] }
  ]
}
```

| Field | Notes |
| --- | --- |
| `type` | `url` or `base64` |
| `url` | Set when `type` is `url` |
| `data` | Base64-encoded payload, set when `type` is `base64` |
| `mime_type` | `audio/mp3`, `audio/wav`, `audio/mpeg`, `audio/ogg`, `audio/mp4` |

## Content parts in messages

When you want per-turn control, use `messages` instead of `context`. `content` is either a
plain string or a list of parts:

```json
{
  "model": "decider-extractor-v1",
  "messages": [
    {
      "role": "system",
      "content": "You are extracting from support calls."
    },
    {
      "role": "user",
      "content": [
        { "type": "text", "text": "Which document is this, and what is the total?" },
        { "type": "image_url", "image_url": { "url": "https://example.com/doc.png", "detail": "high" } }
      ]
    }
  ],
  "tasks": [
    { "type": "extract", "name": "document", "instruction": "Extract the document type and total", "keys": ["type", "total"] }
  ]
}
```

### Content part fields

| Field | Notes |
| --- | --- |
| `type` | `text`, `image_url`, `image`, `audio`, `input_audio` |
| `text` | Set when `type` is `text` |
| `language` | Language of this part, for example `en` or `ja` |
| `image_url` | `{ "url": "...", "detail": "low" \| "high" \| "auto" }` |
| `image` | An `ImageInput` object |
| `audio`, `input_audio` | An `AudioInput` object |

`image_url` is the OpenAI-compatible spelling and takes a URL plus a `detail` hint. `image`
is the same object used by the top-level `images` array, which is more convenient when the
bytes are already base64.

`audio` and `input_audio` are aliases, so existing OpenAI code can be moved over unchanged.

### Message fields

| Field | Required | Notes |
| --- | --- | --- |
| `role` | yes | `system`, `user` or `assistant` |
| `content` | yes | String, or a list of content parts |
| `language` | no | Language of the whole message |

## Choosing between them

| Situation | Use |
| --- | --- |
| Plain text, no system prompt | `context` |
| Need a system prompt or a conversation | `messages` |
| A few images and nothing conversational | `context` plus `images` |
| Fine control over which part is which language | `messages` with content parts |

`context` and `messages` are mutually exclusive at the top level: send one or the other,
never both, and the API rejects requests that carry neither.

> [!WARNING]
> Base64 media is counted as prompt tokens, and audio is not cheap. Put many small decisions
> over one recording into a single request rather than calling once per question, and watch
> `usage.prompt_tokens` if the calls are frequent.