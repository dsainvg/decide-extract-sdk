pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash)]
pub enum ResponseMessageRole {
    #[serde(rename = "assistant")]
    Assistant,
}
impl fmt::Display for ResponseMessageRole {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let s = match self {
            Self::Assistant => "assistant",
        };
        write!(f, "{}", s)
    }
}
