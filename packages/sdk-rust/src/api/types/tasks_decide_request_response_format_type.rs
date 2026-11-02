pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub enum DecideRequestResponseFormatType {
    #[serde(rename = "json_object")]
    JsonObject,
}
impl fmt::Display for DecideRequestResponseFormatType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let s = match self {
            Self::JsonObject => "json_object",
        };
        write!(f, "{}", s)
    }
}
