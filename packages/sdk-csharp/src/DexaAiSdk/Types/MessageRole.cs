using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(MessageRole.MessageRoleSerializer))]
[Serializable]
public readonly record struct MessageRole : IStringEnum
{
    public static readonly MessageRole System = new(Values.System);

    public static readonly MessageRole User = new(Values.User);

    public static readonly MessageRole Assistant = new(Values.Assistant);

    public MessageRole(string value)
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
    public static MessageRole FromCustom(string value)
    {
        return new MessageRole(value);
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

    public static bool operator ==(MessageRole value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(MessageRole value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(MessageRole value) => value.Value;

    public static explicit operator MessageRole(string value) => new(value);

    internal class MessageRoleSerializer : JsonConverter<MessageRole>
    {
        public override MessageRole Read(
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
            return new MessageRole(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            MessageRole value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override MessageRole ReadAsPropertyName(
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
            return new MessageRole(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            MessageRole value,
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
        public const string System = "system";

        public const string User = "user";

        public const string Assistant = "assistant";
    }
}
