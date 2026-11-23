namespace DexaAiSdk;

/// <summary>
/// Base exception class for all exceptions thrown by the SDK.
/// </summary>
public class DexaAiSdkException(string message, Exception? innerException = null)
    : Exception(message, innerException);
