pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub struct Message {
    pub role: MessageRole,
    pub content: MessageContent,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub language: Option<MessageLanguage>,
}

impl Message {
    pub fn builder() -> MessageBuilder {
        <MessageBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct MessageBuilder {
    role: Option<MessageRole>,
    content: Option<MessageContent>,
    language: Option<MessageLanguage>,
}

impl MessageBuilder {
    pub fn role(mut self, value: MessageRole) -> Self {
        self.role = Some(value);
        self
    }

    pub fn content(mut self, value: MessageContent) -> Self {
        self.content = Some(value);
        self
    }

    pub fn language(mut self, value: MessageLanguage) -> Self {
        self.language = Some(value);
        self
    }

    /// Consumes the builder and constructs a [`Message`].
    /// This method will fail if any of the following fields are not set:
    /// - [`role`](MessageBuilder::role)
    /// - [`content`](MessageBuilder::content)
    pub fn build(self) -> Result<Message, BuildError> {
        Ok(Message {
            role: self.role.ok_or_else(|| BuildError::missing_field("role"))?,
            content: self
                .content
                .ok_or_else(|| BuildError::missing_field("content"))?,
            language: self.language,
        })
    }
}
