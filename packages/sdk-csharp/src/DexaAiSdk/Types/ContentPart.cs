using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[Serializable]
public record ContentPart : IJsonOnDeserialized
{
    [JsonExtensionData]
    private readonly IDictionary<string, JsonElement> _extensionData =
        new Dictionary<string, JsonElement>();

    [JsonPropertyName("type")]
    public ContentPartType? Type { get; set; }

    [JsonPropertyName("text")]
    public string? Text { get; set; }

    [JsonPropertyName("language")]
    public ContentPartLanguage? Language { get; set; }

    [JsonPropertyName("image_url")]
    public ImageUrl? ImageUrl { get; set; }

    [JsonPropertyName("image")]
    public ImageInput? Image { get; set; }

    [JsonPropertyName("audio")]
    public AudioInput? Audio { get; set; }

    [JsonPropertyName("input_audio")]
    public AudioInput? InputAudio { get; set; }

    [JsonIgnore]
    public ReadOnlyAdditionalProperties AdditionalProperties { get; private set; } = new();

    void IJsonOnDeserialized.OnDeserialized() =>
        AdditionalProperties.CopyFromExtensionData(_extensionData);

    /// <inheritdoc />
    public override string ToString()
    {
        return JsonUtils.Serialize(this);
    }
}
