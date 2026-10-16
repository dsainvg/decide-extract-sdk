using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(ExtractTaskTargetLanguage.ExtractTaskTargetLanguageSerializer))]
[Serializable]
public readonly record struct ExtractTaskTargetLanguage : IStringEnum
{
    public static readonly ExtractTaskTargetLanguage En = new(Values.En);

    public static readonly ExtractTaskTargetLanguage Es = new(Values.Es);

    public static readonly ExtractTaskTargetLanguage Fr = new(Values.Fr);

    public static readonly ExtractTaskTargetLanguage De = new(Values.De);

    public static readonly ExtractTaskTargetLanguage It = new(Values.It);

    public static readonly ExtractTaskTargetLanguage Pt = new(Values.Pt);

    public static readonly ExtractTaskTargetLanguage Nl = new(Values.Nl);

    public static readonly ExtractTaskTargetLanguage Ru = new(Values.Ru);

    public static readonly ExtractTaskTargetLanguage Ja = new(Values.Ja);

    public static readonly ExtractTaskTargetLanguage Ko = new(Values.Ko);

    public static readonly ExtractTaskTargetLanguage Zh = new(Values.Zh);

    public static readonly ExtractTaskTargetLanguage Ar = new(Values.Ar);

    public static readonly ExtractTaskTargetLanguage Hi = new(Values.Hi);

    public static readonly ExtractTaskTargetLanguage Tr = new(Values.Tr);

    public static readonly ExtractTaskTargetLanguage Pl = new(Values.Pl);

    public static readonly ExtractTaskTargetLanguage Sv = new(Values.Sv);

    public static readonly ExtractTaskTargetLanguage Da = new(Values.Da);

    public static readonly ExtractTaskTargetLanguage No = new(Values.No);

    public static readonly ExtractTaskTargetLanguage Fi = new(Values.Fi);

    public static readonly ExtractTaskTargetLanguage Cs = new(Values.Cs);

    public ExtractTaskTargetLanguage(string value)
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
    public static ExtractTaskTargetLanguage FromCustom(string value)
    {
        return new ExtractTaskTargetLanguage(value);
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

    public static bool operator ==(ExtractTaskTargetLanguage value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(ExtractTaskTargetLanguage value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(ExtractTaskTargetLanguage value) => value.Value;

    public static explicit operator ExtractTaskTargetLanguage(string value) => new(value);

    internal class ExtractTaskTargetLanguageSerializer : JsonConverter<ExtractTaskTargetLanguage>
    {
        public override ExtractTaskTargetLanguage Read(
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
            return new ExtractTaskTargetLanguage(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            ExtractTaskTargetLanguage value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override ExtractTaskTargetLanguage ReadAsPropertyName(
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
            return new ExtractTaskTargetLanguage(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            ExtractTaskTargetLanguage value,
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
