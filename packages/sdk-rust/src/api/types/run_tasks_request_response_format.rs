pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub struct RunTasksRequestResponseFormat {
    pub r#type: RunTasksRequestResponseFormatType,
}

impl RunTasksRequestResponseFormat {
    pub fn builder() -> RunTasksRequestResponseFormatBuilder {
        <RunTasksRequestResponseFormatBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct RunTasksRequestResponseFormatBuilder {
    r#type: Option<RunTasksRequestResponseFormatType>,
}

impl RunTasksRequestResponseFormatBuilder {
    pub fn r#type(mut self, value: RunTasksRequestResponseFormatType) -> Self {
        self.r#type = Some(value);
        self
    }

    /// Consumes the builder and constructs a [`RunTasksRequestResponseFormat`].
    /// This method will fail if any of the following fields are not set:
    /// - [`r#type`](RunTasksRequestResponseFormatBuilder::r#type)
    pub fn build(self) -> Result<RunTasksRequestResponseFormat, BuildError> {
        Ok(RunTasksRequestResponseFormat {
            r#type: self
                .r#type
                .ok_or_else(|| BuildError::missing_field("r#type"))?,
        })
    }
}
