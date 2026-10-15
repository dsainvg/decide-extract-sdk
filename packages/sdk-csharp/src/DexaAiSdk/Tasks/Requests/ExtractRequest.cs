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

    [JsonPropertyName("instruction")]
    public required string Instruction { get; set; }

    [JsonPropertyName("fields")]
    public IEnumerable<string>? Fields { get; set; }

    [JsonPropertyName("keys")]
    public IEnumerable<string>? Keys { get; set; }

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
