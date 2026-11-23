using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(ExtractRequestTargetLanguage.ExtractRequestTargetLanguageSerializer))]
[Serializable]
public readonly record struct ExtractRequestTargetLanguage : IStringEnum
{
    public static readonly ExtractRequestTargetLanguage En = new(Values.En);

    public static readonly ExtractRequestTargetLanguage Es = new(Values.Es);

    public static readonly ExtractRequestTargetLanguage Fr = new(Values.Fr);

    public static readonly ExtractRequestTargetLanguage De = new(Values.De);

    public static readonly ExtractRequestTargetLanguage It = new(Values.It);

    public static readonly ExtractRequestTargetLanguage Pt = new(Values.Pt);

    public static readonly ExtractRequestTargetLanguage Nl = new(Values.Nl);

    public static readonly ExtractRequestTargetLanguage Ru = new(Values.Ru);

    public static readonly ExtractRequestTargetLanguage Ja = new(Values.Ja);

    public static readonly ExtractRequestTargetLanguage Ko = new(Values.Ko);

    public static readonly ExtractRequestTargetLanguage Zh = new(Values.Zh);

    public static readonly ExtractRequestTargetLanguage Ar = new(Values.Ar);

    public static readonly ExtractRequestTargetLanguage Hi = new(Values.Hi);

    public static readonly ExtractRequestTargetLanguage Tr = new(Values.Tr);

    public static readonly ExtractRequestTargetLanguage Pl = new(Values.Pl);

    public static readonly ExtractRequestTargetLanguage Sv = new(Values.Sv);

    public static readonly ExtractRequestTargetLanguage Da = new(Values.Da);

    public static readonly ExtractRequestTargetLanguage No = new(Values.No);

    public static readonly ExtractRequestTargetLanguage Fi = new(Values.Fi);

    public static readonly ExtractRequestTargetLanguage Cs = new(Values.Cs);

    public ExtractRequestTargetLanguage(string value)
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
    public static ExtractRequestTargetLanguage FromCustom(string value)
    {
        return new ExtractRequestTargetLanguage(value);
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

    public static bool operator ==(ExtractRequestTargetLanguage value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(ExtractRequestTargetLanguage value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(ExtractRequestTargetLanguage value) => value.Value;

    public static explicit operator ExtractRequestTargetLanguage(string value) => new(value);

    internal class ExtractRequestTargetLanguageSerializer
        : JsonConverter<ExtractRequestTargetLanguage>
    {
        public override ExtractRequestTargetLanguage Read(
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
            return new ExtractRequestTargetLanguage(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            ExtractRequestTargetLanguage value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override ExtractRequestTargetLanguage ReadAsPropertyName(
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
            return new ExtractRequestTargetLanguage(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            ExtractRequestTargetLanguage value,
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
