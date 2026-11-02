using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[Serializable]
public record RunTasksResponse : IJsonOnDeserialized
{
    [JsonExtensionData]
    private readonly IDictionary<string, JsonElement> _extensionData =
        new Dictionary<string, JsonElement>();

    [JsonPropertyName("id")]
    public required string Id { get; set; }

    [JsonPropertyName("model")]
    public required string Model { get; set; }

    [JsonPropertyName("choices")]
    public IEnumerable<Choice> Choices { get; set; } = new List<Choice>();

    [JsonPropertyName("results")]
    public Dictionary<string, object?> Results { get; set; } = new Dictionary<string, object?>();

    /// <summary>
    /// Backward-compatible alias for results
    /// </summary>
    [JsonPropertyName("tasks")]
    public Dictionary<string, object?>? Tasks { get; set; }

    [JsonPropertyName("usage")]
    public required Usage Usage { get; set; }

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
