using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(AudioInputType.AudioInputTypeSerializer))]
[Serializable]
public readonly record struct AudioInputType : IStringEnum
{
    public static readonly AudioInputType Url = new(Values.Url);

    public static readonly AudioInputType Base64 = new(Values.Base64);

    public AudioInputType(string value)
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
    public static AudioInputType FromCustom(string value)
    {
        return new AudioInputType(value);
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

    public static bool operator ==(AudioInputType value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(AudioInputType value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(AudioInputType value) => value.Value;

    public static explicit operator AudioInputType(string value) => new(value);

    internal class AudioInputTypeSerializer : JsonConverter<AudioInputType>
    {
        public override AudioInputType Read(
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
            return new AudioInputType(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            AudioInputType value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override AudioInputType ReadAsPropertyName(
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
            return new AudioInputType(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            AudioInputType value,
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
        public const string Url = "url";

        public const string Base64 = "base64";
    }
}
