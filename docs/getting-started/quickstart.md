---
title: Quickstart
description: Send your first request with the HTTP API and with each client library.
order: 2
---

This walks through one request end to end: decide whether to renew, and extract the renewal
term, in a single call.

## With curl

The API is plain HTTP and JSON, so anything that can POST works.

```bash
curl -X POST http://localhost:8080/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DECIDE_EXTRACTOR_TOKEN" \
  -d '{
    "model": "decider-extractor-v1",
    "context": "User says: renew subscription for 2 years. Previous plan expired 3 months ago.",
    "tasks": [
      { "type": "decide", "name": "should_renew", "question": "Should we offer a renewal discount?", "options": ["yes", "no"] },
      { "type": "extract", "name": "renew_term", "instruction": "Extract the renewal term in months", "keys": ["months"] }
    ]
  }'
```

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

Read the answers from `results`, keyed by each task's `name`. `choices[0].message.content`
carries the same data as a JSON string, for OpenAI-shaped clients.

## TypeScript

```ts
import { DeciderExtractorClient } from "@dsainvg/decide-extractor-sdk";

const client = new DeciderExtractorClient({
  baseUrl: "http://localhost:8080",
  token: process.env.DECIDE_EXTRACTOR_TOKEN,
});

const response = await client.tasks.decideExtract({
  model: "decider-extractor-v1",
  context: "User says: renew subscription for 2 years. Previous plan expired 3 months ago.",
  tasks: [
    {
      type: "decide",
      name: "should_renew",
      question: "Should we offer a renewal discount?",
      options: ["yes", "no"],
    },
    {
      type: "extract",
      name: "renew_term",
      instruction: "Extract the renewal term in months",
      keys: ["months"],
    },
  ],
});

console.log(response.results?.should_renew);
```

## Python

```python
import os
from dsainvg_decide_extractor_sdk import DeciderExtractorClient

client = DeciderExtractorClient(
    base_url="http://localhost:8080",
    token=os.environ["DECIDE_EXTRACTOR_TOKEN"],
)

response = client.tasks.decide_extract(
    model="decider-extractor-v1",
    context="User says: renew subscription for 2 years. Previous plan expired 3 months ago.",
    tasks=[
        {
            "type": "decide",
            "name": "should_renew",
            "question": "Should we offer a renewal discount?",
            "options": ["yes", "no"],
        },
        {
            "type": "extract",
            "name": "renew_term",
            "instruction": "Extract the renewal term in months",
            "keys": ["months"],
        },
    ],
)

print(response.results)
```

## Ruby

```ruby
response = client.tasks.decide_extract(
  model: "decider-extractor-v1",
  context: "User says: renew subscription for 2 years. Previous plan expired 3 months ago.",
  tasks: [
    {
      type: "decide",
      name: "should_renew",
      question: "Should we offer a renewal discount?",
      options: ["yes", "no"]
    },
    {
      type: "extract",
      name: "renew_term",
      instruction: "Extract the renewal term in months",
      keys: ["months"]
    }
  ]
)

puts response.results
```

## Rust

```rust
let response = client
    .tasks()
    .decide_extract(decide_extract_request)
    .await?;

if let Some(results) = response.results {
    println!("{:?}", results);
}
```

## Java

```java
var response = client.tasks().decideExtract(request);

if (response.results() != null) {
    System.out.println(response.results());
}
```

## .NET

```csharp
var response = await client.Tasks.DecideExtractAsync(request);

if (response.Results != null)
{
    Console.WriteLine(response.Results);
}
```

> [!NOTE]
> Client symbol names follow the generator's conventions for this contract: `tasks` groups the
> operations declared under the `Tasks` tag, and operation ids become method names. After your
> first `fern generate`, confirm the exact names against `packages/sdk-*`.

## Next

- [Authentication](/getting-started/authentication/)
- [Task types](/guides/task-types/)
- [The `/decide` and `/extract` shortcuts](/guides/single-tasks/)