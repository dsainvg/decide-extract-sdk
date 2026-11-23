# frozen_string_literal: true

module DexaAiSdk
  module Types
    module MessageRole
      extend DexaAiSdk::Internal::Types::Enum

      SYSTEM = "system"
      USER = "user"
      ASSISTANT = "assistant"
    end
  end
end
