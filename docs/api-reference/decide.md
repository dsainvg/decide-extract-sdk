---
title: POST /decide
description: Run one decider task without wrapping it in a list.
order: 4
---

```http
POST /decide
```

Use this when there is exactly one decision to make. The task fields move up to the top level
and the response is flat.

## Request

### DecideRequest

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `model` | string | yes | - |
| `question` | string | yes | - |
| `context` | string | one of | - |
| `messages` | array of `Message` | one of | - |
| `images` | array of `ImageInput` | no | - |
| `audio` | array of `AudioInput` | no | - |
| `options` | array of string | no | - |
| `choices` | array of string | no | alias of `options` |
| `instruction` | string | no | - |
| `temperature` | number, 0-2 | no | `0` |
| `max_output_tokens` | integer, 1-4096 | no | `16` |
| `response_format` | object | no | `json_object` |
| `target_language` | enum | no | - |
| `output_language` | enum | no | alias |

```json
{
  "model": "decider-extractor-v1",
  "context": "User says: renew subscription for 2 years. Previous plan expired 3 months ago.",
  "question": "Should we offer a renewal discount?",
  "options": ["yes", "no"]
}
```

## Response

### DecideResponse

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Request id |
| `model` | string | Model that ran |
| `choices` | array of `Choice` | Exactly one element |
| `result` | `DecideResult` | Canonical answer |
| `decision` | `DecideResult` | Alias of `result` |
| `value` | string | The bare answer |
| `usage` | `Usage` | Token counts |

### DecideResult

| Field | Type | Required |
| --- | --- | --- |
| `value` | string | yes |
| `reason` | string | no |

```json
{
  "id": "req_4Kd8PwPq",
  "model": "decider-extractor-v1",
  "choices": [
    {
      "message": { "role": "assistant", "content": "{\"value\":\"yes\"}" },
      "finish_reason": "stop"
    }
  ],
  "result": { "value": "yes", "reason": "Two-year term and a three-month lapse" },
  "decision": { "value": "yes", "reason": "Two-year term and a three-month lapse" },
  "value": "yes",
  "usage": { "prompt_tokens": 44, "completion_tokens": 6, "total_tokens": 50 }
}
```

## Clients

```ts
await client.tasks.decide(request);
```

```python
client.tasks.decide(request)
```

```ruby
client.tasks.decide(request)
```

```rust
client.tasks().decide(request).await?;
```

```java
client.tasks().decide(request);
```

```csharp
await client.Tasks.DecideAsync(request);
```

## Errors

`400` without `context` or `messages`, `422` for a bad `question` or an out-of-range
`temperature` or `max_output_tokens`, plus the standard authentication and rate-limit
failures. See [errors](/guides/errors/).