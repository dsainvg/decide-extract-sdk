pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq)]
pub struct DecideResponse {
    #[serde(default)]
    pub id: String,
    #[serde(default)]
    pub model: String,
    #[serde(default)]
    pub choices: Vec<Choice>,
    #[serde(default)]
    pub result: DecideResult,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub decision: Option<DecideResult>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub value: Option<String>,
    #[serde(default)]
    pub usage: Usage,
}

impl DecideResponse {
    pub fn builder() -> DecideResponseBuilder {
        <DecideResponseBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct DecideResponseBuilder {
    id: Option<String>,
    model: Option<String>,
    choices: Option<Vec<Choice>>,
    result: Option<DecideResult>,
    decision: Option<DecideResult>,
    value: Option<String>,
    usage: Option<Usage>,
}

impl DecideResponseBuilder {
    pub fn id(mut self, value: impl Into<String>) -> Self {
        self.id = Some(value.into());
        self
    }

    pub fn model(mut self, value: impl Into<String>) -> Self {
        self.model = Some(value.into());
        self
    }

    pub fn choices(mut self, value: Vec<Choice>) -> Self {
        self.choices = Some(value);
        self
    }

    pub fn result(mut self, value: DecideResult) -> Self {
        self.result = Some(value);
        self
    }

    pub fn decision(mut self, value: DecideResult) -> Self {
        self.decision = Some(value);
        self
    }

    pub fn value(mut self, value: impl Into<String>) -> Self {
        self.value = Some(value.into());
        self
    }

    pub fn usage(mut self, value: Usage) -> Self {
        self.usage = Some(value);
        self
    }

    /// Consumes the builder and constructs a [`DecideResponse`].
    /// This method will fail if any of the following fields are not set:
    /// - [`id`](DecideResponseBuilder::id)
    /// - [`model`](DecideResponseBuilder::model)
    /// - [`choices`](DecideResponseBuilder::choices)
    /// - [`result`](DecideResponseBuilder::result)
    /// - [`usage`](DecideResponseBuilder::usage)
    pub fn build(self) -> Result<DecideResponse, BuildError> {
        Ok(DecideResponse {
            id: self.id.ok_or_else(|| BuildError::missing_field("id"))?,
            model: self
                .model
                .ok_or_else(|| BuildError::missing_field("model"))?,
            choices: self
                .choices
                .ok_or_else(|| BuildError::missing_field("choices"))?,
            result: self
                .result
                .ok_or_else(|| BuildError::missing_field("result"))?,
            decision: self.decision,
            value: self.value,
            usage: self
                .usage
                .ok_or_else(|| BuildError::missing_field("usage"))?,
        })
    }
}
