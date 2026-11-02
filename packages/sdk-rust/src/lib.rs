//! # Decider-Extractor API SDK
//!
//! The official Rust SDK for the Decider-Extractor API.
//!
//! ## Getting Started
//!
//! ```rust
//! use dexa-ai-sdk::prelude::*;
//!
//! #[tokio::main]
//! async fn main() {
//!     let config = ClientConfig {
//!         ..Default::default()
//!     };
//!     let client = ApiClient::new(config).expect("Failed to build client");
//!     client
//!         .tasks
//!         .run_tasks(
//!             &RunTasksRequest {
//!                 model: "model".to_string(),
//!                 tasks: vec![Task::Decide {
//!                     data: DecideTask {
//!                         name: "name".to_string(),
//!                         question: "question".to_string(),
//!                         ..Default::default()
//!                     },
//!                 }],
//!                 ..Default::default()
//!             },
//!             None,
//!         )
//!         .await;
//! }
//! ```
//!
//! ## Modules
//!
//! - [`api`] - Core API types and models
//! - [`client`] - Client implementations
//! - [`config`] - Configuration options
//! - [`core`] - Core utilities and infrastructure
//! - [`error`] - Error types and handling
//! - [`prelude`] - Common imports for convenience

pub mod api;
pub mod client;
pub mod config;
pub mod core;
pub mod environment;
pub mod error;
pub mod prelude;

pub use api::*;
pub use client::*;
pub use config::*;
pub use core::*;
pub use environment::*;
pub use error::{ApiError, BuildError};
