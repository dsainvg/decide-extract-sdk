pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(tag = "type")]
#[non_exhaustive]
pub enum Task {
    #[serde(rename = "decide")]
    #[non_exhaustive]
    Decide {
        #[serde(default)]
        name: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        id: Option<String>,
        #[serde(default)]
        question: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        choices: Option<Vec<String>>,
        #[serde(skip_serializing_if = "Option::is_none")]
        options: Option<Vec<String>>,
        #[serde(skip_serializing_if = "Option::is_none")]
        instruction: Option<String>,
        #[serde(skip_serializing_if = "Option::is_none")]
        target_language: Option<DecideTaskTargetLanguage>,
    },

    #[serde(rename = "extract")]
    #[non_exhaustive]
    Extract {
        #[serde(default)]
        name: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        id: Option<String>,
        #[serde(default)]
        instruction: String,
        #[serde(skip_serializing_if = "Option::is_none")]
        fields: Option<Vec<String>>,
        #[serde(skip_serializing_if = "Option::is_none")]
        keys: Option<Vec<String>>,
        #[serde(skip_serializing_if = "Option::is_none")]
        schema: Option<HashMap<String, serde_json::Value>>,
        #[serde(skip_serializing_if = "Option::is_none")]
        target_language: Option<ExtractTaskTargetLanguage>,
    },

    /// Catch-all variant for unrecognized discriminant values.
    /// If the server sends a discriminant not recognized by the current SDK
    /// version, the raw payload is captured here so callers can still inspect it.
    #[serde(untagged)]
    __Unknown(serde_json::Value),
}

impl Task {
    pub fn decide(name: String, question: String) -> Self {
        Self::Decide {
            name,
            id: None,
            question,
            choices: None,
            options: None,
            instruction: None,
            target_language: None,
        }
    }

    pub fn extract(name: String, instruction: String) -> Self {
        Self::Extract {
            name,
            id: None,
            instruction,
            fields: None,
            keys: None,
            schema: None,
            target_language: None,
        }
    }

    pub fn decide_with_id(
        name: String,
        id: String,
        question: String,
        choices: Option<Vec<String>>,
        options: Option<Vec<String>>,
        instruction: Option<String>,
        target_language: Option<DecideTaskTargetLanguage>,
    ) -> Self {
        Self::Decide {
            name,
            id: Some(id),
            question,
            choices,
            options,
            instruction,
            target_language,
        }
    }

    pub fn decide_with_choices(
        name: String,
        id: Option<String>,
        question: String,
        choices: Vec<String>,
        options: Option<Vec<String>>,
        instruction: Option<String>,
        target_language: Option<DecideTaskTargetLanguage>,
    ) -> Self {
        Self::Decide {
            name,
            id,
            question,
            choices: Some(choices),
            options,
            instruction,
            target_language,
        }
    }

    pub fn decide_with_options(
        name: String,
        id: Option<String>,
        question: String,
        choices: Option<Vec<String>>,
        options: Vec<String>,
        instruction: Option<String>,
        target_language: Option<DecideTaskTargetLanguage>,
    ) -> Self {
        Self::Decide {
            name,
            id,
            question,
            choices,
            options: Some(options),
            instruction,
            target_language,
        }
    }

    pub fn decide_with_instruction(
        name: String,
        id: Option<String>,
        question: String,
        choices: Option<Vec<String>>,
        options: Option<Vec<String>>,
        instruction: String,
        target_language: Option<DecideTaskTargetLanguage>,
    ) -> Self {
        Self::Decide {
            name,
            id,
            question,
            choices,
            options,
            instruction: Some(instruction),
            target_language,
        }
    }

    pub fn decide_with_target_language(
        name: String,
        id: Option<String>,
        question: String,
        choices: Option<Vec<String>>,
        options: Option<Vec<String>>,
        instruction: Option<String>,
        target_language: DecideTaskTargetLanguage,
    ) -> Self {
        Self::Decide {
            name,
            id,
            question,
            choices,
            options,
            instruction,
            target_language: Some(target_language),
        }
    }

    pub fn extract_with_id(
        name: String,
        id: String,
        instruction: String,
        fields: Option<Vec<String>>,
        keys: Option<Vec<String>>,
        schema: Option<HashMap<String, serde_json::Value>>,
        target_language: Option<ExtractTaskTargetLanguage>,
    ) -> Self {
        Self::Extract {
            name,
            id: Some(id),
            instruction,
            fields,
            keys,
            schema,
            target_language,
        }
    }

    pub fn extract_with_fields(
        name: String,
        id: Option<String>,
        instruction: String,
        fields: Vec<String>,
        keys: Option<Vec<String>>,
        schema: Option<HashMap<String, serde_json::Value>>,
        target_language: Option<ExtractTaskTargetLanguage>,
    ) -> Self {
        Self::Extract {
            name,
            id,
            instruction,
            fields: Some(fields),
            keys,
            schema,
            target_language,
        }
    }

    pub fn extract_with_keys(
        name: String,
        id: Option<String>,
        instruction: String,
        fields: Option<Vec<String>>,
        keys: Vec<String>,
        schema: Option<HashMap<String, serde_json::Value>>,
        target_language: Option<ExtractTaskTargetLanguage>,
    ) -> Self {
        Self::Extract {
            name,
            id,
            instruction,
            fields,
            keys: Some(keys),
            schema,
            target_language,
        }
    }

    pub fn extract_with_schema(
        name: String,
        id: Option<String>,
        instruction: String,
        fields: Option<Vec<String>>,
        keys: Option<Vec<String>>,
        schema: HashMap<String, serde_json::Value>,
        target_language: Option<ExtractTaskTargetLanguage>,
    ) -> Self {
        Self::Extract {
            name,
            id,
            instruction,
            fields,
            keys,
            schema: Some(schema),
            target_language,
        }
    }

    pub fn extract_with_target_language(
        name: String,
        id: Option<String>,
        instruction: String,
        fields: Option<Vec<String>>,
        keys: Option<Vec<String>>,
        schema: Option<HashMap<String, serde_json::Value>>,
        target_language: ExtractTaskTargetLanguage,
    ) -> Self {
        Self::Extract {
            name,
            id,
            instruction,
            fields,
            keys,
            schema,
            target_language: Some(target_language),
        }
    }

    pub fn unknown(value: serde_json::Value) -> Self {
        Self::__Unknown(value)
    }
}
