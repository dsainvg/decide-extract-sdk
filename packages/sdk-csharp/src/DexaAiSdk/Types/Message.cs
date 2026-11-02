using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;
using OneOf;

namespace DexaAiSdk;

[Serializable]
public record Message : IJsonOnDeserialized
{
    [JsonExtensionData]
    private readonly IDictionary<string, JsonElement> _extensionData =
        new Dictionary<string, JsonElement>();

    [JsonPropertyName("role")]
    public required MessageRole Role { get; set; }

    [JsonPropertyName("content")]
    public required OneOf<string, IEnumerable<ContentPart>> Content { get; set; }

    [JsonPropertyName("language")]
    public MessageLanguage? Language { get; set; }

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
