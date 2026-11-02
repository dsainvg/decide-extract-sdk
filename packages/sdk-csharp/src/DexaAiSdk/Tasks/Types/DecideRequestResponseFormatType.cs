using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(DecideRequestResponseFormatType.DecideRequestResponseFormatTypeSerializer))]
[Serializable]
public readonly record struct DecideRequestResponseFormatType : IStringEnum
{
    public static readonly DecideRequestResponseFormatType JsonObject = new(Values.JsonObject);

    public DecideRequestResponseFormatType(string value)
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
    public static DecideRequestResponseFormatType FromCustom(string value)
    {
        return new DecideRequestResponseFormatType(value);
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

    public static bool operator ==(DecideRequestResponseFormatType value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(DecideRequestResponseFormatType value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(DecideRequestResponseFormatType value) => value.Value;

    public static explicit operator DecideRequestResponseFormatType(string value) => new(value);

    internal class DecideRequestResponseFormatTypeSerializer
        : JsonConverter<DecideRequestResponseFormatType>
    {
        public override DecideRequestResponseFormatType Read(
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
            return new DecideRequestResponseFormatType(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            DecideRequestResponseFormatType value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override DecideRequestResponseFormatType ReadAsPropertyName(
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
            return new DecideRequestResponseFormatType(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            DecideRequestResponseFormatType value,
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
