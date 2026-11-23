//! Service clients and API endpoints
//!
//! This module contains client implementations for:
//!
//! - **Tasks**

use crate::{ApiError, ClientConfig};

pub mod tasks;
pub struct ApiClient {
    pub config: ClientConfig,
    pub tasks: TasksClient,
}

impl ApiClient {
    pub fn new(config: ClientConfig) -> Result<Self, ApiError> {
        Ok(Self {
            config: config.clone(),
            tasks: TasksClient::new(config.clone())?,
        })
    }
}

pub use tasks::TasksClient;
