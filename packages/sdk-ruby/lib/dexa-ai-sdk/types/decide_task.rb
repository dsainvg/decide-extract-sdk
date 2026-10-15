# frozen_string_literal: true

module DexaAiSdk
  module Types
    class DecideTask < Internal::Types::Model
      field :name, -> { String }, optional: false, nullable: false

      field :id, -> { String }, optional: true, nullable: false

      field :question, -> { String }, optional: false, nullable: false

      field :choices, -> { Internal::Types::Array[String] }, optional: true, nullable: false

      field :options, -> { Internal::Types::Array[String] }, optional: true, nullable: false

      field :instruction, -> { String }, optional: true, nullable: false

      field :target_language, -> { DexaAiSdk::Types::DecideTaskTargetLanguage }, optional: true, nullable: false
    end
  end
end
