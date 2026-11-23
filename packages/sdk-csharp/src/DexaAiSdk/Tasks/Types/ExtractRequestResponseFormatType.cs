using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(ExtractRequestResponseFormatType.ExtractRequestResponseFormatTypeSerializer))]
[Serializable]
public readonly record struct ExtractRequestResponseFormatType : IStringEnum
{
    public static readonly ExtractRequestResponseFormatType JsonObject = new(Values.JsonObject);

    public ExtractRequestResponseFormatType(string value)
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
    public static ExtractRequestResponseFormatType FromCustom(string value)
    {
        return new ExtractRequestResponseFormatType(value);
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

    public static bool operator ==(ExtractRequestResponseFormatType value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(ExtractRequestResponseFormatType value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(ExtractRequestResponseFormatType value) => value.Value;

    public static explicit operator ExtractRequestResponseFormatType(string value) => new(value);

    internal class ExtractRequestResponseFormatTypeSerializer
        : JsonConverter<ExtractRequestResponseFormatType>
    {
        public override ExtractRequestResponseFormatType Read(
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
            return new ExtractRequestResponseFormatType(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            ExtractRequestResponseFormatType value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override ExtractRequestResponseFormatType ReadAsPropertyName(
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
            return new ExtractRequestResponseFormatType(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            ExtractRequestResponseFormatType value,
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
        public const string JsonObject = "json_object";
    }
}
