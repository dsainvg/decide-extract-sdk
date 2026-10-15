# Reference
## Tasks
<details><summary><code>client.tasks.<a href="/lib/dexa-ai-sdk/tasks/client.rb">run_tasks</a>(request) -> DexaAiSdk::Types::RunTasksResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```ruby
client.tasks.run_tasks(
  model: "model",
  tasks: []
)
```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `DexaAiSdk::Types::RunTasksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**request_options:** `DexaAiSdk::Tasks::RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="/lib/dexa-ai-sdk/tasks/client.rb">decide_extract</a>(request) -> DexaAiSdk::Types::RunTasksResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```ruby
client.tasks.decide_extract(
  model: "model",
  tasks: []
)
```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**request:** `DexaAiSdk::Types::RunTasksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**request_options:** `DexaAiSdk::Tasks::RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="/lib/dexa-ai-sdk/tasks/client.rb">decide</a>(request) -> DexaAiSdk::Types::DecideResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```ruby
client.tasks.decide(
  model: "model",
  question: "question"
)
```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**model:** `String` 
    
</dd>
</dl>

<dl>
<dd>

**context:** `String` 
    
</dd>
</dl>

<dl>
<dd>

**messages:** `Internal::Types::Array[DexaAiSdk::Types::Message]` 
    
</dd>
</dl>

<dl>
<dd>

**images:** `Internal::Types::Array[DexaAiSdk::Types::ImageInput]` 
    
</dd>
</dl>

<dl>
<dd>

**audio:** `Internal::Types::Array[DexaAiSdk::Types::AudioInput]` 
    
</dd>
</dl>

<dl>
<dd>

**question:** `String` 
    
</dd>
</dl>

<dl>
<dd>

**choices:** `Internal::Types::Array[String]` 
    
</dd>
</dl>

<dl>
<dd>

**options:** `Internal::Types::Array[String]` 
    
</dd>
</dl>

<dl>
<dd>

**instruction:** `String` 
    
</dd>
</dl>

<dl>
<dd>

**temperature:** `Float` 
    
</dd>
</dl>

<dl>
<dd>

**max_output_tokens:** `Integer` 
    
</dd>
</dl>

<dl>
<dd>

**response_format:** `DexaAiSdk::Tasks::Types::DecideRequestResponseFormat` 
    
</dd>
</dl>

<dl>
<dd>

**target_language:** `DexaAiSdk::Tasks::Types::DecideRequestTargetLanguage` 
    
</dd>
</dl>

<dl>
<dd>

**output_language:** `DexaAiSdk::Tasks::Types::DecideRequestOutputLanguage` 
    
</dd>
</dl>

<dl>
<dd>

**request_options:** `DexaAiSdk::Tasks::RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="/lib/dexa-ai-sdk/tasks/client.rb">extract</a>(request) -> DexaAiSdk::Types::ExtractResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```ruby
client.tasks.extract(
  model: "model",
  instruction: "instruction"
)
```
</dd>
</dl>
</dd>
</dl>

#### ⚙️ Parameters

<dl>
<dd>

<dl>
<dd>

**model:** `String` 
    
</dd>
</dl>

<dl>
<dd>

**context:** `String` 
    
</dd>
</dl>

<dl>
<dd>

**messages:** `Internal::Types::Array[DexaAiSdk::Types::Message]` 
    
</dd>
</dl>

<dl>
<dd>

**images:** `Internal::Types::Array[DexaAiSdk::Types::ImageInput]` 
    
</dd>
</dl>

<dl>
<dd>

**audio:** `Internal::Types::Array[DexaAiSdk::Types::AudioInput]` 
    
</dd>
</dl>

<dl>
<dd>

**instruction:** `String` 
    
</dd>
</dl>

<dl>
<dd>

**fields:** `Internal::Types::Array[String]` 
    
</dd>
</dl>

<dl>
<dd>

**keys:** `Internal::Types::Array[String]` 
    
</dd>
</dl>

<dl>
<dd>

**schema:** `Internal::Types::Hash[String, Object]` 
    
</dd>
</dl>

<dl>
<dd>

**temperature:** `Float` 
    
</dd>
</dl>

<dl>
<dd>

**max_output_tokens:** `Integer` 
    
</dd>
</dl>

<dl>
<dd>

**response_format:** `DexaAiSdk::Tasks::Types::ExtractRequestResponseFormat` 
    
</dd>
</dl>

<dl>
<dd>

**target_language:** `DexaAiSdk::Tasks::Types::ExtractRequestTargetLanguage` 
    
</dd>
</dl>

<dl>
<dd>

**output_language:** `DexaAiSdk::Tasks::Types::ExtractRequestOutputLanguage` 
    
</dd>
</dl>

<dl>
<dd>

**request_options:** `DexaAiSdk::Tasks::RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

