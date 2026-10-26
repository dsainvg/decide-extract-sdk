pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq)]
pub struct RunTasksRequest {
    #[serde(default)]
    pub model: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub context: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub messages: Option<Vec<Message>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub images: Option<Vec<ImageInput>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub audio: Option<Vec<AudioInput>>,
    #[serde(default)]
    pub tasks: Vec<Task>,
    #[serde(skip_serializing_if = "Option::is_none")]
    #[serde(default)]
    #[serde(with = "crate::core::number_serializers::option")]
    pub temperature: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub max_output_tokens: Option<i64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub response_format: Option<RunTasksRequestResponseFormat>,
    /// Preferred output language for results
    #[serde(skip_serializing_if = "Option::is_none")]
    pub target_language: Option<RunTasksRequestTargetLanguage>,
    /// Alias for target_language
    #[serde(skip_serializing_if = "Option::is_none")]
    pub output_language: Option<RunTasksRequestOutputLanguage>,
}

impl RunTasksRequest {
    pub fn builder() -> RunTasksRequestBuilder {
        <RunTasksRequestBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct RunTasksRequestBuilder {
    model: Option<String>,
    context: Option<String>,
    messages: Option<Vec<Message>>,
    images: Option<Vec<ImageInput>>,
    audio: Option<Vec<AudioInput>>,
    tasks: Option<Vec<Task>>,
    temperature: Option<f64>,
    max_output_tokens: Option<i64>,
    response_format: Option<RunTasksRequestResponseFormat>,
    target_language: Option<RunTasksRequestTargetLanguage>,
    output_language: Option<RunTasksRequestOutputLanguage>,
}

impl RunTasksRequestBuilder {
    pub fn model(mut self, value: impl Into<String>) -> Self {
        self.model = Some(value.into());
        self
    }

    pub fn context(mut self, value: impl Into<String>) -> Self {
        self.context = Some(value.into());
        self
    }

    pub fn messages(mut self, value: Vec<Message>) -> Self {
        self.messages = Some(value);
        self
    }

    pub fn images(mut self, value: Vec<ImageInput>) -> Self {
        self.images = Some(value);
        self
    }

    pub fn audio(mut self, value: Vec<AudioInput>) -> Self {
        self.audio = Some(value);
        self
    }

    pub fn tasks(mut self, value: Vec<Task>) -> Self {
        self.tasks = Some(value);
        self
    }

    pub fn temperature(mut self, value: f64) -> Self {
        self.temperature = Some(value);
        self
    }

    pub fn max_output_tokens(mut self, value: i64) -> Self {
        self.max_output_tokens = Some(value);
        self
    }

    pub fn response_format(mut self, value: RunTasksRequestResponseFormat) -> Self {
        self.response_format = Some(value);
        self
    }

    pub fn target_language(mut self, value: RunTasksRequestTargetLanguage) -> Self {
        self.target_language = Some(value);
        self
    }

    pub fn output_language(mut self, value: RunTasksRequestOutputLanguage) -> Self {
        self.output_language = Some(value);
        self
    }

    /// Consumes the builder and constructs a [`RunTasksRequest`].
    /// This method will fail if any of the following fields are not set:
    /// - [`model`](RunTasksRequestBuilder::model)
    /// - [`tasks`](RunTasksRequestBuilder::tasks)
    pub fn build(self) -> Result<RunTasksRequest, BuildError> {
        Ok(RunTasksRequest {
            model: self
                .model
                .ok_or_else(|| BuildError::missing_field("model"))?,
            context: self.context,
            messages: self.messages,
            images: self.images,
            audio: self.audio,
            tasks: self
                .tasks
                .ok_or_else(|| BuildError::missing_field("tasks"))?,
            temperature: self.temperature,
            max_output_tokens: self.max_output_tokens,
            response_format: self.response_format,
            target_language: self.target_language,
            output_language: self.output_language,
        })
    }
}
