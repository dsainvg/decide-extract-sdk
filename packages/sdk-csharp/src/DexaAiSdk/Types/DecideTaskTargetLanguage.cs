using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(DecideTaskTargetLanguage.DecideTaskTargetLanguageSerializer))]
[Serializable]
public readonly record struct DecideTaskTargetLanguage : IStringEnum
{
    public static readonly DecideTaskTargetLanguage En = new(Values.En);

    public static readonly DecideTaskTargetLanguage Es = new(Values.Es);

    public static readonly DecideTaskTargetLanguage Fr = new(Values.Fr);

    public static readonly DecideTaskTargetLanguage De = new(Values.De);

    public static readonly DecideTaskTargetLanguage It = new(Values.It);

    public static readonly DecideTaskTargetLanguage Pt = new(Values.Pt);

    public static readonly DecideTaskTargetLanguage Nl = new(Values.Nl);

    public static readonly DecideTaskTargetLanguage Ru = new(Values.Ru);

    public static readonly DecideTaskTargetLanguage Ja = new(Values.Ja);

    public static readonly DecideTaskTargetLanguage Ko = new(Values.Ko);

    public static readonly DecideTaskTargetLanguage Zh = new(Values.Zh);

    public static readonly DecideTaskTargetLanguage Ar = new(Values.Ar);

    public static readonly DecideTaskTargetLanguage Hi = new(Values.Hi);

    public static readonly DecideTaskTargetLanguage Tr = new(Values.Tr);

    public static readonly DecideTaskTargetLanguage Pl = new(Values.Pl);

    public static readonly DecideTaskTargetLanguage Sv = new(Values.Sv);

    public static readonly DecideTaskTargetLanguage Da = new(Values.Da);

    public static readonly DecideTaskTargetLanguage No = new(Values.No);

    public static readonly DecideTaskTargetLanguage Fi = new(Values.Fi);

    public static readonly DecideTaskTargetLanguage Cs = new(Values.Cs);

    public DecideTaskTargetLanguage(string value)
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
    public static DecideTaskTargetLanguage FromCustom(string value)
    {
        return new DecideTaskTargetLanguage(value);
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

    public static bool operator ==(DecideTaskTargetLanguage value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(DecideTaskTargetLanguage value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(DecideTaskTargetLanguage value) => value.Value;

    public static explicit operator DecideTaskTargetLanguage(string value) => new(value);

    internal class DecideTaskTargetLanguageSerializer : JsonConverter<DecideTaskTargetLanguage>
    {
        public override DecideTaskTargetLanguage Read(
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
            return new DecideTaskTargetLanguage(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            DecideTaskTargetLanguage value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override DecideTaskTargetLanguage ReadAsPropertyName(
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
            return new DecideTaskTargetLanguage(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            DecideTaskTargetLanguage value,
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
