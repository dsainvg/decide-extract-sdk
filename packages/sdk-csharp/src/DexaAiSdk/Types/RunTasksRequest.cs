using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[Serializable]
public record RunTasksRequest : IJsonOnDeserialized
{
    [JsonExtensionData]
    private readonly IDictionary<string, JsonElement> _extensionData =
        new Dictionary<string, JsonElement>();

    [JsonPropertyName("model")]
    public required string Model { get; set; }

    [JsonPropertyName("context")]
    public string? Context { get; set; }

    [JsonPropertyName("messages")]
    public IEnumerable<Message>? Messages { get; set; }

    [JsonPropertyName("images")]
    public IEnumerable<ImageInput>? Images { get; set; }

    [JsonPropertyName("audio")]
    public IEnumerable<AudioInput>? Audio { get; set; }

    [JsonPropertyName("tasks")]
    public IEnumerable<Task> Tasks { get; set; } = new List<Task>();

    [JsonPropertyName("temperature")]
    public double? Temperature { get; set; }

    [JsonPropertyName("max_output_tokens")]
    public int? MaxOutputTokens { get; set; }

    [JsonPropertyName("response_format")]
    public RunTasksRequestResponseFormat? ResponseFormat { get; set; }

    /// <summary>
    /// Preferred output language for results
    /// </summary>
    [JsonPropertyName("target_language")]
    public RunTasksRequestTargetLanguage? TargetLanguage { get; set; }

    /// <summary>
    /// Alias for target_language
    /// </summary>
    [JsonPropertyName("output_language")]
    public RunTasksRequestOutputLanguage? OutputLanguage { get; set; }

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
