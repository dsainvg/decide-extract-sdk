# frozen_string_literal: true

module DexaAiSdk
  module Types
    class RunTasksResponse < Internal::Types::Model
      field :id, -> { String }, optional: false, nullable: false

      field :model, -> { String }, optional: false, nullable: false

      field :choices, -> { Internal::Types::Array[DexaAiSdk::Types::Choice] }, optional: false, nullable: false

      field :results, -> { Internal::Types::Hash[String, Object] }, optional: false, nullable: false

      field :tasks, -> { Internal::Types::Hash[String, Object] }, optional: true, nullable: false

      field :usage, -> { DexaAiSdk::Types::Usage }, optional: false, nullable: false
    end
  end
end
