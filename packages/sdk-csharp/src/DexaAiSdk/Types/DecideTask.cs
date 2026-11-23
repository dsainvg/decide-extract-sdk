using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[Serializable]
public record DecideTask : IJsonOnDeserialized
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

    [JsonPropertyName("question")]
    public required string Question { get; set; }

    /// <summary>
    /// Allowed decision options. Defaults to ['yes', 'no'] for boolean decisions; can specify more than 2 options.
    /// </summary>
    [JsonPropertyName("choices")]
    public IEnumerable<string>? Choices { get; set; }

    /// <summary>
    /// Alias for choices. Defaults to ['yes', 'no'].
    /// </summary>
    [JsonPropertyName("options")]
    public IEnumerable<string>? Options { get; set; }

    [JsonPropertyName("instruction")]
    public string? Instruction { get; set; }

    [JsonPropertyName("target_language")]
    public DecideTaskTargetLanguage? TargetLanguage { get; set; }

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
