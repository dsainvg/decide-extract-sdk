using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(ResponseMessageRole.ResponseMessageRoleSerializer))]
[Serializable]
public readonly record struct ResponseMessageRole : IStringEnum
{
    public static readonly ResponseMessageRole Assistant = new(Values.Assistant);

    public ResponseMessageRole(string value)
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
    public static ResponseMessageRole FromCustom(string value)
    {
        return new ResponseMessageRole(value);
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

    public static bool operator ==(ResponseMessageRole value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(ResponseMessageRole value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(ResponseMessageRole value) => value.Value;

    public static explicit operator ResponseMessageRole(string value) => new(value);

    internal class ResponseMessageRoleSerializer : JsonConverter<ResponseMessageRole>
    {
        public override ResponseMessageRole Read(
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
            return new ResponseMessageRole(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            ResponseMessageRole value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override ResponseMessageRole ReadAsPropertyName(
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
            return new ResponseMessageRole(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            ResponseMessageRole value,
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
        public const string Assistant = "assistant";
    }
}
