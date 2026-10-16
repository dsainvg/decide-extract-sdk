---
title: Task types
description: How decider and extractor tasks are shaped, named, and answered.
order: 1
---

Every task is one entry in the `tasks` array and is one of two kinds, chosen by its `type`
field. The field is the discriminator: the API routes on it, and the generated clients type
it as a union of `DecideTask` and `ExtractTask`.

## Decider

A decider answers one question with one value selected from a set of choices.

```json
{
  "type": "decide",
  "name": "should_renew",
  "question": "Should we offer a renewal discount?",
  "options": ["yes", "no"]
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `type` | yes | Always `decide` |
| `name` | yes | Key this result appears under in `results`. Has no effect on LLM inference. |
| `question` | yes | The question to answer |
| `options` | no | Allowed answers. Defaults to `["yes", "no"]` for boolean decisions; may have more than 2 options. |
| `choices` | no | Alias of `options`. Defaults to `["yes", "no"]` |
| `instruction` | no | Extra guidance for this one decision |
| `target_language` | no | Overrides the request language for this task |
| `id` | no | Legacy alias of `name` |

### Boolean Decisions and Multi-Option Decisions

By default, omitting `options` (or `choices`) creates a **boolean decision** defaulting to `["yes", "no"]`. When needed, deciders can specify more than two options (for example, `["approve", "reject", "escalate"]`).

### Decision Probabilities and "Not Sure"

Every decision returns a `probabilities` map providing the estimated likelihood for each option:

```json
{
  "should_renew": {
    "value": "yes",
    "probabilities": {
      "yes": 0.85,
      "no": 0.10
    },
    "reason": "Two-year term and a three-month lapse"
  }
}
```

> [!NOTE]
> The option probabilities may not add up to `1.0`. In such cases, the remaining probability (`1.0 - sum(probabilities)`) should be treated as the model's probability of being **not sure** / uncertain.

`reason` costs completion tokens. Leave it out of the request if you do not read it, and
lower `max_output_tokens` accordingly.

## Extractor

An extractor answers an extraction `question` against the context. There are no `keys` or `fields`: the question itself specifies what to extract (a single extraction per task, rather than multiple fields).

```json
{
  "type": "extract",
  "name": "renew_term",
  "question": "What is the renewal term?"
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `type` | yes | Always `extract` |
| `name` | yes | Key this result appears under in `results`. Has no effect on LLM inference. |
| `question` | yes | The extraction question or prompt (previously `instruction`) |
| `instruction` | no | Backward-compatible alias for `question` |
| `schema` | no | Optional JSON-Schema-like object describing shape |
| `target_language` | no | Overrides the request language for this task |
| `id` | no | Legacy alias of `name` |

Answered as:

```json
{ "renew_term": { "value": "24 months" } }
```

## Naming

`name` is the key in `results`, so choose names your code can read out loud:

```json
{ "name": "should_renew" }
```

```json
{ "results": { "should_renew": { "value": "yes", "probabilities": { "yes": 0.85, "no": 0.10 } } } }
```

The pattern is `[a-zA-Z0-9_][a-zA-Z0-9_.-]{0,63}`: letters, digits, underscore, dot and
hyphen, up to 64 characters, and it cannot start with a dot or a hyphen. Names must be unique
within a request; duplicates overwrite each other in `results`.

> [!IMPORTANT]
> The `name` field has **no effect on LLM inference**. It is strictly used as the dictionary key to index and return each task's answer in `results`.

> [!WARNING]
> Naming a field `id` used to be the only way. It still works, but `name` is canonical. Pick one
> and stay with it, or `results` will be keyed by whichever the model preferred.

## Deciders and extractors together

Tasks of both kinds go in one array and are answered together, in one call:

```json
{
  "model": "decider-extractor-v1",
  "context": "Ada upgraded to enterprise on 3 March. Invoice INV-8842 totals 4200 EUR.",
  "tasks": [
    { "type": "decide", "name": "is_churn_risk", "question": "Is there churn risk?", "options": ["yes", "no"] },
    { "type": "extract", "name": "invoice_total", "question": "What is the total amount and currency on the invoice?" }
  ]
}
```

```json
{
  "results": {
    "is_churn_risk": { "value": "no", "probabilities": { "yes": 0.05, "no": 0.90 } },
    "invoice_total": { "value": "4200 EUR" }
  }
}
```

This is the main reason the API exists: both tasks need the same context, so pay to read it
once.