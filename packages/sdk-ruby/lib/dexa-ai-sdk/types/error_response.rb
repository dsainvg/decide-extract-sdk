# frozen_string_literal: true

module DexaAiSdk
  module Types
    class ErrorResponse < Internal::Types::Model
      field :error, -> { DexaAiSdk::Types::ErrorResponseError }, optional: false, nullable: false
    end
  end
end
