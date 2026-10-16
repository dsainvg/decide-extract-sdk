# Reference
## Tasks
<details><summary><code>client.tasks.runTasks(request) -> RunTasksResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```java
client.tasks().runTasks(
    RunTasksRequest
        .builder()
        .model("model")
        .tasks(
            Arrays.asList(
                Task.decide(
                    DecideTask
                        .builder()
                        .name("name")
                        .question("question")
                        .build()
                )
            )
        )
        .build()
);
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

**request:** `RunTasksRequest` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.decideExtract(request) -> RunTasksResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```java
client.tasks().decideExtract(
    RunTasksRequest
        .builder()
        .model("model")
        .tasks(
            Arrays.asList(
                Task.decide(
                    DecideTask
                        .builder()
                        .name("name")
                        .question("question")
                        .build()
                )
            )
        )
        .build()
);
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

**request:** `RunTasksRequest` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.decide(request) -> DecideResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```java
client.tasks().decide(
    DecideRequest
        .builder()
        .model("model")
        .question("question")
        .build()
);
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

**context:** `Optional<String>` 
    
</dd>
</dl>

<dl>
<dd>

**messages:** `Optional<List<Message>>` 
    
</dd>
</dl>

<dl>
<dd>

**images:** `Optional<List<ImageInput>>` 
    
</dd>
</dl>

<dl>
<dd>

**audio:** `Optional<List<AudioInput>>` 
    
</dd>
</dl>

<dl>
<dd>

**question:** `String` 
    
</dd>
</dl>

<dl>
<dd>

**choices:** `Optional<List<String>>` — Options to decide between. Defaults to ['yes', 'no'] for boolean decisions; can specify more than 2 options.
    
</dd>
</dl>

<dl>
<dd>

**options:** `Optional<List<String>>` — Alias for choices. Defaults to ['yes', 'no'].
    
</dd>
</dl>

<dl>
<dd>

**instruction:** `Optional<String>` 
    
</dd>
</dl>

<dl>
<dd>

**temperature:** `Optional<Double>` 
    
</dd>
</dl>

<dl>
<dd>

**maxOutputTokens:** `Optional<Integer>` 
    
</dd>
</dl>

<dl>
<dd>

**responseFormat:** `Optional<DecideRequestResponseFormat>` 
    
</dd>
</dl>

<dl>
<dd>

**targetLanguage:** `Optional<DecideRequestTargetLanguage>` 
    
</dd>
</dl>

<dl>
<dd>

**outputLanguage:** `Optional<DecideRequestOutputLanguage>` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.extract(request) -> ExtractResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```java
client.tasks().extract(
    ExtractRequest
        .builder()
        .model("model")
        .question("question")
        .build()
);
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

**context:** `Optional<String>` 
    
</dd>
</dl>

<dl>
<dd>

**messages:** `Optional<List<Message>>` 
    
</dd>
</dl>

<dl>
<dd>

**images:** `Optional<List<ImageInput>>` 
    
</dd>
</dl>

<dl>
<dd>

**audio:** `Optional<List<AudioInput>>` 
    
</dd>
</dl>

<dl>
<dd>

**question:** `String` — Question or extraction prompt
    
</dd>
</dl>

<dl>
<dd>

**instruction:** `Optional<String>` — Backward-compatible alias for question
    
</dd>
</dl>

<dl>
<dd>

**schema:** `Optional<Map<String, Object>>` 
    
</dd>
</dl>

<dl>
<dd>

**temperature:** `Optional<Double>` 
    
</dd>
</dl>

<dl>
<dd>

**maxOutputTokens:** `Optional<Integer>` 
    
</dd>
</dl>

<dl>
<dd>

**responseFormat:** `Optional<ExtractRequestResponseFormat>` 
    
</dd>
</dl>

<dl>
<dd>

**targetLanguage:** `Optional<ExtractRequestTargetLanguage>` 
    
</dd>
</dl>

<dl>
<dd>

**outputLanguage:** `Optional<ExtractRequestOutputLanguage>` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

