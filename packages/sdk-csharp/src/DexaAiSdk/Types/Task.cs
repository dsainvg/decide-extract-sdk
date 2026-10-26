// ReSharper disable NullableWarningSuppressionIsUsed
// ReSharper disable InconsistentNaming

using DexaAiSdk.Core;
using global::System.Text.Json;
using global::System.Text.Json.Nodes;
using global::System.Text.Json.Serialization;

namespace DexaAiSdk;

[JsonConverter(typeof(Task.JsonConverter))]
[Serializable]
public record Task
{
    internal Task(string type, object? value)
    {
        Type = type;
        Value = value;
    }

    /// <summary>
    /// Create an instance of Task with <see cref="Task.Decide"/>.
    /// </summary>
    public Task(Task.Decide value)
    {
        Type = "decide";
        Value = value.Value;
    }

    /// <summary>
    /// Create an instance of Task with <see cref="Task.Extract"/>.
    /// </summary>
    public Task(Task.Extract value)
    {
        Type = "extract";
        Value = value.Value;
    }

    /// <summary>
    /// Discriminant value
    /// </summary>
    [JsonPropertyName("type")]
    public string Type { get; internal set; }

    /// <summary>
    /// Discriminated union value
    /// </summary>
    public object? Value { get; internal set; }

    /// <summary>
    /// Returns true if <see cref="Type"/> is "decide"
    /// </summary>
    public bool IsDecide => Type == "decide";

    /// <summary>
    /// Returns true if <see cref="Type"/> is "extract"
    /// </summary>
    public bool IsExtract => Type == "extract";

    /// <summary>
    /// Returns the value as a <see cref="DexaAiSdk.DecideTask"/> if <see cref="Type"/> is 'decide', otherwise throws an exception.
    /// </summary>
    /// <exception cref="Exception">Thrown when <see cref="Type"/> is not 'decide'.</exception>
    public DexaAiSdk.DecideTask AsDecide() =>
        IsDecide
            ? (DexaAiSdk.DecideTask)Value!
            : throw new global::System.Exception("Task.Type is not 'decide'");

    /// <summary>
    /// Returns the value as a <see cref="DexaAiSdk.ExtractTask"/> if <see cref="Type"/> is 'extract', otherwise throws an exception.
    /// </summary>
    /// <exception cref="Exception">Thrown when <see cref="Type"/> is not 'extract'.</exception>
    public DexaAiSdk.ExtractTask AsExtract() =>
        IsExtract
            ? (DexaAiSdk.ExtractTask)Value!
            : throw new global::System.Exception("Task.Type is not 'extract'");

    public T Match<T>(
        Func<DexaAiSdk.DecideTask, T> onDecide,
        Func<DexaAiSdk.ExtractTask, T> onExtract,
        Func<string, object?, T> onUnknown_
    )
    {
        return Type switch
        {
            "decide" => onDecide(AsDecide()),
            "extract" => onExtract(AsExtract()),
            _ => onUnknown_(Type, Value),
        };
    }

    public void Visit(
        Action<DexaAiSdk.DecideTask> onDecide,
        Action<DexaAiSdk.ExtractTask> onExtract,
        Action<string, object?> onUnknown_
    )
    {
        switch (Type)
        {
            case "decide":
                onDecide(AsDecide());
                break;
            case "extract":
                onExtract(AsExtract());
                break;
            default:
                onUnknown_(Type, Value);
                break;
        }
    }

    /// <summary>
    /// Attempts to cast the value to a <see cref="DexaAiSdk.DecideTask"/> and returns true if successful.
    /// </summary>
    public bool TryAsDecide(out DexaAiSdk.DecideTask? value)
    {
        if (Type == "decide")
        {
            value = (DexaAiSdk.DecideTask)Value!;
            return true;
        }
        value = null;
        return false;
    }

    /// <summary>
    /// Attempts to cast the value to a <see cref="DexaAiSdk.ExtractTask"/> and returns true if successful.
    /// </summary>
    public bool TryAsExtract(out DexaAiSdk.ExtractTask? value)
    {
        if (Type == "extract")
        {
            value = (DexaAiSdk.ExtractTask)Value!;
            return true;
        }
        value = null;
        return false;
    }

    public override string ToString() => JsonUtils.Serialize(this);

    public static implicit operator Task(Task.Decide value) => new(value);

    public static implicit operator Task(Task.Extract value) => new(value);

    [Serializable]
    internal sealed class JsonConverter : JsonConverter<Task>
    {
        public override bool CanConvert(global::System.Type typeToConvert) =>
            typeof(Task).IsAssignableFrom(typeToConvert);

        public override Task Read(
            ref Utf8JsonReader reader,
            global::System.Type typeToConvert,
            JsonSerializerOptions options
        )
        {
            var json = JsonElement.ParseValue(ref reader);
            if (!json.TryGetProperty("type", out var discriminatorElement))
            {
                throw new JsonException("Missing discriminator property 'type'");
            }
            if (discriminatorElement.ValueKind != JsonValueKind.String)
            {
                if (discriminatorElement.ValueKind == JsonValueKind.Null)
                {
                    throw new JsonException("Discriminator property 'type' is null");
                }

                throw new JsonException(
                    $"Discriminator property 'type' is not a string, instead is {discriminatorElement.ToString()}"
                );
            }

            var discriminator =
                discriminatorElement.GetString()
                ?? throw new JsonException("Discriminator property 'type' is null");

            // Strip the discriminant property to prevent it from leaking into AdditionalProperties
            var jsonObject = System.Text.Json.Nodes.JsonObject.Create(json);
            jsonObject?.Remove("type");
            var jsonWithoutDiscriminator =
                jsonObject != null ? JsonSerializer.SerializeToElement(jsonObject, options) : json;

            var value = discriminator switch
            {
                "decide" => jsonWithoutDiscriminator.Deserialize<DexaAiSdk.DecideTask?>(options)
                    ?? throw new JsonException("Failed to deserialize DexaAiSdk.DecideTask"),
                "extract" => jsonWithoutDiscriminator.Deserialize<DexaAiSdk.ExtractTask?>(options)
                    ?? throw new JsonException("Failed to deserialize DexaAiSdk.ExtractTask"),
                _ => json.Deserialize<object?>(options),
            };
            return new Task(discriminator, value);
        }

        public override void Write(Utf8JsonWriter writer, Task value, JsonSerializerOptions options)
        {
            JsonNode json =
                value.Type switch
                {
                    "decide" => JsonSerializer.SerializeToNode(value.Value, options),
                    "extract" => JsonSerializer.SerializeToNode(value.Value, options),
                    _ => JsonSerializer.SerializeToNode(value.Value, options),
                } ?? new JsonObject();
            json["type"] = value.Type;
            json.WriteTo(writer, options);
        }

        public override Task ReadAsPropertyName(
            ref Utf8JsonReader reader,
            global::System.Type typeToConvert,
            JsonSerializerOptions options
        )
        {
            var stringValue =
                reader.GetString()
                ?? throw new JsonException("The JSON property name could not be read as a string.");
            return new Task(stringValue, stringValue);
        }

        public override void WriteAsPropertyName(
            Utf8JsonWriter writer,
            Task value,
            JsonSerializerOptions options
        )
        {
            writer.WritePropertyName(value.Type);
        }
    }

    /// <summary>
    /// Discriminated union type for decide
    /// </summary>
    [Serializable]
    public struct Decide
    {
        public Decide(DexaAiSdk.DecideTask value)
        {
            Value = value;
        }

        internal DexaAiSdk.DecideTask Value { get; set; }

        public override string ToString() => Value.ToString() ?? "null";

        public static implicit operator Task.Decide(DexaAiSdk.DecideTask value) => new(value);
    }

    /// <summary>
    /// Discriminated union type for extract
    /// </summary>
    [Serializable]
    public struct Extract
    {
        public Extract(DexaAiSdk.ExtractTask value)
        {
            Value = value;
        }

        internal DexaAiSdk.ExtractTask Value { get; set; }

        public override string ToString() => Value.ToString() ?? "null";

        public static implicit operator Task.Extract(DexaAiSdk.ExtractTask value) => new(value);
    }
}
