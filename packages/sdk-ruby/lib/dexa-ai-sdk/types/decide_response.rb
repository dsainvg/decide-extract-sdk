# frozen_string_literal: true

module DexaAiSdk
  module Types
    class DecideResponse < Internal::Types::Model
      field :id, -> { String }, optional: false, nullable: false

      field :model, -> { String }, optional: false, nullable: false

      field :choices, -> { Internal::Types::Array[DexaAiSdk::Types::Choice] }, optional: false, nullable: false

      field :result, -> { DexaAiSdk::Types::DecideResult }, optional: false, nullable: false

      field :decision, -> { DexaAiSdk::Types::DecideResult }, optional: true, nullable: false

      field :value, -> { String }, optional: true, nullable: false

      field :usage, -> { DexaAiSdk::Types::Usage }, optional: false, nullable: false
    end
  end
end
