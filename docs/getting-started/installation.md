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
npm install @dsainvg/dexa-ai-sdk
```

```bash
pnpm add @dsainvg/dexa-ai-sdk
# or
yarn add @dsainvg/dexa-ai-sdk
```

Requires Node 18 or newer. Ships type declarations, no `any` in sight.

```ts
import { DexaAiSdkClient } from "@dsainvg/dexa-ai-sdk";

const client = new DexaAiSdkClient({
  baseUrl: "http://localhost:8080",
  token: process.env.DEXA_TOKEN,
});
```

## Python

```bash
pip install dexa-ai-sdk
```

```bash
uv add dexa-ai-sdk
```

Requires Python 3.9 or newer. An async client is available alongside the synchronous one.

```python
from dexa_ai_sdk import DexaAiSdk

client = DexaAiSdk(
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

client = DexaAiSdk.new(
  base_url: "http://localhost:8080",
  token: ENV.fetch("DEXA_TOKEN")
)
```

## Rust

```toml
# Cargo.toml
[dependencies]
dexa-ai-sdk = "0.3"
```

```rust
use dexa-ai-sdk::DexaAiSdk;

let client = DexaAiSdk::builder()
    .base_url("http://localhost:8080")
    .build()?;
```

## Java

Maven coordinates are `com.dsainvg:dexa-ai-sdk`. The SDK is not on Maven Central, so install
the jar from the release:

```bash
curl -L -o dexa-ai-sdk.jar \
  https://github.com/dsainvg/decide-extract-sdk/releases/download/v0.5.0/java-dexa-ai-sdk-0.5.0.jar
mvn install:install-file -Dfile=dexa-ai-sdk.jar -DgroupId=com.dsainvg -DartifactId=dexa-ai-sdk -Dversion=0.5.0
```

```xml
<dependency>
  <groupId>com.dsainvg</groupId>
  <artifactId>dexa-ai-sdk</artifactId>
  <version>0.5.0</version>
</dependency>
```

```java
var client = DexaAiSdkClient.builder()
    .baseUrl("http://localhost:8080")
    .token(System.getenv("DEXA_TOKEN"))
    .build();
```

## .NET

```bash
dotnet add package DexaAiSdk
```

```csharp
using DexaAiSdk;

var client = new DexaAiSdkClient(new DexaAiSdkClientOptions
{
    BaseUrl = "http://localhost:8080",
    Token = Environment.GetEnvironmentVariable("DEXA_TOKEN"),
});
```

## C++

There is no generated C++ client. The API is plain JSON over HTTP, so any HTTP library
works. See [clients](/operations/clients/) for a complete example using `curl` and `nlohmann/json`.

## Working against the sources instead

To use a client before it is published, generate it locally:

```bash
git clone https://github.com/dsainvg/decide-extract-sdk.git
cd dexa-ai-sdk
npm install
npm run fern:generate     # requires Docker
```

Then reference the package from `packages/sdk-ts` or `packages/sdk-py` directly.
[Repository layout](/operations/repository/) explains the rest.