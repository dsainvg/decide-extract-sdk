pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq, Eq, Hash)]
pub struct Usage {
    #[serde(default)]
    pub prompt_tokens: i64,
    #[serde(default)]
    pub completion_tokens: i64,
    #[serde(default)]
    pub total_tokens: i64,
}

impl Usage {
    pub fn builder() -> UsageBuilder {
        <UsageBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct UsageBuilder {
    prompt_tokens: Option<i64>,
    completion_tokens: Option<i64>,
    total_tokens: Option<i64>,
}

impl UsageBuilder {
    pub fn prompt_tokens(mut self, value: i64) -> Self {
        self.prompt_tokens = Some(value);
        self
    }

    pub fn completion_tokens(mut self, value: i64) -> Self {
        self.completion_tokens = Some(value);
        self
    }

    pub fn total_tokens(mut self, value: i64) -> Self {
        self.total_tokens = Some(value);
        self
    }

    /// Consumes the builder and constructs a [`Usage`].
    /// This method will fail if any of the following fields are not set:
    /// - [`prompt_tokens`](UsageBuilder::prompt_tokens)
    /// - [`completion_tokens`](UsageBuilder::completion_tokens)
    /// - [`total_tokens`](UsageBuilder::total_tokens)
    pub fn build(self) -> Result<Usage, BuildError> {
        Ok(Usage {
            prompt_tokens: self
                .prompt_tokens
                .ok_or_else(|| BuildError::missing_field("prompt_tokens"))?,
            completion_tokens: self
                .completion_tokens
                .ok_or_else(|| BuildError::missing_field("completion_tokens"))?,
            total_tokens: self
                .total_tokens
                .ok_or_else(|| BuildError::missing_field("total_tokens"))?,
        })
    }
}
