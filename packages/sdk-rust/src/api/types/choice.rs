pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub struct Choice {
    pub message: ResponseMessage,
    pub finish_reason: ChoiceFinishReason,
}

impl Choice {
    pub fn builder() -> ChoiceBuilder {
        <ChoiceBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct ChoiceBuilder {
    message: Option<ResponseMessage>,
    finish_reason: Option<ChoiceFinishReason>,
}

impl ChoiceBuilder {
    pub fn message(mut self, value: ResponseMessage) -> Self {
        self.message = Some(value);
        self
    }

    pub fn finish_reason(mut self, value: ChoiceFinishReason) -> Self {
        self.finish_reason = Some(value);
        self
    }

    /// Consumes the builder and constructs a [`Choice`].
    /// This method will fail if any of the following fields are not set:
    /// - [`message`](ChoiceBuilder::message)
    /// - [`finish_reason`](ChoiceBuilder::finish_reason)
    pub fn build(self) -> Result<Choice, BuildError> {
        Ok(Choice {
            message: self
                .message
                .ok_or_else(|| BuildError::missing_field("message"))?,
            finish_reason: self
                .finish_reason
                .ok_or_else(|| BuildError::missing_field("finish_reason"))?,
        })
    }
}
