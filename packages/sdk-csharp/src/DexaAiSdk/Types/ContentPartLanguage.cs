using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(ContentPartLanguage.ContentPartLanguageSerializer))]
[Serializable]
public readonly record struct ContentPartLanguage : IStringEnum
{
    public static readonly ContentPartLanguage En = new(Values.En);

    public static readonly ContentPartLanguage Es = new(Values.Es);

    public static readonly ContentPartLanguage Fr = new(Values.Fr);

    public static readonly ContentPartLanguage De = new(Values.De);

    public static readonly ContentPartLanguage It = new(Values.It);

    public static readonly ContentPartLanguage Pt = new(Values.Pt);

    public static readonly ContentPartLanguage Nl = new(Values.Nl);

    public static readonly ContentPartLanguage Ru = new(Values.Ru);

    public static readonly ContentPartLanguage Ja = new(Values.Ja);

    public static readonly ContentPartLanguage Ko = new(Values.Ko);

    public static readonly ContentPartLanguage Zh = new(Values.Zh);

    public static readonly ContentPartLanguage Ar = new(Values.Ar);

    public static readonly ContentPartLanguage Hi = new(Values.Hi);

    public static readonly ContentPartLanguage Tr = new(Values.Tr);

    public static readonly ContentPartLanguage Pl = new(Values.Pl);

    public static readonly ContentPartLanguage Sv = new(Values.Sv);

    public static readonly ContentPartLanguage Da = new(Values.Da);

    public static readonly ContentPartLanguage No = new(Values.No);

    public static readonly ContentPartLanguage Fi = new(Values.Fi);

    public static readonly ContentPartLanguage Cs = new(Values.Cs);

    public ContentPartLanguage(string value)
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
    public static ContentPartLanguage FromCustom(string value)
    {
        return new ContentPartLanguage(value);
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

    public static bool operator ==(ContentPartLanguage value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(ContentPartLanguage value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(ContentPartLanguage value) => value.Value;

    public static explicit operator ContentPartLanguage(string value) => new(value);

    internal class ContentPartLanguageSerializer : JsonConverter<ContentPartLanguage>
    {
        public override ContentPartLanguage Read(
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
            return new ContentPartLanguage(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            ContentPartLanguage value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override ContentPartLanguage ReadAsPropertyName(
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
            return new ContentPartLanguage(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            ContentPartLanguage value,
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
