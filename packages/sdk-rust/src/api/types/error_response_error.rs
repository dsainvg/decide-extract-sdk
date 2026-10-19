pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq, Eq, Hash)]
pub struct ErrorResponseError {
    #[serde(default)]
    pub r#type: String,
    #[serde(default)]
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub param: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub code: Option<String>,
}

impl ErrorResponseError {
    pub fn builder() -> ErrorResponseErrorBuilder {
        <ErrorResponseErrorBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct ErrorResponseErrorBuilder {
    r#type: Option<String>,
    message: Option<String>,
    param: Option<String>,
    code: Option<String>,
}

impl ErrorResponseErrorBuilder {
    pub fn r#type(mut self, value: impl Into<String>) -> Self {
        self.r#type = Some(value.into());
        self
    }

    pub fn message(mut self, value: impl Into<String>) -> Self {
        self.message = Some(value.into());
        self
    }

    pub fn param(mut self, value: impl Into<String>) -> Self {
        self.param = Some(value.into());
        self
    }

    pub fn code(mut self, value: impl Into<String>) -> Self {
        self.code = Some(value.into());
        self
    }

    /// Consumes the builder and constructs a [`ErrorResponseError`].
    /// This method will fail if any of the following fields are not set:
    /// - [`r#type`](ErrorResponseErrorBuilder::r#type)
    /// - [`message`](ErrorResponseErrorBuilder::message)
    pub fn build(self) -> Result<ErrorResponseError, BuildError> {
        Ok(ErrorResponseError {
            r#type: self
                .r#type
                .ok_or_else(|| BuildError::missing_field("r#type"))?,
            message: self
                .message
                .ok_or_else(|| BuildError::missing_field("message"))?,
            param: self.param,
            code: self.code,
        })
    }
}
