# frozen_string_literal: true

module DexaAiSdk
  module Types
    class ExtractTask < Internal::Types::Model
      field :name, -> { String }, optional: false, nullable: false

      field :id, -> { String }, optional: true, nullable: false

      field :instruction, -> { String }, optional: false, nullable: false

      field :fields, -> { Internal::Types::Array[String] }, optional: true, nullable: false

      field :keys, -> { Internal::Types::Array[String] }, optional: true, nullable: false

      field :schema, -> { Internal::Types::Hash[String, Object] }, optional: true, nullable: false

      field :target_language, -> { DexaAiSdk::Types::ExtractTaskTargetLanguage }, optional: true, nullable: false
    end
  end
end
