pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq, Eq, Hash)]
pub struct ErrorResponse {
    #[serde(default)]
    pub error: ErrorResponseError,
}

impl ErrorResponse {
    pub fn builder() -> ErrorResponseBuilder {
        <ErrorResponseBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct ErrorResponseBuilder {
    error: Option<ErrorResponseError>,
}

impl ErrorResponseBuilder {
    pub fn error(mut self, value: ErrorResponseError) -> Self {
        self.error = Some(value);
        self
    }

    /// Consumes the builder and constructs a [`ErrorResponse`].
    /// This method will fail if any of the following fields are not set:
    /// - [`error`](ErrorResponseBuilder::error)
    pub fn build(self) -> Result<ErrorResponse, BuildError> {
        Ok(ErrorResponse {
            error: self
                .error
                .ok_or_else(|| BuildError::missing_field("error"))?,
        })
    }
}
