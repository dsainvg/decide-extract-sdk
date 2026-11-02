using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(ContentPartType.ContentPartTypeSerializer))]
[Serializable]
public readonly record struct ContentPartType : IStringEnum
{
    public static readonly ContentPartType Text = new(Values.Text);

    public static readonly ContentPartType ImageUrl = new(Values.ImageUrl);

    public static readonly ContentPartType Image = new(Values.Image);

    public static readonly ContentPartType Audio = new(Values.Audio);

    public static readonly ContentPartType InputAudio = new(Values.InputAudio);

    public ContentPartType(string value)
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
    public static ContentPartType FromCustom(string value)
    {
        return new ContentPartType(value);
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

    public static bool operator ==(ContentPartType value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(ContentPartType value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(ContentPartType value) => value.Value;

    public static explicit operator ContentPartType(string value) => new(value);

    internal class ContentPartTypeSerializer : JsonConverter<ContentPartType>
    {
        public override ContentPartType Read(
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
            return new ContentPartType(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            ContentPartType value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override ContentPartType ReadAsPropertyName(
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
            return new ContentPartType(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            ContentPartType value,
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
        public const string Text = "text";

        public const string ImageUrl = "image_url";

        public const string Image = "image";

        public const string Audio = "audio";

        public const string InputAudio = "input_audio";
    }
}
