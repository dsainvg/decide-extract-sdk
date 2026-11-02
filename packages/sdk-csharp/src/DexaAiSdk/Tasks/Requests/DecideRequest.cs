using DexaAiSdk.Core;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[Serializable]
public record DecideRequest
{
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

    [JsonPropertyName("question")]
    public required string Question { get; set; }

    /// <summary>
    /// Options to decide between. Defaults to ['yes', 'no'] for boolean decisions; can specify more than 2 options.
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

    [JsonPropertyName("temperature")]
    public double? Temperature { get; set; }

    [JsonPropertyName("max_output_tokens")]
    public int? MaxOutputTokens { get; set; }

    [JsonPropertyName("response_format")]
    public DecideRequestResponseFormat? ResponseFormat { get; set; }

    [JsonPropertyName("target_language")]
    public DecideRequestTargetLanguage? TargetLanguage { get; set; }

    [JsonPropertyName("output_language")]
    public DecideRequestOutputLanguage? OutputLanguage { get; set; }

    /// <inheritdoc />
    public override string ToString()
    {
        return JsonUtils.Serialize(this);
    }
}
