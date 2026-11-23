using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(RunTasksRequestTargetLanguage.RunTasksRequestTargetLanguageSerializer))]
[Serializable]
public readonly record struct RunTasksRequestTargetLanguage : IStringEnum
{
    public static readonly RunTasksRequestTargetLanguage En = new(Values.En);

    public static readonly RunTasksRequestTargetLanguage Es = new(Values.Es);

    public static readonly RunTasksRequestTargetLanguage Fr = new(Values.Fr);

    public static readonly RunTasksRequestTargetLanguage De = new(Values.De);

    public static readonly RunTasksRequestTargetLanguage It = new(Values.It);

    public static readonly RunTasksRequestTargetLanguage Pt = new(Values.Pt);

    public static readonly RunTasksRequestTargetLanguage Nl = new(Values.Nl);

    public static readonly RunTasksRequestTargetLanguage Ru = new(Values.Ru);

    public static readonly RunTasksRequestTargetLanguage Ja = new(Values.Ja);

    public static readonly RunTasksRequestTargetLanguage Ko = new(Values.Ko);

    public static readonly RunTasksRequestTargetLanguage Zh = new(Values.Zh);

    public static readonly RunTasksRequestTargetLanguage Ar = new(Values.Ar);

    public static readonly RunTasksRequestTargetLanguage Hi = new(Values.Hi);

    public static readonly RunTasksRequestTargetLanguage Tr = new(Values.Tr);

    public static readonly RunTasksRequestTargetLanguage Pl = new(Values.Pl);

    public static readonly RunTasksRequestTargetLanguage Sv = new(Values.Sv);

    public static readonly RunTasksRequestTargetLanguage Da = new(Values.Da);

    public static readonly RunTasksRequestTargetLanguage No = new(Values.No);

    public static readonly RunTasksRequestTargetLanguage Fi = new(Values.Fi);

    public static readonly RunTasksRequestTargetLanguage Cs = new(Values.Cs);

    public RunTasksRequestTargetLanguage(string value)
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
    public static RunTasksRequestTargetLanguage FromCustom(string value)
    {
        return new RunTasksRequestTargetLanguage(value);
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

    public static bool operator ==(RunTasksRequestTargetLanguage value1, string value2) =>
        value1.Value.Equals(value2);

    public static bool operator !=(RunTasksRequestTargetLanguage value1, string value2) =>
        !value1.Value.Equals(value2);

    public static explicit operator string(RunTasksRequestTargetLanguage value) => value.Value;

    public static explicit operator RunTasksRequestTargetLanguage(string value) => new(value);

    internal class RunTasksRequestTargetLanguageSerializer
        : JsonConverter<RunTasksRequestTargetLanguage>
    {
        public override RunTasksRequestTargetLanguage Read(
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
            return new RunTasksRequestTargetLanguage(stringValue);
        }

        public override void Write(
            Utf8JsonWriter writer,
            RunTasksRequestTargetLanguage value,
            JsonSerializerOptions options
        )
        {
            writer.WriteStringValue(value.Value);
        }

        public override RunTasksRequestTargetLanguage ReadAsPropertyName(
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
            return new RunTasksRequestTargetLanguage(stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            RunTasksRequestTargetLanguage value,
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
