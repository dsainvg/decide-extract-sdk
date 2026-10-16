# frozen_string_literal: true

module DexaAiSdk
  module Types
    class DecideResult < Internal::Types::Model
      field :value, -> { String }, optional: false, nullable: false

      field :probabilities, -> { Internal::Types::Hash[String, Float] }, optional: false, nullable: false

      field :reason, -> { String }, optional: true, nullable: false
    end
  end
end
