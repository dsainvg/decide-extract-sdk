---
title: Installation
description: Add the TypeScript, Python, Ruby, Rust, Java or .NET client to your project.
order: 1
---

Every client is generated from the same OpenAPI contract, so they all expose the same
operations with the same field names. Pick the one that matches your stack.

> [!NOTE]
> TypeScript and Python install from npm and PyPI. Ruby, Rust, Java and .NET are published as
> downloadable files on the GitHub Release, so you fetch them by URL. The installation commands
> below assume the package names Fern generates; check the real ones in `packages/sdk-<language>/`
> after your first generation, or in
> [the publishing notes](https://github.com/dsainvg/decide-extract-sdk/blob/main/PUBLISHING.md).

## TypeScript

```bash
npm install @dsainvg/decide-extractor-sdk
```

```bash
pnpm add @dsainvg/decide-extractor-sdk
# or
yarn add @dsainvg/decide-extractor-sdk
```

Requires Node 18 or newer. Ships type declarations, no `any` in sight.

```ts
import { DeciderExtractorClient } from "@dsainvg/decide-extractor-sdk";

const client = new DeciderExtractorClient({
  baseUrl: "http://localhost:8080",
  token: process.env.DECIDE_EXTRACTOR_TOKEN,
});
```

## Python

```bash
pip install dsainvg-decide-extractor-sdk
```

```bash
uv add dsainvg-decide-extractor-sdk
```

Requires Python 3.9 or newer. An async client is available alongside the synchronous one.

```python
from dsainvg_decide_extractor_sdk import DeciderExtractorClient

client = DeciderExtractorClient(
    base_url="http://localhost:8080",
    token="...",
)
```

## Ruby

```bash
gem install decide_extractor
```

```ruby
require "decide_extractor"

client = DecideExtractor::Client.new(
  base_url: "http://localhost:8080",
  token: ENV.fetch("DECIDE_EXTRACTOR_TOKEN")
)
```

## Rust

```toml
# Cargo.toml
[dependencies]
decide-extractor = "0.3"
```

```rust
use decide_extractor::DecideExtractorClient;

let client = DeciderExtractorClient::builder()
    .base_url("http://localhost:8080")
    .build()?;
```

## Java

```xml
<dependency>
  <groupId>org.example</groupId>
  <artifactId>decide-extractor</artifactId>
  <version>0.3.0</version>
</dependency>
```

```java
var client = DeciderExtractorClient.builder()
    .baseUrl("http://localhost:8080")
    .token(System.getenv("DECIDE_EXTRACTOR_TOKEN"))
    .build();
```

## .NET

```bash
dotnet add package DecideExtractor
```

```csharp
using DecideExtractor;

var client = new DeciderExtractorClient(new DeciderExtractorClientOptions
{
    BaseUrl = "http://localhost:8080",
    Token = Environment.GetEnvironmentVariable("DECIDE_EXTRACTOR_TOKEN"),
});
```

## C++

There is no generated C++ client. The API is plain JSON over HTTP, so any HTTP library
works. See [clients](/operations/clients/) for a complete example using `curl` and `nlohmann/json`.

## Working against the sources instead

To use a client before it is published, generate it locally:

```bash
git clone https://github.com/dsainvg/decide-extract-sdk.git
cd decide-extractor-sdk
npm install
npm run fern:generate     # requires Docker
```

Then reference the package from `packages/sdk-ts` or `packages/sdk-py` directly.
[Repository layout](/operations/repository/) explains the rest.