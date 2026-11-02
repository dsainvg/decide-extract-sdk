pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq)]
pub struct DecideResult {
    #[serde(default)]
    pub value: String,
    /// Probabilities for each option. These may not add up to 1.0; any remaining probability represents 'not sure' / uncertain.
    #[serde(default)]
    pub probabilities: HashMap<String, f64>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub reason: Option<String>,
}

impl DecideResult {
    pub fn builder() -> DecideResultBuilder {
        <DecideResultBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct DecideResultBuilder {
    value: Option<String>,
    probabilities: Option<HashMap<String, f64>>,
    reason: Option<String>,
}

impl DecideResultBuilder {
    pub fn value(mut self, value: impl Into<String>) -> Self {
        self.value = Some(value.into());
        self
    }

    pub fn probabilities(mut self, value: HashMap<String, f64>) -> Self {
        self.probabilities = Some(value);
        self
    }

    pub fn reason(mut self, value: impl Into<String>) -> Self {
        self.reason = Some(value.into());
        self
    }

    /// Consumes the builder and constructs a [`DecideResult`].
    /// This method will fail if any of the following fields are not set:
    /// - [`value`](DecideResultBuilder::value)
    /// - [`probabilities`](DecideResultBuilder::probabilities)
    pub fn build(self) -> Result<DecideResult, BuildError> {
        Ok(DecideResult {
            value: self
                .value
                .ok_or_else(|| BuildError::missing_field("value"))?,
            probabilities: self
                .probabilities
                .ok_or_else(|| BuildError::missing_field("probabilities"))?,
            reason: self.reason,
        })
    }
}
