pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq)]
pub struct ExtractResponse {
    #[serde(default)]
    pub id: String,
    #[serde(default)]
    pub model: String,
    #[serde(default)]
    pub choices: Vec<Choice>,
    #[serde(default)]
    pub result: HashMap<String, serde_json::Value>,
    /// Backward-compatible alias for result
    #[serde(skip_serializing_if = "Option::is_none")]
    pub data: Option<HashMap<String, serde_json::Value>>,
    /// Extracted value
    #[serde(skip_serializing_if = "Option::is_none")]
    pub value: Option<String>,
    #[serde(default)]
    pub usage: Usage,
}

impl ExtractResponse {
    pub fn builder() -> ExtractResponseBuilder {
        <ExtractResponseBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct ExtractResponseBuilder {
    id: Option<String>,
    model: Option<String>,
    choices: Option<Vec<Choice>>,
    result: Option<HashMap<String, serde_json::Value>>,
    data: Option<HashMap<String, serde_json::Value>>,
    value: Option<String>,
    usage: Option<Usage>,
}

impl ExtractResponseBuilder {
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

    pub fn result(mut self, value: HashMap<String, serde_json::Value>) -> Self {
        self.result = Some(value);
        self
    }

    pub fn data(mut self, value: HashMap<String, serde_json::Value>) -> Self {
        self.data = Some(value);
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

    /// Consumes the builder and constructs a [`ExtractResponse`].
    /// This method will fail if any of the following fields are not set:
    /// - [`id`](ExtractResponseBuilder::id)
    /// - [`model`](ExtractResponseBuilder::model)
    /// - [`choices`](ExtractResponseBuilder::choices)
    /// - [`result`](ExtractResponseBuilder::result)
    /// - [`usage`](ExtractResponseBuilder::usage)
    pub fn build(self) -> Result<ExtractResponse, BuildError> {
        Ok(ExtractResponse {
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
            data: self.data,
            value: self.value,
            usage: self
                .usage
                .ok_or_else(|| BuildError::missing_field("usage"))?,
        })
    }
}
