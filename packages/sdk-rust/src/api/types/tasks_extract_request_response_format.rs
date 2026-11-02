pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub struct ExtractRequestResponseFormat {
    pub r#type: ExtractRequestResponseFormatType,
}

impl ExtractRequestResponseFormat {
    pub fn builder() -> ExtractRequestResponseFormatBuilder {
        <ExtractRequestResponseFormatBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct ExtractRequestResponseFormatBuilder {
    r#type: Option<ExtractRequestResponseFormatType>,
}

impl ExtractRequestResponseFormatBuilder {
    pub fn r#type(mut self, value: ExtractRequestResponseFormatType) -> Self {
        self.r#type = Some(value);
        self
    }

    /// Consumes the builder and constructs a [`ExtractRequestResponseFormat`].
    /// This method will fail if any of the following fields are not set:
    /// - [`r#type`](ExtractRequestResponseFormatBuilder::r#type)
    pub fn build(self) -> Result<ExtractRequestResponseFormat, BuildError> {
        Ok(ExtractRequestResponseFormat {
            r#type: self
                .r#type
                .ok_or_else(|| BuildError::missing_field("r#type"))?,
        })
    }
}
