# Reference
## Tasks
<details><summary><code>client.tasks.<a href="src/dexa_ai_sdk/tasks/client.py">run_tasks</a>(...) -> RunTasksResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```python
from dexa_ai_sdk import DexaAiSdk, Task_Decide
from dexa_ai_sdk.environment import DexaAiSdkEnvironment

client = DexaAiSdk(
    environment=DexaAiSdkEnvironment.DEFAULT,
)

client.tasks.run_tasks(
    model="model",
    tasks=[
        Task_Decide(
            name="name",
            question="question",
        )
    ],
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

**request:** `RunTasksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**request_options:** `typing.Optional[RequestOptions]` — Request-specific configuration.
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="src/dexa_ai_sdk/tasks/client.py">decide_extract</a>(...) -> RunTasksResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```python
from dexa_ai_sdk import DexaAiSdk, Task_Decide
from dexa_ai_sdk.environment import DexaAiSdkEnvironment

client = DexaAiSdk(
    environment=DexaAiSdkEnvironment.DEFAULT,
)

client.tasks.decide_extract(
    model="model",
    tasks=[
        Task_Decide(
            name="name",
            question="question",
        )
    ],
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

**request:** `RunTasksRequest` 
    
</dd>
</dl>

<dl>
<dd>

**request_options:** `typing.Optional[RequestOptions]` — Request-specific configuration.
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="src/dexa_ai_sdk/tasks/client.py">decide</a>(...) -> DecideResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```python
from dexa_ai_sdk import DexaAiSdk
from dexa_ai_sdk.environment import DexaAiSdkEnvironment

client = DexaAiSdk(
    environment=DexaAiSdkEnvironment.DEFAULT,
)

client.tasks.decide(
    model="model",
    question="question",
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

**model:** `str` 
    
</dd>
</dl>

<dl>
<dd>

**question:** `str` 
    
</dd>
</dl>

<dl>
<dd>

**context:** `typing.Optional[str]` 
    
</dd>
</dl>

<dl>
<dd>

**messages:** `typing.Optional[typing.List[Message]]` 
    
</dd>
</dl>

<dl>
<dd>

**images:** `typing.Optional[typing.List[ImageInput]]` 
    
</dd>
</dl>

<dl>
<dd>

**audio:** `typing.Optional[typing.List[AudioInput]]` 
    
</dd>
</dl>

<dl>
<dd>

**choices:** `typing.Optional[typing.List[str]]` — Options to decide between. Defaults to ['yes', 'no'] for boolean decisions; can specify more than 2 options.
    
</dd>
</dl>

<dl>
<dd>

**options:** `typing.Optional[typing.List[str]]` — Alias for choices. Defaults to ['yes', 'no'].
    
</dd>
</dl>

<dl>
<dd>

**instruction:** `typing.Optional[str]` 
    
</dd>
</dl>

<dl>
<dd>

**temperature:** `typing.Optional[float]` 
    
</dd>
</dl>

<dl>
<dd>

**max_output_tokens:** `typing.Optional[int]` 
    
</dd>
</dl>

<dl>
<dd>

**response_format:** `typing.Optional[DecideRequestResponseFormat]` 
    
</dd>
</dl>

<dl>
<dd>

**target_language:** `typing.Optional[DecideRequestTargetLanguage]` 
    
</dd>
</dl>

<dl>
<dd>

**output_language:** `typing.Optional[DecideRequestOutputLanguage]` 
    
</dd>
</dl>

<dl>
<dd>

**request_options:** `typing.Optional[RequestOptions]` — Request-specific configuration.
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

<details><summary><code>client.tasks.<a href="src/dexa_ai_sdk/tasks/client.py">extract</a>(...) -> ExtractResponse</code></summary>
<dl>
<dd>

#### 🔌 Usage

<dl>
<dd>

<dl>
<dd>

```python
from dexa_ai_sdk import DexaAiSdk
from dexa_ai_sdk.environment import DexaAiSdkEnvironment

client = DexaAiSdk(
    environment=DexaAiSdkEnvironment.DEFAULT,
)

client.tasks.extract(
    model="model",
    question="question",
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

**model:** `str` 
    
</dd>
</dl>

<dl>
<dd>

**question:** `str` — Question or extraction prompt
    
</dd>
</dl>

<dl>
<dd>

**context:** `typing.Optional[str]` 
    
</dd>
</dl>

<dl>
<dd>

**messages:** `typing.Optional[typing.List[Message]]` 
    
</dd>
</dl>

<dl>
<dd>

**images:** `typing.Optional[typing.List[ImageInput]]` 
    
</dd>
</dl>

<dl>
<dd>

**audio:** `typing.Optional[typing.List[AudioInput]]` 
    
</dd>
</dl>

<dl>
<dd>

**instruction:** `typing.Optional[str]` — Backward-compatible alias for question
    
</dd>
</dl>

<dl>
<dd>

**schema:** `typing.Optional[typing.Dict[str, typing.Any]]` 
    
</dd>
</dl>

<dl>
<dd>

**temperature:** `typing.Optional[float]` 
    
</dd>
</dl>

<dl>
<dd>

**max_output_tokens:** `typing.Optional[int]` 
    
</dd>
</dl>

<dl>
<dd>

**response_format:** `typing.Optional[ExtractRequestResponseFormat]` 
    
</dd>
</dl>

<dl>
<dd>

**target_language:** `typing.Optional[ExtractRequestTargetLanguage]` 
    
</dd>
</dl>

<dl>
<dd>

**output_language:** `typing.Optional[ExtractRequestOutputLanguage]` 
    
</dd>
</dl>

<dl>
<dd>

**request_options:** `typing.Optional[RequestOptions]` — Request-specific configuration.
    
</dd>
</dl>
</dd>
</dl>


</dd>
</dl>
</details>

