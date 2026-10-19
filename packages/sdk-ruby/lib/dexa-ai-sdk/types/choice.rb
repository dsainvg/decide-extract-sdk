# frozen_string_literal: true

module DexaAiSdk
  module Types
    class Choice < Internal::Types::Model
      field :message, -> { DexaAiSdk::Types::ResponseMessage }, optional: false, nullable: false

      field :finish_reason, -> { DexaAiSdk::Types::ChoiceFinishReason }, optional: false, nullable: false
    end
  end
end
