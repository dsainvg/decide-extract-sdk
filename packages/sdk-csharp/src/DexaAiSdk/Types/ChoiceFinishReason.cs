using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(ChoiceFinishReason.ChoiceFinishReasonSerializer))]
[Serializable]
public readonly record struct ChoiceFinishReason : IStringEnum
{
    public static readonly ChoiceFinishReason Stop = new(Values.Stop);

    public static readonly ChoiceFinishReason Length = new(Values.Length);

    public static readonly ChoiceFinishReason ContentFilter = new(Values.ContentFilter);

    public ChoiceFinishReason(string value)
    {
        Value = value;
    }

    /// <summary>
    /// The string value of the enum.
    /// </summary>
    public string Value { get; }

    /// <summary>
    /// Create a string enum with the given value.
    /// </summary>
    public static ChoiceFinishReason FromCustom(string value)
    {
        return new ChoiceFinishReason(value);
    }

    public bool Equals(string? other)
    {
        return Value.Equals(other);
    }

    /// <summary>
    /// Returns the string value of the enum.
    /// </summary>
    public override string ToString()
    {
        return Value;
    }

    public static bool operator ==(ChoiceFinishReason value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(ChoiceFinishReason value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(ChoiceFinishReason value) => value.Value;

    public static explicit operator ChoiceFinishReason(string value) => new(value);

    internal class ChoiceFinishReasonSerializer : JsonConverter<ChoiceFinishReason>
    {
        public override ChoiceFinishReason Read(
            ref Utf8JsonReader reader,
            Type typeToConvert,
            JsonSerializerOptions options
        )
        {
            var stringValue =
                reader.GetString()
                ?? throw new global::System.Exception(
                    "The JSON value could not be read as a string."
                );
            return new ChoiceFinishReason(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            ChoiceFinishReason value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override ChoiceFinishReason ReadAsPropertyName(
            ref Utf8JsonReader reader,
            Type typeToConvert,
            JsonSerializerOptions options
        )
        {
            var stringValue =
                reader.GetString()
                ?? throw new global::System.Exception(
                    "The JSON property name could not be read as a string."
                );
            return new ChoiceFinishReason(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            ChoiceFinishReason value,
            JsonSerializerOptions options
        )
        {
            writer.WritePropertyName(value.Value);
        }
    }

    /// <summary>
    /// Constant strings for enum values
    /// </summary>
    [Serializable]
    public static class Values
    {
        public const string Stop = "stop";

        public const string Length = "length";

        public const string ContentFilter = "content_filter";
    }
}
