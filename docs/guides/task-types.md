---
title: Task types
description: How decider and extractor tasks are shaped, named, and answered.
order: 1
---

Every task is one entry in the `tasks` array and is one of two kinds, chosen by its `type`
field. The field is the discriminator: the API routes on it, and the generated clients type
it as a union of `DecideTask` and `ExtractTask`.

## Decider

A decider answers one question with one short value.

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
| `name` | yes | Key this result appears under. `[a-zA-Z0-9_][a-zA-Z0-9_.-]{0,63}` |
| `question` | yes | The question to answer |
| `options` | no | Allowed answers. Constrains the output to one of them |
| `choices` | no | Alias of `options` |
| `instruction` | no | Extra guidance for this one decision |
| `target_language` | no | Overrides the request language for this task |
| `id` | no | Legacy alias of `name` |

Answered as:

```json
{ "should_renew": { "value": "yes" } }
```

A `reason` may be present when the model explains itself:

```json
{ "should_renew": { "value": "yes", "reason": "Two-year term and a three-month lapse" } }
```

`reason` costs completion tokens. Leave it out of the request if you do not read it, and
lower `max_output_tokens` accordingly.

## Extractor

An extractor pulls fields out of the context.

```json
{
  "type": "extract",
  "name": "renew_term",
  "instruction": "Extract the renewal term in months",
  "keys": ["months"]
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `type` | yes | Always `extract` |
| `name` | yes | Key this result appears under. Same pattern as `name` above |
| `instruction` | yes | What to extract and how to phrase it |
| `keys` | no | Expected field names |
| `fields` | no | Alias of `keys` |
| `schema` | no | A JSON-Schema-like object describing the shape |
| `target_language` | no | Overrides the request language for this task |
| `id` | no | Legacy alias of `name` |

Answered as:

```json
{ "renew_term": { "months": 24 } }
```

### Flat versus shaped

`keys` is the fast path, for flat objects:

```json
{ "type": "extract", "name": "customer", "instruction": "Extract the customer details", "keys": ["name", "plan"] }
```

```json
{ "customer": { "name": "Ada Lovelace", "plan": "enterprise" } }
```

Use `schema` when the result is nested or typed:

```json
{
  "type": "extract",
  "name": "invoice",
  "instruction": "Extract the invoice",
  "schema": {
    "type": "object",
    "properties": {
      "total": { "type": "number" },
      "currency": { "type": "string" },
      "lines": { "type": "array", "items": { "type": "object" } }
    },
    "required": ["total", "currency"]
  }
}
```

`schema` is passed through as-is, so anything expressible in JSON Schema works.

## Naming

`name` is the key in `results`, so choose names your code can read out loud:

```json
{ "name": "should_renew" }
```

```json
{ "results": { "should_renew": { "value": "yes" } } }
```

The pattern is `[a-zA-Z0-9_][a-zA-Z0-9_.-]{0,63}`: letters, digits, underscore, dot and
hyphen, up to 64 characters, and it cannot start with a dot or a hyphen. Names must be unique
within a request; duplicates overwrite each other in `results`.

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
    { "type": "extract", "name": "invoice_total", "instruction": "Extract the invoice total", "keys": ["amount", "currency"] }
  ]
}
```

```json
{
  "results": {
    "is_churn_risk": { "value": "no" },
    "invoice_total": { "amount": 4200, "currency": "EUR" }
  }
}
```

This is the main reason the API exists: both tasks need the same context, so pay to read it
once.