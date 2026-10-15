using DexaAiSdk;
using DexaAiSdk.Test.Unit.MockServer;
using DexaAiSdk.Test.Utils;
using NUnit.Framework;

namespace DexaAiSdk.Test.Unit.MockServer.Tasks;

[TestFixture]
[Parallelizable(ParallelScope.Self)]
public class DecideTest : BaseMockServerTest
{
    [NUnit.Framework.Test]
    public async global::System.Threading.Tasks.Task MockServerTest_1()
    {
        const string requestJson = """
            {
              "model": "model",
              "question": "question"
            }
            """;

        const string mockResponse = """
            {
              "id": "id",
              "model": "model",
              "choices": [
                {
                  "message": {
                    "role": "assistant",
                    "content": "content",
                    "language": "en"
                  },
                  "finish_reason": "stop"
                },
                {
                  "message": {
                    "role": "assistant",
                    "content": "content",
                    "language": "en"
                  },
                  "finish_reason": "stop"
                }
              ],
              "result": {
                "value": "value",
                "reason": "reason"
              },
              "decision": {
                "value": "value",
                "reason": "reason"
              },
              "value": "value",
              "usage": {
                "prompt_tokens": 1,
                "completion_tokens": 1,
                "total_tokens": 1
              }
            }
            """;

        Server
            .Given(
                WireMock
                    .RequestBuilders.Request.Create()
                    .WithPath("/decide")
                    .WithHeader("Content-Type", "application/json")
                    .UsingPost()
                    .WithBodyAsJson(requestJson)
            )
            .RespondWith(
                WireMock
                    .ResponseBuilders.Response.Create()
                    .WithStatusCode(200)
                    .WithBody(mockResponse)
            );

        var response = await Client.Tasks.DecideAsync(
            new DecideRequest
            {
                Model = "model",
                Context = null,
                Messages = null,
                Images = null,
                Audio = null,
                Question = "question",
                Choices = null,
                Options = null,
                Instruction = null,
                Temperature = null,
                MaxOutputTokens = null,
                ResponseFormat = null,
                TargetLanguage = null,
                OutputLanguage = null,
            }
        );
        JsonAssert.AreEqual(response, mockResponse);
    }

    [NUnit.Framework.Test]
    public async global::System.Threading.Tasks.Task MockServerTest_2()
    {
        const string requestJson = """
            {
              "model": "model",
              "question": "question"
            }
            """;

        const string mockResponse = """
            {
              "id": "id",
              "model": "model",
              "choices": [
                {
                  "message": {
                    "role": "assistant",
                    "content": "content"
                  },
                  "finish_reason": "stop"
                }
              ],
              "result": {
                "value": "value",
                "reason": "reason"
              },
              "decision": {
                "value": "value",
                "reason": "reason"
              },
              "value": "value",
              "usage": {
                "prompt_tokens": 1,
                "completion_tokens": 1,
                "total_tokens": 1
              }
            }
            """;

        Server
            .Given(
                WireMock
                    .RequestBuilders.Request.Create()
                    .WithPath("/decide")
                    .WithHeader("Content-Type", "application/json")
                    .UsingPost()
                    .WithBodyAsJson(requestJson)
            )
            .RespondWith(
                WireMock
                    .ResponseBuilders.Response.Create()
                    .WithStatusCode(200)
                    .WithBody(mockResponse)
            );

        var response = await Client.Tasks.DecideAsync(
            new DecideRequest { Model = "model", Question = "question" }
        );
        JsonAssert.AreEqual(response, mockResponse);
    }
}
