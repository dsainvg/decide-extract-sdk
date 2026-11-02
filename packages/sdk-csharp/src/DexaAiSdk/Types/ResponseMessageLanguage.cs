using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(ResponseMessageLanguage.ResponseMessageLanguageSerializer))]
[Serializable]
public readonly record struct ResponseMessageLanguage : IStringEnum
{
    public static readonly ResponseMessageLanguage En = new(Values.En);

    public static readonly ResponseMessageLanguage Es = new(Values.Es);

    public static readonly ResponseMessageLanguage Fr = new(Values.Fr);

    public static readonly ResponseMessageLanguage De = new(Values.De);

    public static readonly ResponseMessageLanguage It = new(Values.It);

    public static readonly ResponseMessageLanguage Pt = new(Values.Pt);

    public static readonly ResponseMessageLanguage Nl = new(Values.Nl);

    public static readonly ResponseMessageLanguage Ru = new(Values.Ru);

    public static readonly ResponseMessageLanguage Ja = new(Values.Ja);

    public static readonly ResponseMessageLanguage Ko = new(Values.Ko);

    public static readonly ResponseMessageLanguage Zh = new(Values.Zh);

    public static readonly ResponseMessageLanguage Ar = new(Values.Ar);

    public static readonly ResponseMessageLanguage Hi = new(Values.Hi);

    public static readonly ResponseMessageLanguage Tr = new(Values.Tr);

    public static readonly ResponseMessageLanguage Pl = new(Values.Pl);

    public static readonly ResponseMessageLanguage Sv = new(Values.Sv);

    public static readonly ResponseMessageLanguage Da = new(Values.Da);

    public static readonly ResponseMessageLanguage No = new(Values.No);

    public static readonly ResponseMessageLanguage Fi = new(Values.Fi);

    public static readonly ResponseMessageLanguage Cs = new(Values.Cs);

    public ResponseMessageLanguage(string value)
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
    public static ResponseMessageLanguage FromCustom(string value)
    {
        return new ResponseMessageLanguage(value);
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

    public static bool operator ==(ResponseMessageLanguage value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(ResponseMessageLanguage value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(ResponseMessageLanguage value) => value.Value;

    public static explicit operator ResponseMessageLanguage(string value) => new(value);

    internal class ResponseMessageLanguageSerializer : JsonConverter<ResponseMessageLanguage>
    {
        public override ResponseMessageLanguage Read(
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
            return new ResponseMessageLanguage(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            ResponseMessageLanguage value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override ResponseMessageLanguage ReadAsPropertyName(
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
            return new ResponseMessageLanguage(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            ResponseMessageLanguage value,
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
