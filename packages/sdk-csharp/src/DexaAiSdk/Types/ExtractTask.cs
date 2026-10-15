using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[Serializable]
public record ExtractTask : IJsonOnDeserialized
{
    [JsonExtensionData]
    private readonly IDictionary<string, JsonElement> _extensionData =
        new Dictionary<string, JsonElement>();

    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("id")]
    public string? Id { get; set; }

    [JsonPropertyName("instruction")]
    public required string Instruction { get; set; }

    [JsonPropertyName("fields")]
    public IEnumerable<string>? Fields { get; set; }

    [JsonPropertyName("keys")]
    public IEnumerable<string>? Keys { get; set; }

    [JsonPropertyName("schema")]
    public Dictionary<string, object?>? Schema { get; set; }

    [JsonPropertyName("target_language")]
    public ExtractTaskTargetLanguage? TargetLanguage { get; set; }

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
