using DexaAiSdk.Core;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[Serializable]
public record ExtractRequest
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

    [JsonPropertyName("temperature")]
    public double? Temperature { get; set; }

    [JsonPropertyName("max_output_tokens")]
    public int? MaxOutputTokens { get; set; }

    [JsonPropertyName("response_format")]
    public ExtractRequestResponseFormat? ResponseFormat { get; set; }

    [JsonPropertyName("target_language")]
    public ExtractRequestTargetLanguage? TargetLanguage { get; set; }

    [JsonPropertyName("output_language")]
    public ExtractRequestOutputLanguage? OutputLanguage { get; set; }

    /// <inheritdoc />
    public override string ToString()
    {
        return JsonUtils.Serialize(this);
    }
}
