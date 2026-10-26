pub use crate::prelude::*;

#[non_exhaustive]
#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub enum ContentPartType {
    Text,
    ImageUrl,
    Image,
    Audio,
    InputAudio,
    /// This variant is used for forward compatibility.
    /// If the server sends a value not recognized by the current SDK version,
    /// it will be captured here with the raw string value.
    __Unknown(String),
}
impl Serialize for ContentPartType {
    fn serialize<S: serde::Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        match self {
            Self::Text => serializer.serialize_str("text"),
            Self::ImageUrl => serializer.serialize_str("image_url"),
            Self::Image => serializer.serialize_str("image"),
            Self::Audio => serializer.serialize_str("audio"),
            Self::InputAudio => serializer.serialize_str("input_audio"),
            Self::__Unknown(val) => serializer.serialize_str(val),
        }
    }
}

impl<'de> Deserialize<'de> for ContentPartType {
    fn deserialize<D: serde::Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
        let value = String::deserialize(deserializer)?;
        match value.as_str() {
            "text" => Ok(Self::Text),
            "image_url" => Ok(Self::ImageUrl),
            "image" => Ok(Self::Image),
            "audio" => Ok(Self::Audio),
            "input_audio" => Ok(Self::InputAudio),
            _ => Ok(Self::__Unknown(value)),
        }
    }
}

impl fmt::Display for ContentPartType {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Text => write!(f, "text"),
            Self::ImageUrl => write!(f, "image_url"),
            Self::Image => write!(f, "image"),
            Self::Audio => write!(f, "audio"),
            Self::InputAudio => write!(f, "input_audio"),
            Self::__Unknown(val) => write!(f, "{}", val),
        }
    }
}
