using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(MessageLanguage.MessageLanguageSerializer))]
[Serializable]
public readonly record struct MessageLanguage : IStringEnum
{
    public static readonly MessageLanguage En = new(Values.En);

    public static readonly MessageLanguage Es = new(Values.Es);

    public static readonly MessageLanguage Fr = new(Values.Fr);

    public static readonly MessageLanguage De = new(Values.De);

    public static readonly MessageLanguage It = new(Values.It);

    public static readonly MessageLanguage Pt = new(Values.Pt);

    public static readonly MessageLanguage Nl = new(Values.Nl);

    public static readonly MessageLanguage Ru = new(Values.Ru);

    public static readonly MessageLanguage Ja = new(Values.Ja);

    public static readonly MessageLanguage Ko = new(Values.Ko);

    public static readonly MessageLanguage Zh = new(Values.Zh);

    public static readonly MessageLanguage Ar = new(Values.Ar);

    public static readonly MessageLanguage Hi = new(Values.Hi);

    public static readonly MessageLanguage Tr = new(Values.Tr);

    public static readonly MessageLanguage Pl = new(Values.Pl);

    public static readonly MessageLanguage Sv = new(Values.Sv);

    public static readonly MessageLanguage Da = new(Values.Da);

    public static readonly MessageLanguage No = new(Values.No);

    public static readonly MessageLanguage Fi = new(Values.Fi);

    public static readonly MessageLanguage Cs = new(Values.Cs);

    public MessageLanguage(string value)
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
    public static MessageLanguage FromCustom(string value)
    {
        return new MessageLanguage(value);
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

    public static bool operator ==(MessageLanguage value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(MessageLanguage value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(MessageLanguage value) => value.Value;

    public static explicit operator MessageLanguage(string value) => new(value);

    internal class MessageLanguageSerializer : JsonConverter<MessageLanguage>
    {
        public override MessageLanguage Read(
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
            return new MessageLanguage(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            MessageLanguage value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override MessageLanguage ReadAsPropertyName(
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
            return new MessageLanguage(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            MessageLanguage value,
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
        public const string En = "en";

        public const string Es = "es";

        public const string Fr = "fr";

        public const string De = "de";

        public const string It = "it";

        public const string Pt = "pt";

        public const string Nl = "nl";

        public const string Ru = "ru";

        public const string Ja = "ja";

        public const string Ko = "ko";

        public const string Zh = "zh";

        public const string Ar = "ar";

        public const string Hi = "hi";

        public const string Tr = "tr";

        public const string Pl = "pl";

        public const string Sv = "sv";

        public const string Da = "da";

        public const string No = "no";

        public const string Fi = "fi";

        public const string Cs = "cs";
    }
}
