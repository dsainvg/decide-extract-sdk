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

    /// <summary>
    /// Unique task name used as key in results. Has no effect on LLM inference.
    /// </summary>
    [JsonPropertyName("name")]
    public required string Name { get; set; }

    [JsonPropertyName("id")]
    public string? Id { get; set; }

    /// <summary>
    /// Question or extraction prompt
    /// </summary>
    [JsonPropertyName("question")]
    public required string Question { get; set; }

    /// <summary>
    /// Backward-compatible alias for question
    /// </summary>
    [JsonPropertyName("instruction")]
    public string? Instruction { get; set; }

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
