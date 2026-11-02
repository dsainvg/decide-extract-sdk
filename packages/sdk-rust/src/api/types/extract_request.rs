pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq)]
pub struct ExtractRequest {
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
    /// Question or extraction prompt
    #[serde(default)]
    pub question: String,
    /// Backward-compatible alias for question
    #[serde(skip_serializing_if = "Option::is_none")]
    pub instruction: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub schema: Option<HashMap<String, serde_json::Value>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    #[serde(default)]
    #[serde(with = "crate::core::number_serializers::option")]
    pub temperature: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub max_output_tokens: Option<i64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub response_format: Option<ExtractRequestResponseFormat>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub target_language: Option<ExtractRequestTargetLanguage>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub output_language: Option<ExtractRequestOutputLanguage>,
}

impl ExtractRequest {
    pub fn builder() -> ExtractRequestBuilder {
        <ExtractRequestBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct ExtractRequestBuilder {
    model: Option<String>,
    context: Option<String>,
    messages: Option<Vec<Message>>,
    images: Option<Vec<ImageInput>>,
    audio: Option<Vec<AudioInput>>,
    question: Option<String>,
    instruction: Option<String>,
    schema: Option<HashMap<String, serde_json::Value>>,
    temperature: Option<f64>,
    max_output_tokens: Option<i64>,
    response_format: Option<ExtractRequestResponseFormat>,
    target_language: Option<ExtractRequestTargetLanguage>,
    output_language: Option<ExtractRequestOutputLanguage>,
}

impl ExtractRequestBuilder {
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

    pub fn question(mut self, value: impl Into<String>) -> Self {
        self.question = Some(value.into());
        self
    }

    pub fn instruction(mut self, value: impl Into<String>) -> Self {
        self.instruction = Some(value.into());
        self
    }

    pub fn schema(mut self, value: HashMap<String, serde_json::Value>) -> Self {
        self.schema = Some(value);
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

    pub fn response_format(mut self, value: ExtractRequestResponseFormat) -> Self {
        self.response_format = Some(value);
        self
    }

    pub fn target_language(mut self, value: ExtractRequestTargetLanguage) -> Self {
        self.target_language = Some(value);
        self
    }

    pub fn output_language(mut self, value: ExtractRequestOutputLanguage) -> Self {
        self.output_language = Some(value);
        self
    }

    /// Consumes the builder and constructs a [`ExtractRequest`].
    /// This method will fail if any of the following fields are not set:
    /// - [`model`](ExtractRequestBuilder::model)
    /// - [`question`](ExtractRequestBuilder::question)
    pub fn build(self) -> Result<ExtractRequest, BuildError> {
        Ok(ExtractRequest {
            model: self
                .model
                .ok_or_else(|| BuildError::missing_field("model"))?,
            context: self.context,
            messages: self.messages,
            images: self.images,
            audio: self.audio,
            question: self
                .question
                .ok_or_else(|| BuildError::missing_field("question"))?,
            instruction: self.instruction,
            schema: self.schema,
            temperature: self.temperature,
            max_output_tokens: self.max_output_tokens,
            response_format: self.response_format,
            target_language: self.target_language,
            output_language: self.output_language,
        })
    }
}
