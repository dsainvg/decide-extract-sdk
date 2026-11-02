pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub struct ResponseMessage {
    pub role: ResponseMessageRole,
    #[serde(default)]
    pub content: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub language: Option<ResponseMessageLanguage>,
}

impl ResponseMessage {
    pub fn builder() -> ResponseMessageBuilder {
        <ResponseMessageBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct ResponseMessageBuilder {
    role: Option<ResponseMessageRole>,
    content: Option<String>,
    language: Option<ResponseMessageLanguage>,
}

impl ResponseMessageBuilder {
    pub fn role(mut self, value: ResponseMessageRole) -> Self {
        self.role = Some(value);
        self
    }

    pub fn content(mut self, value: impl Into<String>) -> Self {
        self.content = Some(value.into());
        self
    }

    pub fn language(mut self, value: ResponseMessageLanguage) -> Self {
        self.language = Some(value);
        self
    }

    /// Consumes the builder and constructs a [`ResponseMessage`].
    /// This method will fail if any of the following fields are not set:
    /// - [`role`](ResponseMessageBuilder::role)
    /// - [`content`](ResponseMessageBuilder::content)
    pub fn build(self) -> Result<ResponseMessage, BuildError> {
        Ok(ResponseMessage {
            role: self.role.ok_or_else(|| BuildError::missing_field("role"))?,
            content: self
                .content
                .ok_or_else(|| BuildError::missing_field("content"))?,
            language: self.language,
        })
    }
}
