# frozen_string_literal: true

module DexaAiSdk
  module Types
    class MessageContent < Internal::Types::Model
      extend DexaAiSdk::Internal::Types::Union

      member -> { String }

      member -> { Internal::Types::Array[DexaAiSdk::Types::ContentPart] }
    end
  end
end
