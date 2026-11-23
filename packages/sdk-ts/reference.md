# Reference
## Tasks
<details><summary><code>client.tasks.<a href="/src/api/resources/tasks/client/Client.ts">runTasks</a>({ ...params }) -> DexaAiSdk.RunTasksResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tasks.runTasks({
    model: "model",
    tasks: [{
            type: "decide",
            name: "name",
            question: "question"
        }]
});

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

**request:** `DexaAiSdk.RunTasksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TasksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="/src/api/resources/tasks/client/Client.ts">decideExtract</a>({ ...params }) -> DexaAiSdk.RunTasksResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tasks.decideExtract({
    model: "model",
    tasks: [{
            type: "decide",
            name: "name",
            question: "question"
        }]
});

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

**request:** `DexaAiSdk.RunTasksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TasksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="/src/api/resources/tasks/client/Client.ts">decide</a>({ ...params }) -> DexaAiSdk.DecideResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tasks.decide({
    model: "model",
    question: "question"
});

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

**request:** `DexaAiSdk.DecideRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TasksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="/src/api/resources/tasks/client/Client.ts">extract</a>({ ...params }) -> DexaAiSdk.ExtractResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```typescript
await client.tasks.extract({
    model: "model",
    question: "question"
});

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

**request:** `DexaAiSdk.ExtractRequest` 
    
</dd>
</dl>

<dl>
<dd>

**requestOptions:** `TasksClient.RequestOptions` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

