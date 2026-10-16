# frozen_string_literal: true

module DexaAiSdk
  module Types
    class ExtractResponse < Internal::Types::Model
      field :id, -> { String }, optional: false, nullable: false

      field :model, -> { String }, optional: false, nullable: false

      field :choices, -> { Internal::Types::Array[DexaAiSdk::Types::Choice] }, optional: false, nullable: false

      field :result, -> { Internal::Types::Hash[String, Object] }, optional: false, nullable: false

      field :data, -> { Internal::Types::Hash[String, Object] }, optional: true, nullable: false

      field :value, -> { String }, optional: true, nullable: false

      field :usage, -> { DexaAiSdk::Types::Usage }, optional: false, nullable: false
    end
  end
end
