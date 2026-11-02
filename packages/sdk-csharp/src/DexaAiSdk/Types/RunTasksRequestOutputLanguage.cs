using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(RunTasksRequestOutputLanguage.RunTasksRequestOutputLanguageSerializer))]
[Serializable]
public readonly record struct RunTasksRequestOutputLanguage : IStringEnum
{
    public static readonly RunTasksRequestOutputLanguage En = new(Values.En);

    public static readonly RunTasksRequestOutputLanguage Es = new(Values.Es);

    public static readonly RunTasksRequestOutputLanguage Fr = new(Values.Fr);

    public static readonly RunTasksRequestOutputLanguage De = new(Values.De);

    public static readonly RunTasksRequestOutputLanguage It = new(Values.It);

    public static readonly RunTasksRequestOutputLanguage Pt = new(Values.Pt);

    public static readonly RunTasksRequestOutputLanguage Nl = new(Values.Nl);

    public static readonly RunTasksRequestOutputLanguage Ru = new(Values.Ru);

    public static readonly RunTasksRequestOutputLanguage Ja = new(Values.Ja);

    public static readonly RunTasksRequestOutputLanguage Ko = new(Values.Ko);

    public static readonly RunTasksRequestOutputLanguage Zh = new(Values.Zh);

    public static readonly RunTasksRequestOutputLanguage Ar = new(Values.Ar);

    public static readonly RunTasksRequestOutputLanguage Hi = new(Values.Hi);

    public static readonly RunTasksRequestOutputLanguage Tr = new(Values.Tr);

    public static readonly RunTasksRequestOutputLanguage Pl = new(Values.Pl);

    public static readonly RunTasksRequestOutputLanguage Sv = new(Values.Sv);

    public static readonly RunTasksRequestOutputLanguage Da = new(Values.Da);

    public static readonly RunTasksRequestOutputLanguage No = new(Values.No);

    public static readonly RunTasksRequestOutputLanguage Fi = new(Values.Fi);

    public static readonly RunTasksRequestOutputLanguage Cs = new(Values.Cs);

    public RunTasksRequestOutputLanguage(string value)
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
    public static RunTasksRequestOutputLanguage FromCustom(string value)
    {
        return new RunTasksRequestOutputLanguage(value);
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

    public static bool operator ==(RunTasksRequestOutputLanguage value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(RunTasksRequestOutputLanguage value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(RunTasksRequestOutputLanguage value) => value.Value;

    public static explicit operator RunTasksRequestOutputLanguage(string value) => new(value);

    internal class RunTasksRequestOutputLanguageSerializer
        : JsonConverter<RunTasksRequestOutputLanguage>
    {
        public override RunTasksRequestOutputLanguage Read(
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
            return new RunTasksRequestOutputLanguage(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            RunTasksRequestOutputLanguage value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override RunTasksRequestOutputLanguage ReadAsPropertyName(
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
            return new RunTasksRequestOutputLanguage(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            RunTasksRequestOutputLanguage value,
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
