---
title: Authentication
description: How tokens are sent, where they come from, and what happens when one is missing.
order: 3
---

## Bearer tokens

Every request authenticates with an API key in the standard OpenAI-style header:

```http
POST /v1/tasks HTTP/1.1
Host: api.example.com
Authorization: Bearer sk-xxxxxxxxxxxxxxxx
Content-Type: application/json
```

## In the clients

Each generated client takes the token once, at construction, instead of on every call.

```ts
const client = new DexaAiSdkClient({ baseUrl, token });
```

```python
client = DexaAiSdk(base_url=base_url, token=token)
```

```ruby
client = DexaAiSdk.new(base_url: base_url, token: token)
```

```rust
let client = DexaAiSdk::builder().token(token).build()?;
```

```java
var client = DexaAiSdkClient.builder().token(token).build();
```

```csharp
var client = new DexaAiSdkClient(new DexaAiSdkClientOptions { Token = token });
```

Keep the token in an environment variable or your platform's secret store. Never commit it,
and never put it in a URL, since URLs end up in logs.

```bash
export DEXA_TOKEN="sk-..."
```

## Failures

A missing or invalid key is rejected before any model runs, so a bad key costs nothing.

| Status | Meaning | What to do |
| --- | --- | --- |
| `401` | No key, or the key is not recognised | Check `Authorization` is present and well-formed |
| `403` | Key is valid but not allowed to use this model | Use a model the key has access to |

```json
{
  "error": {
    "type": "authentication_error",
    "message": "Invalid API key provided",
    "code": "invalid_api_key"
  }
}
```

The body always has the same shape, whatever went wrong.
See [errors](/guides/errors/).