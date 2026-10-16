pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub struct DecideRequestResponseFormat {
    pub r#type: DecideRequestResponseFormatType,
}

impl DecideRequestResponseFormat {
    pub fn builder() -> DecideRequestResponseFormatBuilder {
        <DecideRequestResponseFormatBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct DecideRequestResponseFormatBuilder {
    r#type: Option<DecideRequestResponseFormatType>,
}

impl DecideRequestResponseFormatBuilder {
    pub fn r#type(mut self, value: DecideRequestResponseFormatType) -> Self {
        self.r#type = Some(value);
        self
    }

    /// Consumes the builder and constructs a [`DecideRequestResponseFormat`].
    /// This method will fail if any of the following fields are not set:
    /// - [`r#type`](DecideRequestResponseFormatBuilder::r#type)
    pub fn build(self) -> Result<DecideRequestResponseFormat, BuildError> {
        Ok(DecideRequestResponseFormat {
            r#type: self
                .r#type
                .ok_or_else(|| BuildError::missing_field("r#type"))?,
        })
    }
}
