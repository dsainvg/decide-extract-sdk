namespace DexaAiSdk;

public partial interface ITasksClient
{
    WithRawResponseTask<RunTasksResponse> RunTasksAsync(
        RunTasksRequest request,
        RequestOptions? options = null,
        CancellationToken cancellationToken = default
    );

    WithRawResponseTask<RunTasksResponse> DecideExtractAsync(
        RunTasksRequest request,
        RequestOptions? options = null,
        CancellationToken cancellationToken = default
    );

    WithRawResponseTask<DecideResponse> DecideAsync(
        DecideRequest request,
        RequestOptions? options = null,
        CancellationToken cancellationToken = default
    );

    WithRawResponseTask<ExtractResponse> ExtractAsync(
        ExtractRequest request,
        RequestOptions? options = null,
        CancellationToken cancellationToken = default
    );
}
