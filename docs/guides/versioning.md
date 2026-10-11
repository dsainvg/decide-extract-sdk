---
title: Versioning and migration
description: How versions are numbered, what changed between them, and how to upgrade.
order: 6
---

## One version, everything

The version lives in exactly one place, `info.version` in the OpenAPI contract. It is stamped
into every generated client and into both registries, so `0.3.0` on npm, on PyPI, in the Git
tag and in the response envelope are always the same number.

| Version | Released | What changed |
| --- | --- | --- |
| `0.3.0` | current | `/v1/tasks`, multimodal input, language selection, `DecideResult` |
| `0.2.0` | yes | Single `/v1/decide-extract` endpoint |
| `0.1.0` | yes | First contract, `POST /v1/decide-extract` |

## What changed in 0.3.0

**Renamed, with aliases.** `Task.id` became `Task.name`, and `results` was added as the
canonical response field next to `tasks`. Both old names still work.

| Before | Now | Status |
| --- | --- | --- |
| `tasks[].id` | `tasks[].name` | `id` still accepted |
| `response.tasks` | `response.results` | `tasks` still returned |
| `DecideTask.options` | `DecideTask.options` | `choices` added as an alias |
| `ExtractTask.keys` | `ExtractTask.keys` | `fields` added as an alias |
| `POST /v1/decide-extract` | `POST /v1/tasks` | old path still serves |

**Added**

- `POST /v1/tasks`, `POST /decide`, `POST /extract`
- `images`, `audio`, and content parts on `messages`
- `target_language` / `output_language`
- `DecideResult` with an optional `reason`
- `result`, `decision` and `value` on the decide response

**Removed:** nothing. No field or endpoint in `0.2.0` was taken away.

## Migrating from 0.2.0

1. Upgrade the client package.
2. Rename `id` to `name` in your task builders, if you can. `id` still works, so this is
   optional today and worth doing before it is removed.
3. Prefer `results` over `tasks` when reading responses.
4. Move the endpoint to `/v1/tasks` when convenient.

```diff
-const response = await client.tasks.decideExtract({
+const response = await client.tasks.runTasks({
   model,
   context,
   tasks: [
-    { type: "decide", id: "should_renew", question, options: ["yes", "no"] },
+    { type: "decide", name: "should_renew", question, options: ["yes", "no"] },
   ],
 });

-response.tasks?.should_renew;
+response.results?.should_renew;
```

## Pinning

Pin exactly in production. Clients are generated, and a patch release can rename a symbol
when the contract gains a field.

```bash
npm install @dsainvg/decide-extractor-sdk@0.3.0
pip install dsainvg-decide-extractor-sdk==0.3.0
```

Take a minor version to get new fields and endpoints, a patch for fixes only, and expect a
major version to change something you depend on.

## Breaking changes

A breaking change is anything that can make a correct program wrong: removing a field,
renaming one, changing a type, changing a default, tightening validation. Those land in a
major version, ship with a note in `CHANGELOG.md`, and keep the old behaviour for at least
one minor release.

Non-breaking additions, new optional fields, new enum values and new endpoints ship in a minor
version. When new enum values appear, ignore values you do not recognise rather than failing.