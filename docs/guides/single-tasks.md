---
title: Single tasks
description: The /decide and /extract shortcuts for when there is exactly one task.
order: 2
---

Batching exists to share context across tasks. When you only have one task, `POST /decide`
and `POST /extract` skip the array and give you a flatter request and response.

## POST /decide

```bash
curl -X POST http://localhost:8080/decide \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEXA_TOKEN" \
  -d '{
    "model": "decider-extractor-v1",
    "context": "User says: renew subscription for 2 years. Previous plan expired 3 months ago.",
    "question": "Should we offer a renewal discount?",
    "options": ["yes", "no"]
  }'
```

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
  "result": {
    "value": "yes",
    "probabilities": { "yes": 0.85, "no": 0.10 },
    "reason": "Two-year term and a three-month lapse"
  },
  "decision": {
    "value": "yes",
    "probabilities": { "yes": 0.85, "no": 0.10 },
    "reason": "Two-year term and a three-month lapse"
  },
  "value": "yes",
  "usage": { "prompt_tokens": 44, "completion_tokens": 6, "total_tokens": 50 }
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `model` | yes | Model identifier |
| `question` | yes | The question to answer |
| `context` / `messages` | yes | One of the two, same rule as `/v1/tasks` |
| `options` / `choices` | no | Allowed answers. Defaults to `["yes", "no"]` for boolean decisions; can specify more than 2 options |
| `instruction` | no | Extra guidance |
| `temperature`, `max_output_tokens`, `response_format` | no | Same as everywhere |

The response carries the answer three times on purpose: `result` is canonical, `decision` is
an alias for OpenAI-shaped clients that expect a `decision` field, and `value` is the bare
string for callers that only want the answer. In `result`, `probabilities` maps each option to
its estimated likelihood. If probabilities do not add up to 1.0, the remaining probability is
treated as the model being **not sure** / uncertain.

## POST /extract

```bash
curl -X POST http://localhost:8080/extract \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEXA_TOKEN" \
  -d '{
    "model": "decider-extractor-v1",
    "context": "User says: renew subscription for 2 years. Previous plan expired 3 months ago.",
    "question": "What is the renewal term?"
  }'
```

```json
{
  "id": "req_7Lq2XzVb",
  "model": "decider-extractor-v1",
  "choices": [
    {
      "message": { "role": "assistant", "content": "24 months" },
      "finish_reason": "stop"
    }
  ],
  "result": { "value": "24 months" },
  "data": { "value": "24 months" },
  "value": "24 months",
  "usage": { "prompt_tokens": 41, "completion_tokens": 5, "total_tokens": 46 }
}
```

`result` is canonical, `data` is the alias, and `value` gives the extracted string directly. There are no `keys` or `fields`: `question` is required (with `instruction` accepted as an alias) and extracts a single target value.

## Which one should I use

| Situation | Use |
| --- | --- |
| One task, ever | `/decide` or `/extract` |
| Several tasks over the same context | `/v1/tasks` |
| A task list that sometimes has one item | `/v1/tasks` anyway, so the code has one path |

> [!TIP]
> `/v1/tasks` is a strict superset. If your code can handle a list, it can handle everything,
> and you avoid two code paths for the same call.