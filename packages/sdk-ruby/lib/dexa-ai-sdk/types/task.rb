# frozen_string_literal: true

module DexaAiSdk
  module Types
    class Task < Internal::Types::Model
      extend DexaAiSdk::Internal::Types::Union

      discriminant :type

      member -> { DexaAiSdk::Types::DecideTask }, key: "DECIDE"

      member -> { DexaAiSdk::Types::ExtractTask }, key: "EXTRACT"
    end
  end
end
