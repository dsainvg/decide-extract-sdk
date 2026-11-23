# Reference
## Tasks
<details><summary><code>client.tasks.<a href="/src/api/resources/tasks/client.rs">run_tasks</a>(request: RunTasksRequest) -> Result&lt;RunTasksResponse, ApiError&gt;</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```rust
use dexa-ai-sdk::prelude::*;

#[tokio::main]
async fn main() {
    let config = ClientConfig {
        ..Default::default()
    };
    let client = ApiClient::new(config).expect("Failed to build client");
    client
        .tasks
        .run_tasks(
            &RunTasksRequest {
                model: "model".to_string(),
                tasks: vec![Task::Decide {
                    data: DecideTask {
                        name: "name".to_string(),
                        question: "question".to_string(),
                        ..Default::default()
                    },
                }],
                ..Default::default()
            },
            None,
        )
        .await;
}
```
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="/src/api/resources/tasks/client.rs">decide_extract</a>(request: RunTasksRequest) -> Result&lt;RunTasksResponse, ApiError&gt;</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```rust
use dexa-ai-sdk::prelude::*;

#[tokio::main]
async fn main() {
    let config = ClientConfig {
        ..Default::default()
    };
    let client = ApiClient::new(config).expect("Failed to build client");
    client
        .tasks
        .decide_extract(
            &RunTasksRequest {
                model: "model".to_string(),
                tasks: vec![Task::Decide {
                    data: DecideTask {
                        name: "name".to_string(),
                        question: "question".to_string(),
                        ..Default::default()
                    },
                }],
                ..Default::default()
            },
            None,
        )
        .await;
}
```
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="/src/api/resources/tasks/client.rs">decide</a>(request: DecideRequest) -> Result&lt;DecideResponse, ApiError&gt;</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```rust
use dexa-ai-sdk::prelude::*;

#[tokio::main]
async fn main() {
    let config = ClientConfig {
        ..Default::default()
    };
    let client = ApiClient::new(config).expect("Failed to build client");
    client
        .tasks
        .decide(
            &DecideRequest {
                model: "model".to_string(),
                question: "question".to_string(),
                context: None,
                messages: None,
                images: None,
                audio: None,
                choices: None,
                options: None,
                instruction: None,
                temperature: None,
                max_output_tokens: None,
                response_format: None,
                target_language: None,
                output_language: None,
            },
            None,
        )
        .await;
}
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

**context:** `Option<String>` 
    
</dd>
</dl>

<dl>
<dd>

**messages:** `Option<Vec<Message>>` 
    
</dd>
</dl>

<dl>
<dd>

**images:** `Option<Vec<ImageInput>>` 
    
</dd>
</dl>

<dl>
<dd>

**audio:** `Option<Vec<AudioInput>>` 
    
</dd>
</dl>

<dl>
<dd>

**question:** `String` 
    
</dd>
</dl>

<dl>
<dd>

**choices:** `Option<Vec<String>>` — Options to decide between. Defaults to ['yes', 'no'] for boolean decisions; can specify more than 2 options.
    
</dd>
</dl>

<dl>
<dd>

**options:** `Option<Vec<String>>` — Alias for choices. Defaults to ['yes', 'no'].
    
</dd>
</dl>

<dl>
<dd>

**instruction:** `Option<String>` 
    
</dd>
</dl>

<dl>
<dd>

**temperature:** `Option<f64>` 
    
</dd>
</dl>

<dl>
<dd>

**max_output_tokens:** `Option<i64>` 
    
</dd>
</dl>

<dl>
<dd>

**response_format:** `Option<DecideRequestResponseFormat>` 
    
</dd>
</dl>

<dl>
<dd>

**target_language:** `Option<DecideRequestTargetLanguage>` 
    
</dd>
</dl>

<dl>
<dd>

**output_language:** `Option<DecideRequestOutputLanguage>` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="/src/api/resources/tasks/client.rs">extract</a>(request: ExtractRequest) -> Result&lt;ExtractResponse, ApiError&gt;</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```rust
use dexa-ai-sdk::prelude::*;

#[tokio::main]
async fn main() {
    let config = ClientConfig {
        ..Default::default()
    };
    let client = ApiClient::new(config).expect("Failed to build client");
    client
        .tasks
        .extract(
            &ExtractRequest {
                model: "model".to_string(),
                question: "question".to_string(),
                context: None,
                messages: None,
                images: None,
                audio: None,
                instruction: None,
                schema: None,
                temperature: None,
                max_output_tokens: None,
                response_format: None,
                target_language: None,
                output_language: None,
            },
            None,
        )
        .await;
}
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

**context:** `Option<String>` 
    
</dd>
</dl>

<dl>
<dd>

**messages:** `Option<Vec<Message>>` 
    
</dd>
</dl>

<dl>
<dd>

**images:** `Option<Vec<ImageInput>>` 
    
</dd>
</dl>

<dl>
<dd>

**audio:** `Option<Vec<AudioInput>>` 
    
</dd>
</dl>

<dl>
<dd>

**question:** `String` — Question or extraction prompt
    
</dd>
</dl>

<dl>
<dd>

**instruction:** `Option<String>` — Backward-compatible alias for question
    
</dd>
</dl>

<dl>
<dd>

**schema:** `Option<std::collections::HashMap<String, serde_json::Value>>` 
    
</dd>
</dl>

<dl>
<dd>

**temperature:** `Option<f64>` 
    
</dd>
</dl>

<dl>
<dd>

**max_output_tokens:** `Option<i64>` 
    
</dd>
</dl>

<dl>
<dd>

**response_format:** `Option<ExtractRequestResponseFormat>` 
    
</dd>
</dl>

<dl>
<dd>

**target_language:** `Option<ExtractRequestTargetLanguage>` 
    
</dd>
</dl>

<dl>
<dd>

**output_language:** `Option<ExtractRequestOutputLanguage>` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

