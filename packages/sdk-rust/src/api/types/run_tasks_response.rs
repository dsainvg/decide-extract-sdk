pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq)]
pub struct RunTasksResponse {
    #[serde(default)]
    pub id: String,
    #[serde(default)]
    pub model: String,
    #[serde(default)]
    pub choices: Vec<Choice>,
    #[serde(default)]
    pub results: HashMap<String, serde_json::Value>,
    /// Backward-compatible alias for results
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tasks: Option<HashMap<String, serde_json::Value>>,
    #[serde(default)]
    pub usage: Usage,
}

impl RunTasksResponse {
    pub fn builder() -> RunTasksResponseBuilder {
        <RunTasksResponseBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct RunTasksResponseBuilder {
    id: Option<String>,
    model: Option<String>,
    choices: Option<Vec<Choice>>,
    results: Option<HashMap<String, serde_json::Value>>,
    tasks: Option<HashMap<String, serde_json::Value>>,
    usage: Option<Usage>,
}

impl RunTasksResponseBuilder {
    pub fn id(mut self, value: impl Into<String>) -> Self {
        self.id = Some(value.into());
        self
    }

    pub fn model(mut self, value: impl Into<String>) -> Self {
        self.model = Some(value.into());
        self
    }

    pub fn choices(mut self, value: Vec<Choice>) -> Self {
        self.choices = Some(value);
        self
    }

    pub fn results(mut self, value: HashMap<String, serde_json::Value>) -> Self {
        self.results = Some(value);
        self
    }

    pub fn tasks(mut self, value: HashMap<String, serde_json::Value>) -> Self {
        self.tasks = Some(value);
        self
    }

    pub fn usage(mut self, value: Usage) -> Self {
        self.usage = Some(value);
        self
    }

    /// Consumes the builder and constructs a [`RunTasksResponse`].
    /// This method will fail if any of the following fields are not set:
    /// - [`id`](RunTasksResponseBuilder::id)
    /// - [`model`](RunTasksResponseBuilder::model)
    /// - [`choices`](RunTasksResponseBuilder::choices)
    /// - [`results`](RunTasksResponseBuilder::results)
    /// - [`usage`](RunTasksResponseBuilder::usage)
    pub fn build(self) -> Result<RunTasksResponse, BuildError> {
        Ok(RunTasksResponse {
            id: self.id.ok_or_else(|| BuildError::missing_field("id"))?,
            model: self
                .model
                .ok_or_else(|| BuildError::missing_field("model"))?,
            choices: self
                .choices
                .ok_or_else(|| BuildError::missing_field("choices"))?,
            results: self
                .results
                .ok_or_else(|| BuildError::missing_field("results"))?,
            tasks: self.tasks,
            usage: self
                .usage
                .ok_or_else(|| BuildError::missing_field("usage"))?,
        })
    }
}
