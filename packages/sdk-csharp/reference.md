# Reference
## Tasks
<details><summary><code>client.Tasks.<a href="/src/DexaAiSdk/Tasks/TasksClient.cs">RunTasksAsync</a>(RunTasksRequest { ... }) -> WithRawResponseTask&lt;RunTasksResponse&gt;</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```csharp
await client.Tasks.RunTasksAsync(
    new RunTasksRequest
    {
        Model = "model",
        Tasks = new List<DexaAiSdk.Task>()
        {
            new DexaAiSdk.Task(
                new DexaAiSdk.Task.Decide(new DecideTask { Name = "name", Question = "question" })
            ),
        },
    }
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

<details><summary><code>client.Tasks.<a href="/src/DexaAiSdk/Tasks/TasksClient.cs">DecideExtractAsync</a>(RunTasksRequest { ... }) -> WithRawResponseTask&lt;RunTasksResponse&gt;</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```csharp
await client.Tasks.DecideExtractAsync(
    new RunTasksRequest
    {
        Model = "model",
        Tasks = new List<DexaAiSdk.Task>()
        {
            new DexaAiSdk.Task(
                new DexaAiSdk.Task.Decide(new DecideTask { Name = "name", Question = "question" })
            ),
        },
    }
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

<details><summary><code>client.Tasks.<a href="/src/DexaAiSdk/Tasks/TasksClient.cs">DecideAsync</a>(DecideRequest { ... }) -> WithRawResponseTask&lt;DecideResponse&gt;</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```csharp
await client.Tasks.DecideAsync(new DecideRequest { Model = "model", Question = "question" });
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

**request:** `DecideRequest` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.Tasks.<a href="/src/DexaAiSdk/Tasks/TasksClient.cs">ExtractAsync</a>(ExtractRequest { ... }) -> WithRawResponseTask&lt;ExtractResponse&gt;</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```csharp
await client.Tasks.ExtractAsync(new ExtractRequest { Model = "model", Question = "question" });
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

**request:** `ExtractRequest` 
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

