pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Hash)]
#[serde(untagged)]
pub enum MessageContent {
    String(String),

    ContentPartList(Vec<ContentPart>),
}

impl MessageContent {
    pub fn is_string(&self) -> bool {
        matches!(self, Self::String(_))
    }

    pub fn is_content_part_list(&self) -> bool {
        matches!(self, Self::ContentPartList(_))
    }

    pub fn as_string(&self) -> Option<&str> {
        match self {
            Self::String(value) => Some(value),
            _ => None,
        }
    }

    pub fn into_string(self) -> Option<String> {
        match self {
            Self::String(value) => Some(value),
            _ => None,
        }
    }

    pub fn as_content_part_list(&self) -> Option<&Vec<ContentPart>> {
        match self {
            Self::ContentPartList(value) => Some(value),
            _ => None,
        }
    }

    pub fn into_content_part_list(self) -> Option<Vec<ContentPart>> {
        match self {
            Self::ContentPartList(value) => Some(value),
            _ => None,
        }
    }
}
