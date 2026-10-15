---
title: POST /v1/decide-extract
description: The original batched endpoint, kept as an alias of /v1/tasks.
order: 3
---

```http
POST /v1/decide-extract
```

This endpoint takes exactly the same request and returns exactly the same response as
`POST /v1/tasks`. It is the original name, kept so that clients written against `0.1.0` and
`0.2.0` keep working without a flag day.

```json
{
  "model": "decider-extractor-v1",
  "context": "User says: renew subscription for 2 years.",
  "tasks": [
    { "type": "decide", "name": "should_renew", "question": "Should we offer a renewal discount?", "options": ["yes", "no"] }
  ]
}
```

## New code

Use `/v1/tasks`. The name says what the endpoint does, and it leaves room for task types that
are neither a decision nor an extraction.

```diff
-client.tasks.decideExtract(request);
+client.tasks.runTasks(request);
```

## Behaviour

Identical to `/v1/tasks`: same request schema, same response schema, same validation, same
errors, same token usage. The two paths are served by the same handler, so there is no
behavioural difference to reason about and no feature is available on one and not the other.

## Deprecation

Not deprecated. It is supported for the foreseeable future, and it is the path used by the
`decideExtract` method in every client. It will only be removed in a major version, and a
major version will keep it available behind an explicit opt-out first.