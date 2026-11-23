pub use crate::prelude::*;

#[derive(Debug, Clone, Serialize, Deserialize, Default, PartialEq, Eq, Hash)]
pub struct ContentPart {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub r#type: Option<ContentPartType>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub text: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub language: Option<ContentPartLanguage>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub image_url: Option<ImageUrl>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub image: Option<ImageInput>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub audio: Option<AudioInput>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub input_audio: Option<AudioInput>,
}

impl ContentPart {
    pub fn builder() -> ContentPartBuilder {
        <ContentPartBuilder as Default>::default()
    }
}

#[derive(Clone, PartialEq, Default, Debug)]
#[non_exhaustive]
pub struct ContentPartBuilder {
    r#type: Option<ContentPartType>,
    text: Option<String>,
    language: Option<ContentPartLanguage>,
    image_url: Option<ImageUrl>,
    image: Option<ImageInput>,
    audio: Option<AudioInput>,
    input_audio: Option<AudioInput>,
}

impl ContentPartBuilder {
    pub fn r#type(mut self, value: ContentPartType) -> Self {
        self.r#type = Some(value);
        self
    }

    pub fn text(mut self, value: impl Into<String>) -> Self {
        self.text = Some(value.into());
        self
    }

    pub fn language(mut self, value: ContentPartLanguage) -> Self {
        self.language = Some(value);
        self
    }

    pub fn image_url(mut self, value: ImageUrl) -> Self {
        self.image_url = Some(value);
        self
    }

    pub fn image(mut self, value: ImageInput) -> Self {
        self.image = Some(value);
        self
    }

    pub fn audio(mut self, value: AudioInput) -> Self {
        self.audio = Some(value);
        self
    }

    pub fn input_audio(mut self, value: AudioInput) -> Self {
        self.input_audio = Some(value);
        self
    }

    /// Consumes the builder and constructs a [`ContentPart`].
    pub fn build(self) -> Result<ContentPart, BuildError> {
        Ok(ContentPart {
            r#type: self.r#type,
            text: self.text,
            language: self.language,
            image_url: self.image_url,
            image: self.image,
            audio: self.audio,
            input_audio: self.input_audio,
        })
    }
}
