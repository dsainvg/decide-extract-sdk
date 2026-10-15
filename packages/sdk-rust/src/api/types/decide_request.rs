pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq)]
pub struct DecideRequest {
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
    pub question: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub choices: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub options: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub instruction: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    #[serde(default)]
    #[serde(with = "crate::core::number_serializers::option")]
    pub temperature: Option<f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub max_output_tokens: Option<i64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub response_format: Option<DecideRequestResponseFormat>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub target_language: Option<DecideRequestTargetLanguage>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub output_language: Option<DecideRequestOutputLanguage>,
}

impl DecideRequest {
    pub fn builder() -> DecideRequestBuilder {
        <DecideRequestBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct DecideRequestBuilder {
    model: Option<String>,
    context: Option<String>,
    messages: Option<Vec<Message>>,
    images: Option<Vec<ImageInput>>,
    audio: Option<Vec<AudioInput>>,
    question: Option<String>,
    choices: Option<Vec<String>>,
    options: Option<Vec<String>>,
    instruction: Option<String>,
    temperature: Option<f64>,
    max_output_tokens: Option<i64>,
    response_format: Option<DecideRequestResponseFormat>,
    target_language: Option<DecideRequestTargetLanguage>,
    output_language: Option<DecideRequestOutputLanguage>,
}

impl DecideRequestBuilder {
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

    pub fn choices(mut self, value: Vec<String>) -> Self {
        self.choices = Some(value);
        self
    }

    pub fn options(mut self, value: Vec<String>) -> Self {
        self.options = Some(value);
        self
    }

    pub fn instruction(mut self, value: impl Into<String>) -> Self {
        self.instruction = Some(value.into());
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

    pub fn response_format(mut self, value: DecideRequestResponseFormat) -> Self {
        self.response_format = Some(value);
        self
    }

    pub fn target_language(mut self, value: DecideRequestTargetLanguage) -> Self {
        self.target_language = Some(value);
        self
    }

    pub fn output_language(mut self, value: DecideRequestOutputLanguage) -> Self {
        self.output_language = Some(value);
        self
    }

    /// Consumes the builder and constructs a [`DecideRequest`].
    /// This method will fail if any of the following fields are not set:
    /// - [`model`](DecideRequestBuilder::model)
    /// - [`question`](DecideRequestBuilder::question)
    pub fn build(self) -> Result<DecideRequest, BuildError> {
        Ok(DecideRequest {
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
            choices: self.choices,
            options: self.options,
            instruction: self.instruction,
            temperature: self.temperature,
            max_output_tokens: self.max_output_tokens,
            response_format: self.response_format,
            target_language: self.target_language,
            output_language: self.output_language,
        })
    }
}
