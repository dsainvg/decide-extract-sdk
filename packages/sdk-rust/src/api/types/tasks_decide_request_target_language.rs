pub use crate::prelude::*;

#[non_exhaustive]
#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub enum DecideRequestTargetLanguage {
    En,
    Es,
    Fr,
    De,
    It,
    Pt,
    Nl,
    Ru,
    Ja,
    Ko,
    Zh,
    Ar,
    Hi,
    Tr,
    Pl,
    Sv,
    Da,
    No,
    Fi,
    Cs,
    /// This variant is used for forward compatibility.
    /// If the server sends a value not recognized by the current SDK version,
    /// it will be captured here with the raw string value.
    __Unknown(String),
}
impl Serialize for DecideRequestTargetLanguage {
    fn serialize<S: serde::Serializer>(&self, serializer: S) -> Result<S::Ok, S::Error> {
        match self {
            Self::En => serializer.serialize_str("en"),
            Self::Es => serializer.serialize_str("es"),
            Self::Fr => serializer.serialize_str("fr"),
            Self::De => serializer.serialize_str("de"),
            Self::It => serializer.serialize_str("it"),
            Self::Pt => serializer.serialize_str("pt"),
            Self::Nl => serializer.serialize_str("nl"),
            Self::Ru => serializer.serialize_str("ru"),
            Self::Ja => serializer.serialize_str("ja"),
            Self::Ko => serializer.serialize_str("ko"),
            Self::Zh => serializer.serialize_str("zh"),
            Self::Ar => serializer.serialize_str("ar"),
            Self::Hi => serializer.serialize_str("hi"),
            Self::Tr => serializer.serialize_str("tr"),
            Self::Pl => serializer.serialize_str("pl"),
            Self::Sv => serializer.serialize_str("sv"),
            Self::Da => serializer.serialize_str("da"),
            Self::No => serializer.serialize_str("no"),
            Self::Fi => serializer.serialize_str("fi"),
            Self::Cs => serializer.serialize_str("cs"),
            Self::__Unknown(val) => serializer.serialize_str(val),
        }
    }
}

impl<'de> Deserialize<'de> for DecideRequestTargetLanguage {
    fn deserialize<D: serde::Deserializer<'de>>(deserializer: D) -> Result<Self, D::Error> {
        let value = String::deserialize(deserializer)?;
        match value.as_str() {
            "en" => Ok(Self::En),
            "es" => Ok(Self::Es),
            "fr" => Ok(Self::Fr),
            "de" => Ok(Self::De),
            "it" => Ok(Self::It),
            "pt" => Ok(Self::Pt),
            "nl" => Ok(Self::Nl),
            "ru" => Ok(Self::Ru),
            "ja" => Ok(Self::Ja),
            "ko" => Ok(Self::Ko),
            "zh" => Ok(Self::Zh),
            "ar" => Ok(Self::Ar),
            "hi" => Ok(Self::Hi),
            "tr" => Ok(Self::Tr),
            "pl" => Ok(Self::Pl),
            "sv" => Ok(Self::Sv),
            "da" => Ok(Self::Da),
            "no" => Ok(Self::No),
            "fi" => Ok(Self::Fi),
            "cs" => Ok(Self::Cs),
            _ => Ok(Self::__Unknown(value)),
        }
    }
}

impl fmt::Display for DecideRequestTargetLanguage {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::En => write!(f, "en"),
            Self::Es => write!(f, "es"),
            Self::Fr => write!(f, "fr"),
            Self::De => write!(f, "de"),
            Self::It => write!(f, "it"),
            Self::Pt => write!(f, "pt"),
            Self::Nl => write!(f, "nl"),
            Self::Ru => write!(f, "ru"),
            Self::Ja => write!(f, "ja"),
            Self::Ko => write!(f, "ko"),
            Self::Zh => write!(f, "zh"),
            Self::Ar => write!(f, "ar"),
            Self::Hi => write!(f, "hi"),
            Self::Tr => write!(f, "tr"),
            Self::Pl => write!(f, "pl"),
            Self::Sv => write!(f, "sv"),
            Self::Da => write!(f, "da"),
            Self::No => write!(f, "no"),
            Self::Fi => write!(f, "fi"),
            Self::Cs => write!(f, "cs"),
            Self::__Unknown(val) => write!(f, "{}", val),
        }
    }
}
