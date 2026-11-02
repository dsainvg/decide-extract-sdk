using DexaAiSdk.Core;

namespace DexaAiSdk;

public partial class DexaAiSdkClient : IDexaAiSdkClient
{
    private readonly RawClient _client;

    public DexaAiSdkClient(ClientOptions? clientOptions = null)
    {
        clientOptions ??= new ClientOptions();
        var platformHeaders = new Headers(
            new Dictionary<string, string>()
            {
                { "X-Fern-Language", "C#" },
                { "X-Fern-SDK-Name", "DexaAiSdk" },
                { "X-Fern-SDK-Version", global::DexaAiSdk.Version.Current },
            }
        );
        foreach (var header in platformHeaders)
        {
            if (!clientOptions.Headers.ContainsKey(header.Key))
            {
                clientOptions.Headers[header.Key] = header.Value;
            }
        }
        _client = new RawClient(clientOptions);
        Tasks = new TasksClient(_client);
    }

    public ITasksClient Tasks { get; }
}
