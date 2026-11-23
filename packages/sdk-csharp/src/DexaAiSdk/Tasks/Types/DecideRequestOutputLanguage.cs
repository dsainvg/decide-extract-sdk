using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(DecideRequestOutputLanguage.DecideRequestOutputLanguageSerializer))]
[Serializable]
public readonly record struct DecideRequestOutputLanguage : IStringEnum
{
    public static readonly DecideRequestOutputLanguage En = new(Values.En);

    public static readonly DecideRequestOutputLanguage Es = new(Values.Es);

    public static readonly DecideRequestOutputLanguage Fr = new(Values.Fr);

    public static readonly DecideRequestOutputLanguage De = new(Values.De);

    public static readonly DecideRequestOutputLanguage It = new(Values.It);

    public static readonly DecideRequestOutputLanguage Pt = new(Values.Pt);

    public static readonly DecideRequestOutputLanguage Nl = new(Values.Nl);

    public static readonly DecideRequestOutputLanguage Ru = new(Values.Ru);

    public static readonly DecideRequestOutputLanguage Ja = new(Values.Ja);

    public static readonly DecideRequestOutputLanguage Ko = new(Values.Ko);

    public static readonly DecideRequestOutputLanguage Zh = new(Values.Zh);

    public static readonly DecideRequestOutputLanguage Ar = new(Values.Ar);

    public static readonly DecideRequestOutputLanguage Hi = new(Values.Hi);

    public static readonly DecideRequestOutputLanguage Tr = new(Values.Tr);

    public static readonly DecideRequestOutputLanguage Pl = new(Values.Pl);

    public static readonly DecideRequestOutputLanguage Sv = new(Values.Sv);

    public static readonly DecideRequestOutputLanguage Da = new(Values.Da);

    public static readonly DecideRequestOutputLanguage No = new(Values.No);

    public static readonly DecideRequestOutputLanguage Fi = new(Values.Fi);

    public static readonly DecideRequestOutputLanguage Cs = new(Values.Cs);

    public DecideRequestOutputLanguage(string value)
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
    public static DecideRequestOutputLanguage FromCustom(string value)
    {
        return new DecideRequestOutputLanguage(value);
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

    public static bool operator ==(DecideRequestOutputLanguage value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(DecideRequestOutputLanguage value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(DecideRequestOutputLanguage value) => value.Value;

    public static explicit operator DecideRequestOutputLanguage(string value) => new(value);

    internal class DecideRequestOutputLanguageSerializer
        : JsonConverter<DecideRequestOutputLanguage>
    {
        public override DecideRequestOutputLanguage Read(
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
            return new DecideRequestOutputLanguage(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            DecideRequestOutputLanguage value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override DecideRequestOutputLanguage ReadAsPropertyName(
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
            return new DecideRequestOutputLanguage(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            DecideRequestOutputLanguage value,
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
