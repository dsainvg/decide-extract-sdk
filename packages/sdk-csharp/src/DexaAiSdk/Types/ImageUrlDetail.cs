using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(ImageUrlDetail.ImageUrlDetailSerializer))]
[Serializable]
public readonly record struct ImageUrlDetail : IStringEnum
{
    public static readonly ImageUrlDetail Low = new(Values.Low);

    public static readonly ImageUrlDetail High = new(Values.High);

    public static readonly ImageUrlDetail Auto = new(Values.Auto);

    public ImageUrlDetail(string value)
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
    public static ImageUrlDetail FromCustom(string value)
    {
        return new ImageUrlDetail(value);
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

    public static bool operator ==(ImageUrlDetail value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(ImageUrlDetail value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(ImageUrlDetail value) => value.Value;

    public static explicit operator ImageUrlDetail(string value) => new(value);

    internal class ImageUrlDetailSerializer : JsonConverter<ImageUrlDetail>
    {
        public override ImageUrlDetail Read(
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
            return new ImageUrlDetail(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            ImageUrlDetail value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override ImageUrlDetail ReadAsPropertyName(
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
            return new ImageUrlDetail(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            ImageUrlDetail value,
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
        public const string Low = "low";

        public const string High = "high";

        public const string Auto = "auto";
    }
}
