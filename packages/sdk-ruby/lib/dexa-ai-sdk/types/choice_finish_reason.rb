# frozen_string_literal: true

module DexaAiSdk
  module Types
    module ChoiceFinishReason
      extend DexaAiSdk::Internal::Types::Enum

      STOP = "stop"
      LENGTH = "length"
      CONTENT_FILTER = "content_filter"
    end
  end
end
