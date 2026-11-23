pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq, Eq, Hash)]
pub struct AudioInput {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub r#type: Option<AudioInputType>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub url: Option<String>,
    /// base64-encoded audio
    #[serde(skip_serializing_if = "Option::is_none")]
    pub data: Option<String>,
    /// audio/mp3
    #[serde(skip_serializing_if = "Option::is_none")]
    pub mime_type: Option<String>,
}

impl AudioInput {
    pub fn builder() -> AudioInputBuilder {
        <AudioInputBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct AudioInputBuilder {
    r#type: Option<AudioInputType>,
    url: Option<String>,
    data: Option<String>,
    mime_type: Option<String>,
}

impl AudioInputBuilder {
    pub fn r#type(mut self, value: AudioInputType) -> Self {
        self.r#type = Some(value);
        self
    }

    pub fn url(mut self, value: impl Into<String>) -> Self {
        self.url = Some(value.into());
        self
    }

    pub fn data(mut self, value: impl Into<String>) -> Self {
        self.data = Some(value.into());
        self
    }

    pub fn mime_type(mut self, value: impl Into<String>) -> Self {
        self.mime_type = Some(value.into());
        self
    }

    /// Consumes the builder and constructs a [`AudioInput`].
    pub fn build(self) -> Result<AudioInput, BuildError> {
        Ok(AudioInput {
            r#type: self.r#type,
            url: self.url,
            data: self.data,
            mime_type: self.mime_type,
        })
    }
}
