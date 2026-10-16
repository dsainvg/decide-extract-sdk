pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq, Eq, Hash)]
pub struct ImageUrl {
    #[serde(default)]
    pub url: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub detail: Option<ImageUrlDetail>,
}

impl ImageUrl {
    pub fn builder() -> ImageUrlBuilder {
        <ImageUrlBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct ImageUrlBuilder {
    url: Option<String>,
    detail: Option<ImageUrlDetail>,
}

impl ImageUrlBuilder {
    pub fn url(mut self, value: impl Into<String>) -> Self {
        self.url = Some(value.into());
        self
    }

    pub fn detail(mut self, value: ImageUrlDetail) -> Self {
        self.detail = Some(value);
        self
    }

    /// Consumes the builder and constructs a [`ImageUrl`].
    /// This method will fail if any of the following fields are not set:
    /// - [`url`](ImageUrlBuilder::url)
    pub fn build(self) -> Result<ImageUrl, BuildError> {
        Ok(ImageUrl {
            url: self.url.ok_or_else(|| BuildError::missing_field("url"))?,
            detail: self.detail,
        })
    }
}
