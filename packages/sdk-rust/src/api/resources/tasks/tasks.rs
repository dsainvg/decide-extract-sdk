use crate::api::*;
use crate::{ApiError, ClientConfig, HttpClient, RequestOptions};
use reqwest::Method;

pub struct TasksClient {
    pub http_client: HttpClient,
}

impl TasksClient {
    pub fn new(config: ClientConfig) -> Result<Self, ApiError> {
        Ok(Self {
            http_client: HttpClient::new(config.clone())?,
        })
    }

    /// # Examples
    ///
    /// ```no_run
    /// use dexa-ai-sdk::prelude::*;
    ///
    /// #[tokio::main]
    /// async fn main() {
    ///     let config = ClientConfig {
    ///         ..Default::default()
    ///     };
    ///     let client = ApiClient::new(config).expect("Failed to build client");
    ///     client
    ///         .tasks
    ///         .run_tasks(
    ///             &RunTasksRequest {
    ///                 model: "model".to_string(),
    ///                 tasks: vec![Task::Decide {
    ///                     data: DecideTask {
    ///                         name: "name".to_string(),
    ///                         question: "question".to_string(),
    ///                         ..Default::default()
    ///                     },
    ///                 }],
    ///                 ..Default::default()
    ///             },
    ///             None,
    ///         )
    ///         .await;
    /// }
    /// ```
    pub async fn run_tasks(
        &self,
        request: &RunTasksRequest,
        options: Option<RequestOptions>,
    ) -> Result<RunTasksResponse, ApiError> {
        self.http_client
            .execute_request(
                Method::POST,
                "v1/tasks",
                Some(serde_json::to_value(request).map_err(ApiError::Serialization)?),
                None,
                options,
            )
            .await
    }

    /// # Examples
    ///
    /// ```no_run
    /// use dexa-ai-sdk::prelude::*;
    ///
    /// #[tokio::main]
    /// async fn main() {
    ///     let config = ClientConfig {
    ///         ..Default::default()
    ///     };
    ///     let client = ApiClient::new(config).expect("Failed to build client");
    ///     client
    ///         .tasks
    ///         .decide_extract(
    ///             &RunTasksRequest {
    ///                 model: "model".to_string(),
    ///                 tasks: vec![Task::Decide {
    ///                     data: DecideTask {
    ///                         name: "name".to_string(),
    ///                         question: "question".to_string(),
    ///                         ..Default::default()
    ///                     },
    ///                 }],
    ///                 ..Default::default()
    ///             },
    ///             None,
    ///         )
    ///         .await;
    /// }
    /// ```
    pub async fn decide_extract(
        &self,
        request: &RunTasksRequest,
        options: Option<RequestOptions>,
    ) -> Result<RunTasksResponse, ApiError> {
        self.http_client
            .execute_request(
                Method::POST,
                "v1/decide-extract",
                Some(serde_json::to_value(request).map_err(ApiError::Serialization)?),
                None,
                options,
            )
            .await
    }

    /// # Examples
    ///
    /// ```no_run
    /// use dexa-ai-sdk::prelude::*;
    ///
    /// #[tokio::main]
    /// async fn main() {
    ///     let config = ClientConfig {
    ///         ..Default::default()
    ///     };
    ///     let client = ApiClient::new(config).expect("Failed to build client");
    ///     client
    ///         .tasks
    ///         .decide(
    ///             &DecideRequest {
    ///                 model: "model".to_string(),
    ///                 question: "question".to_string(),
    ///                 context: None,
    ///                 messages: None,
    ///                 images: None,
    ///                 audio: None,
    ///                 choices: None,
    ///                 options: None,
    ///                 instruction: None,
    ///                 temperature: None,
    ///                 max_output_tokens: None,
    ///                 response_format: None,
    ///                 target_language: None,
    ///                 output_language: None,
    ///             },
    ///             None,
    ///         )
    ///         .await;
    /// }
    /// ```
    pub async fn decide(
        &self,
        request: &DecideRequest,
        options: Option<RequestOptions>,
    ) -> Result<DecideResponse, ApiError> {
        self.http_client
            .execute_request(
                Method::POST,
                "decide",
                Some(serde_json::to_value(request).map_err(ApiError::Serialization)?),
                None,
                options,
            )
            .await
    }

    /// # Examples
    ///
    /// ```no_run
    /// use dexa-ai-sdk::prelude::*;
    ///
    /// #[tokio::main]
    /// async fn main() {
    ///     let config = ClientConfig {
    ///         ..Default::default()
    ///     };
    ///     let client = ApiClient::new(config).expect("Failed to build client");
    ///     client
    ///         .tasks
    ///         .extract(
    ///             &ExtractRequest {
    ///                 model: "model".to_string(),
    ///                 instruction: "instruction".to_string(),
    ///                 context: None,
    ///                 messages: None,
    ///                 images: None,
    ///                 audio: None,
    ///                 fields: None,
    ///                 keys: None,
    ///                 schema: None,
    ///                 temperature: None,
    ///                 max_output_tokens: None,
    ///                 response_format: None,
    ///                 target_language: None,
    ///                 output_language: None,
    ///             },
    ///             None,
    ///         )
    ///         .await;
    /// }
    /// ```
    pub async fn extract(
        &self,
        request: &ExtractRequest,
        options: Option<RequestOptions>,
    ) -> Result<ExtractResponse, ApiError> {
        self.http_client
            .execute_request(
                Method::POST,
                "extract",
                Some(serde_json::to_value(request).map_err(ApiError::Serialization)?),
                None,
                options,
            )
            .await
    }
}
