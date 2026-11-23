# frozen_string_literal: true

module DexaAiSdk
  module Types
    class RunTasksRequestResponseFormat < Internal::Types::Model
      field :type, -> { DexaAiSdk::Types::RunTasksRequestResponseFormatType }, optional: false, nullable: false
    end
  end
end
