pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq, Eq, Hash)]
pub struct ImageInput {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub r#type: Option<ImageInputType>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub url: Option<String>,
    /// base64-encoded image
    #[serde(skip_serializing_if = "Option::is_none")]
    pub data: Option<String>,
    /// image/png
    #[serde(skip_serializing_if = "Option::is_none")]
    pub mime_type: Option<String>,
}

impl ImageInput {
    pub fn builder() -> ImageInputBuilder {
        <ImageInputBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct ImageInputBuilder {
    r#type: Option<ImageInputType>,
    url: Option<String>,
    data: Option<String>,
    mime_type: Option<String>,
}

impl ImageInputBuilder {
    pub fn r#type(mut self, value: ImageInputType) -> Self {
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

    /// Consumes the builder and constructs a [`ImageInput`].
    pub fn build(self) -> Result<ImageInput, BuildError> {
        Ok(ImageInput {
            r#type: self.r#type,
            url: self.url,
            data: self.data,
            mime_type: self.mime_type,
        })
    }
}
