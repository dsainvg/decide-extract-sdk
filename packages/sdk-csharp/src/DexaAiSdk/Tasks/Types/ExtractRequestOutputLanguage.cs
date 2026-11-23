using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(ExtractRequestOutputLanguage.ExtractRequestOutputLanguageSerializer))]
[Serializable]
public readonly record struct ExtractRequestOutputLanguage : IStringEnum
{
    public static readonly ExtractRequestOutputLanguage En = new(Values.En);

    public static readonly ExtractRequestOutputLanguage Es = new(Values.Es);

    public static readonly ExtractRequestOutputLanguage Fr = new(Values.Fr);

    public static readonly ExtractRequestOutputLanguage De = new(Values.De);

    public static readonly ExtractRequestOutputLanguage It = new(Values.It);

    public static readonly ExtractRequestOutputLanguage Pt = new(Values.Pt);

    public static readonly ExtractRequestOutputLanguage Nl = new(Values.Nl);

    public static readonly ExtractRequestOutputLanguage Ru = new(Values.Ru);

    public static readonly ExtractRequestOutputLanguage Ja = new(Values.Ja);

    public static readonly ExtractRequestOutputLanguage Ko = new(Values.Ko);

    public static readonly ExtractRequestOutputLanguage Zh = new(Values.Zh);

    public static readonly ExtractRequestOutputLanguage Ar = new(Values.Ar);

    public static readonly ExtractRequestOutputLanguage Hi = new(Values.Hi);

    public static readonly ExtractRequestOutputLanguage Tr = new(Values.Tr);

    public static readonly ExtractRequestOutputLanguage Pl = new(Values.Pl);

    public static readonly ExtractRequestOutputLanguage Sv = new(Values.Sv);

    public static readonly ExtractRequestOutputLanguage Da = new(Values.Da);

    public static readonly ExtractRequestOutputLanguage No = new(Values.No);

    public static readonly ExtractRequestOutputLanguage Fi = new(Values.Fi);

    public static readonly ExtractRequestOutputLanguage Cs = new(Values.Cs);

    public ExtractRequestOutputLanguage(string value)
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
    public static ExtractRequestOutputLanguage FromCustom(string value)
    {
        return new ExtractRequestOutputLanguage(value);
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

    public static bool operator ==(ExtractRequestOutputLanguage value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(ExtractRequestOutputLanguage value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(ExtractRequestOutputLanguage value) => value.Value;

    public static explicit operator ExtractRequestOutputLanguage(string value) => new(value);

    internal class ExtractRequestOutputLanguageSerializer
        : JsonConverter<ExtractRequestOutputLanguage>
    {
        public override ExtractRequestOutputLanguage Read(
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
            return new ExtractRequestOutputLanguage(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            ExtractRequestOutputLanguage value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override ExtractRequestOutputLanguage ReadAsPropertyName(
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
            return new ExtractRequestOutputLanguage(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            ExtractRequestOutputLanguage value,
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
