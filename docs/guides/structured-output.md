---
title: Structured output
description: How results are shaped, keyed, and repeated for OpenAI compatibility.
order: 4
---

## results

The canonical answer is `results`, an object keyed by each task's `name`:

```json
{
  "results": {
    "should_renew": { "value": "yes" },
    "renew_term": { "months": 24 }
  }
}
```

It is a free-form object, so decider answers are `{ value, reason? }` objects and extractor
answers are whatever the task asked for. Generated clients type the known paths and let you
index the rest.

> [!TIP]
> Iterate over the keys you sent rather than the keys you got back. A model asked for
> `should_renew` will return `should_renew`, but do not let a missing key crash the caller.

## tasks, the alias

`tasks` carries the same object as `results`, kept for clients written against the first
version of the contract. Exactly one of the two is populated in practice; read `results`
unless you are maintaining an old client.

## choices

The OpenAI-shaped part of the response:

```json
{
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "{\"should_renew\":{\"value\":\"yes\"},\"renew_term\":{\"months\":24}}"
      },
      "finish_reason": "stop"
    }
  ]
}
```

`content` is the whole `results` object encoded as a JSON string. You never need it if you
read `results`, but it is what makes the response usable by generic OpenAI tooling.

`finish_reason` is one of:

| Value | Meaning |
| --- | --- |
| `stop` | Finished normally. The normal case |
| `length` | Hit `max_output_tokens` before finishing |
| `reason`: `content_filter` | Stopped by a safety filter |

`length` on a batch means at least one task was truncated, usually an extractor that wanted
more room. Raise `max_output_tokens` and retry. `content_filter` is not retryable with the
same input; change the context.

## usage

```json
{
  "usage": {
    "prompt_tokens": 61,
    "completion_tokens": 9,
    "total_tokens": 70
  }
}
```

All three are always present and never negative. `total_tokens` is
`prompt_tokens + completion_tokens`.

## What a batch costs

Everything is billed on one prompt that contains the context, the images, the audio and
every task, plus one completion holding every answer.

| Tasks | Context | prompt_tokens (approx.) |
| --- | --- | --- |
| 1 decide | one sentence | ~40 |
| 5 mixed tasks | one paragraph | ~90 |
| 10 mixed tasks + image | a page and a screenshot | ~1200 |

One request with ten tasks costs a little more than a single call, and far less than ten.
That trade is the point of the API.