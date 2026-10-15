---
title: POST /v1/tasks
description: Run any mix of decider and extractor tasks in a single request.
order: 2
---

The main endpoint. Send every task you need answered over the same context in one request.

```http
POST /v1/tasks
```

## Request

### RunTasksRequest

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | - | Model identifier |
| `context` | string | one of | - | Free-form text the tasks read |
| `messages` | array of `Message` | one of | - | OpenAI-style turns |
| `images` | array of `ImageInput` | no | - | Images to read |
| `audio` | array of `AudioInput` | no | - | Audio to read |
| `tasks` | array of `Task` | yes | - | At least one task |
| `temperature` | number, 0-2 | no | `0` | Deterministic by default |
| `max_output_tokens` | integer, 1-4096 | no | `16` | Room for the whole batch |
| `response_format` | object | no | `json_object` | `type` must be `json_object` |
| `target_language` | enum | no | - | Language for the results |
| `output_language` | enum | no | - | Alias of `target_language` |

Exactly one of `context` and `messages` must be present.

### Task

A discriminated union on `type`:

| `type` | Schema | Required fields |
| --- | --- | --- |
| `decide` | `DecideTask` | `name`, `question` |
| `extract` | `ExtractTask` | `name`, `instruction` |

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

## Response

### RunTasksResponse

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Request id |
| `model` | string | Model that ran |
| `choices` | array of `Choice` | Exactly one element |
| `results` | object | Answers keyed by task name |
| `tasks` | object | Alias of `results` |
| `usage` | `Usage` | Token counts |

```json
{
  "id": "req_9X2kFvTnQpR4w",
  "model": "decider-extractor-v1",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "{\"should_renew\":{\"value\":\"yes\"},\"renew_term\":{\"months\":24}}"
      },
      "finish_reason": "stop"
    }
  ],
  "results": {
    "should_renew": { "value": "yes" },
    "renew_term": { "months": 24 }
  },
  "usage": { "prompt_tokens": 61, "completion_tokens": 9, "total_tokens": 70 }
}
```

## Clients

```ts
await client.tasks.runTasks(request);
```

```python
client.tasks.run_tasks(request)
```

```ruby
client.tasks.run_tasks(request)
```

```rust
client.tasks().run_tasks(request).await?;
```

```java
client.tasks().runTasks(request);
```

```csharp
await client.Tasks.RunTasksAsync(request);
```

## Errors

`400`, `422`, `429`, `500` with the standard error body. `401` and `403` for authentication
and model access. See [errors](/guides/errors/).