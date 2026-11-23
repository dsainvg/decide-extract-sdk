# frozen_string_literal: true

module DexaAiSdk
  module Tasks
    class Client
      # @param client [DexaAiSdk::Internal::Http::RawClient]
      #
      # @return [void]
      def initialize(client:)
        @client = client
      end

      # @param request_options [Hash]
      # @param params [DexaAiSdk::Types::RunTasksRequest]
      # @option request_options [String] :base_url
      # @option request_options [Hash{String => Object}] :additional_headers
      # @option request_options [Hash{String => Object}] :additional_query_parameters
      # @option request_options [Hash{String => Object}] :additional_body_parameters
      # @option request_options [Integer] :timeout_in_seconds
      #
      # @example
      #   client.tasks.run_tasks(
      #     model: "model",
      #     tasks: []
      #   )
      #
      # @return [DexaAiSdk::Types::RunTasksResponse]
      def run_tasks(request_options: {}, **params)
        params = DexaAiSdk::Internal::Types::Utils.normalize_keys(params)
        request = DexaAiSdk::Internal::JSON::Request.new(
          base_url: request_options[:base_url],
          method: "POST",
          path: "v1/tasks",
          body: DexaAiSdk::Types::RunTasksRequest.new(params).to_h,
          request_options: request_options
        )
        begin
          response = @client.send(request)
        rescue Net::HTTPRequestTimeout
          raise DexaAiSdk::Errors::TimeoutError
        end
        code = response.code.to_i
        if code.between?(200, 299)
          (response.body.to_s.empty? ? nil : DexaAiSdk::Types::RunTasksResponse.load(response.body))
        else
          error_class = DexaAiSdk::Errors::ResponseError.subclass_for_code(code)
          error_types = {
            400 => DexaAiSdk::Types::ErrorResponse,
            422 => DexaAiSdk::Types::ErrorResponse,
            500 => DexaAiSdk::Types::ErrorResponse
          }
          error_body = DexaAiSdk::Errors::ResponseError.load_error_body(code, response.body, error_types)
          raise error_class.new(response.body, code: code, body: error_body)
        end
      end

      # @param request_options [Hash]
      # @param params [DexaAiSdk::Types::RunTasksRequest]
      # @option request_options [String] :base_url
      # @option request_options [Hash{String => Object}] :additional_headers
      # @option request_options [Hash{String => Object}] :additional_query_parameters
      # @option request_options [Hash{String => Object}] :additional_body_parameters
      # @option request_options [Integer] :timeout_in_seconds
      #
      # @example
      #   client.tasks.decide_extract(
      #     model: "model",
      #     tasks: []
      #   )
      #
      # @return [DexaAiSdk::Types::RunTasksResponse]
      def decide_extract(request_options: {}, **params)
        params = DexaAiSdk::Internal::Types::Utils.normalize_keys(params)
        request = DexaAiSdk::Internal::JSON::Request.new(
          base_url: request_options[:base_url],
          method: "POST",
          path: "v1/decide-extract",
          body: DexaAiSdk::Types::RunTasksRequest.new(params).to_h,
          request_options: request_options
        )
        begin
          response = @client.send(request)
        rescue Net::HTTPRequestTimeout
          raise DexaAiSdk::Errors::TimeoutError
        end
        code = response.code.to_i
        if code.between?(200, 299)
          (response.body.to_s.empty? ? nil : DexaAiSdk::Types::RunTasksResponse.load(response.body))
        else
          error_class = DexaAiSdk::Errors::ResponseError.subclass_for_code(code)
          error_types = {
            400 => DexaAiSdk::Types::ErrorResponse,
            422 => DexaAiSdk::Types::ErrorResponse,
            500 => DexaAiSdk::Types::ErrorResponse
          }
          error_body = DexaAiSdk::Errors::ResponseError.load_error_body(code, response.body, error_types)
          raise error_class.new(response.body, code: code, body: error_body)
        end
      end

      # @param request_options [Hash]
      # @param params [DexaAiSdk::Tasks::Types::DecideRequest]
      # @option request_options [String] :base_url
      # @option request_options [Hash{String => Object}] :additional_headers
      # @option request_options [Hash{String => Object}] :additional_query_parameters
      # @option request_options [Hash{String => Object}] :additional_body_parameters
      # @option request_options [Integer] :timeout_in_seconds
      #
      # @example
      #   client.tasks.decide(
      #     model: "model",
      #     question: "question"
      #   )
      #
      # @return [DexaAiSdk::Types::DecideResponse]
      def decide(request_options: {}, **params)
        params = DexaAiSdk::Internal::Types::Utils.normalize_keys(params)
        request = DexaAiSdk::Internal::JSON::Request.new(
          base_url: request_options[:base_url],
          method: "POST",
          path: "decide",
          body: DexaAiSdk::Tasks::Types::DecideRequest.new(params).to_h,
          request_options: request_options
        )
        begin
          response = @client.send(request)
        rescue Net::HTTPRequestTimeout
          raise DexaAiSdk::Errors::TimeoutError
        end
        code = response.code.to_i
        if code.between?(200, 299)
          (response.body.to_s.empty? ? nil : DexaAiSdk::Types::DecideResponse.load(response.body))
        else
          error_class = DexaAiSdk::Errors::ResponseError.subclass_for_code(code)
          error_types = {
            400 => DexaAiSdk::Types::ErrorResponse,
            422 => DexaAiSdk::Types::ErrorResponse,
            500 => DexaAiSdk::Types::ErrorResponse
          }
          error_body = DexaAiSdk::Errors::ResponseError.load_error_body(code, response.body, error_types)
          raise error_class.new(response.body, code: code, body: error_body)
        end
      end

      # @param request_options [Hash]
      # @param params [DexaAiSdk::Tasks::Types::ExtractRequest]
      # @option request_options [String] :base_url
      # @option request_options [Hash{String => Object}] :additional_headers
      # @option request_options [Hash{String => Object}] :additional_query_parameters
      # @option request_options [Hash{String => Object}] :additional_body_parameters
      # @option request_options [Integer] :timeout_in_seconds
      #
      # @example
      #   client.tasks.extract(
      #     model: "model",
      #     question: "question"
      #   )
      #
      # @return [DexaAiSdk::Types::ExtractResponse]
      def extract(request_options: {}, **params)
        params = DexaAiSdk::Internal::Types::Utils.normalize_keys(params)
        request = DexaAiSdk::Internal::JSON::Request.new(
          base_url: request_options[:base_url],
          method: "POST",
          path: "extract",
          body: DexaAiSdk::Tasks::Types::ExtractRequest.new(params).to_h,
          request_options: request_options
        )
        begin
          response = @client.send(request)
        rescue Net::HTTPRequestTimeout
          raise DexaAiSdk::Errors::TimeoutError
        end
        code = response.code.to_i
        if code.between?(200, 299)
          (response.body.to_s.empty? ? nil : DexaAiSdk::Types::ExtractResponse.load(response.body))
        else
          error_class = DexaAiSdk::Errors::ResponseError.subclass_for_code(code)
          error_types = {
            400 => DexaAiSdk::Types::ErrorResponse,
            422 => DexaAiSdk::Types::ErrorResponse,
            500 => DexaAiSdk::Types::ErrorResponse
          }
          error_body = DexaAiSdk::Errors::ResponseError.load_error_body(code, response.body, error_types)
          raise error_class.new(response.body, code: code, body: error_body)
        end
      end
    end
  end
end
