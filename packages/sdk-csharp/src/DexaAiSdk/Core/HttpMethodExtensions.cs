using global::System.Net.Http;

namespace DexaAiSdk.Core;

internal static class HttpMethodExtensions
{
    public static readonly HttpMethod Patch = new("PATCH");
}
