using DexaAiSdk;
using DexaAiSdk.Test.Unit.MockServer;
using DexaAiSdk.Test.Utils;
using NUnit.Framework;

namespace DexaAiSdk.Test.Unit.MockServer.Tasks;

[TestFixture]
[Parallelizable(ParallelScope.Self)]
public class RunTasksTest : BaseMockServerTest
{
    [NUnit.Framework.Test]
    public async global::System.Threading.Tasks.Task MockServerTest_1()
    {
        const string requestJson = """
            {
              "model": "model",
              "tasks": [
                {
                  "type": "decide",
                  "name": "name",
                  "question": "question"
                },
                {
                  "type": "decide",
                  "name": "name",
                  "question": "question"
                }
              ]
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
              "results": {
                "results": {
                  "key": "value"
                }
              },
              "tasks": {
                "tasks": {
                  "key": "value"
                }
              },
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
                    .WithPath("/v1/tasks")
                    .UsingPost()
                    .WithBodyAsJson(requestJson)
            )
            .RespondWith(
                WireMock
                    .ResponseBuilders.Response.Create()
                    .WithStatusCode(200)
                    .WithBody(mockResponse)
            );

        var response = await Client.Tasks.RunTasksAsync(
            new RunTasksRequest
            {
                Model = "model",
                Context = null,
                Messages = null,
                Images = null,
                Audio = null,
                Tasks = new List<DexaAiSdk.Task>()
                {
                    new DexaAiSdk.Task(
                        new DexaAiSdk.Task.Decide(
                            new DecideTask
                            {
                                Name = "name",
                                Id = null,
                                Question = "question",
                                Choices = null,
                                Options = null,
                                Instruction = null,
                                TargetLanguage = null,
                            }
                        )
                    ),
                    new DexaAiSdk.Task(
                        new DexaAiSdk.Task.Decide(
                            new DecideTask
                            {
                                Name = "name",
                                Id = null,
                                Question = "question",
                                Choices = null,
                                Options = null,
                                Instruction = null,
                                TargetLanguage = null,
                            }
                        )
                    ),
                },
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
              "tasks": [
                {
                  "type": "decide",
                  "name": "name",
                  "question": "question"
                }
              ]
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
              "results": {
                "key": "value"
              },
              "tasks": {
                "key": "value"
              },
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
                    .WithPath("/v1/tasks")
                    .UsingPost()
                    .WithBodyAsJson(requestJson)
            )
            .RespondWith(
                WireMock
                    .ResponseBuilders.Response.Create()
                    .WithStatusCode(200)
                    .WithBody(mockResponse)
            );

        var response = await Client.Tasks.RunTasksAsync(
            new RunTasksRequest
            {
                Model = "model",
                Tasks = new List<DexaAiSdk.Task>()
                {
                    new DexaAiSdk.Task(
                        new DexaAiSdk.Task.Decide(
                            new DecideTask { Name = "name", Question = "question" }
                        )
                    ),
                },
            }
        );
        JsonAssert.AreEqual(response, mockResponse);
    }
}
