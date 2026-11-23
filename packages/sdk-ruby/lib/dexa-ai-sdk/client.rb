# frozen_string_literal: true

module DexaAiSdk
  class Client
    # @param base_url [String, nil]
    # @param max_retries [Integer]
    # @param timeout [Numeric]
    #
    # @return [void]
    def initialize(base_url: nil, max_retries: 2, timeout: 60)
      @raw_client = DexaAiSdk::Internal::Http::RawClient.new(
        base_url: base_url || DexaAiSdk::Environment::DEFAULT,
        headers: {
          "X-Fern-Language" => "Ruby"
        },
        max_retries: max_retries,
        timeout: timeout
      )
    end

    # @return [DexaAiSdk::Tasks::Client]
    def tasks
      @tasks ||= DexaAiSdk::Tasks::Client.new(client: @raw_client)
    end
  end
end
