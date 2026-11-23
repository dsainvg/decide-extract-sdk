using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(DecideRequestTargetLanguage.DecideRequestTargetLanguageSerializer))]
[Serializable]
public readonly record struct DecideRequestTargetLanguage : IStringEnum
{
    public static readonly DecideRequestTargetLanguage En = new(Values.En);

    public static readonly DecideRequestTargetLanguage Es = new(Values.Es);

    public static readonly DecideRequestTargetLanguage Fr = new(Values.Fr);

    public static readonly DecideRequestTargetLanguage De = new(Values.De);

    public static readonly DecideRequestTargetLanguage It = new(Values.It);

    public static readonly DecideRequestTargetLanguage Pt = new(Values.Pt);

    public static readonly DecideRequestTargetLanguage Nl = new(Values.Nl);

    public static readonly DecideRequestTargetLanguage Ru = new(Values.Ru);

    public static readonly DecideRequestTargetLanguage Ja = new(Values.Ja);

    public static readonly DecideRequestTargetLanguage Ko = new(Values.Ko);

    public static readonly DecideRequestTargetLanguage Zh = new(Values.Zh);

    public static readonly DecideRequestTargetLanguage Ar = new(Values.Ar);

    public static readonly DecideRequestTargetLanguage Hi = new(Values.Hi);

    public static readonly DecideRequestTargetLanguage Tr = new(Values.Tr);

    public static readonly DecideRequestTargetLanguage Pl = new(Values.Pl);

    public static readonly DecideRequestTargetLanguage Sv = new(Values.Sv);

    public static readonly DecideRequestTargetLanguage Da = new(Values.Da);

    public static readonly DecideRequestTargetLanguage No = new(Values.No);

    public static readonly DecideRequestTargetLanguage Fi = new(Values.Fi);

    public static readonly DecideRequestTargetLanguage Cs = new(Values.Cs);

    public DecideRequestTargetLanguage(string value)
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
    public static DecideRequestTargetLanguage FromCustom(string value)
    {
        return new DecideRequestTargetLanguage(value);
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

    public static bool operator ==(DecideRequestTargetLanguage value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(DecideRequestTargetLanguage value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(DecideRequestTargetLanguage value) => value.Value;

    public static explicit operator DecideRequestTargetLanguage(string value) => new(value);

    internal class DecideRequestTargetLanguageSerializer
        : JsonConverter<DecideRequestTargetLanguage>
    {
        public override DecideRequestTargetLanguage Read(
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
            return new DecideRequestTargetLanguage(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            DecideRequestTargetLanguage value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override DecideRequestTargetLanguage ReadAsPropertyName(
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
            return new DecideRequestTargetLanguage(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            DecideRequestTargetLanguage value,
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
