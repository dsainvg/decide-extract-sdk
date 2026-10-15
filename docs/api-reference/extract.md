---
title: POST /extract
description: Run one extractor task without wrapping it in a list.
order: 5
---

```http
POST /extract
```

Use this when there is exactly one extraction to perform.

## Request

### ExtractRequest

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `model` | string | yes | - |
| `instruction` | string | yes | - |
| `context` | string | one of | - |
| `messages` | array of `Message` | one of | - |
| `images` | array of `ImageInput` | no | - |
| `audio` | array of `AudioInput` | no | - |
| `keys` | array of string | no | - |
| `fields` | array of string | no | alias of `keys` |
| `schema` | object | no | JSON-Schema-like shape |
| `temperature` | number, 0-2 | no | `0` |
| `max_output_tokens` | integer, 1-4096 | no | `16` |
| `response_format` | object | no | `json_object` |
| `target_language` | enum | no | - |
| `output_language` | enum | no | alias |

```json
{
  "model": "decider-extractor-v1",
  "context": "User says: renew subscription for 2 years. Previous plan expired 3 months ago.",
  "instruction": "Extract the renewal term in months",
  "keys": ["months"]
}
```

## Response

### ExtractResponse

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Request id |
| `model` | string | Model that ran |
| `choices` | array of `Choice` | Exactly one element |
| `result` | object | The extracted fields |
| `data` | object | Alias of `result` |
| `usage` | `Usage` | Token counts |

```json
{
  "id": "req_7Lq2XzVb",
  "model": "decider-extractor-v1",
  "choices": [
    {
      "message": { "role": "assistant", "content": "{\"months\":24}" },
      "finish_reason": "stop"
    }
  ],
  "result": { "months": 24 },
  "data": { "months": 24 },
  "usage": { "prompt_tokens": 41, "completion_tokens": 5, "total_tokens": 46 }
}
```

`result` is whatever the `keys` or `schema` asked for, so it is a free-form object. With
`schema` the shape follows that schema.

## Clients

```ts
await client.tasks.extract(request);
```

```python
client.tasks.extract(request)
```

```ruby
client.tasks.extract(request)
```

```rust
client.tasks().extract(request).await?;
```

```java
client.tasks().extract(request);
```

```csharp
await client.Tasks.ExtractAsync(request);
```

## Errors

`400` without `context` or `messages`, `422` for an empty `keys` array or a malformed
`schema`, plus the standard failures. See [errors](/guides/errors/).