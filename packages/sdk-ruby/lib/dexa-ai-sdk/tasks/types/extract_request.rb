# frozen_string_literal: true

module DexaAiSdk
  module Tasks
    module Types
      class ExtractRequest < Internal::Types::Model
        field :model, -> { String }, optional: false, nullable: false

        field :context, -> { String }, optional: true, nullable: false

        field :messages, -> { Internal::Types::Array[DexaAiSdk::Types::Message] }, optional: true, nullable: false

        field :images, -> { Internal::Types::Array[DexaAiSdk::Types::ImageInput] }, optional: true, nullable: false

        field :audio, -> { Internal::Types::Array[DexaAiSdk::Types::AudioInput] }, optional: true, nullable: false

        field :question, -> { String }, optional: false, nullable: false

        field :instruction, -> { String }, optional: true, nullable: false

        field :schema, -> { Internal::Types::Hash[String, Object] }, optional: true, nullable: false

        field :temperature, -> { Float }, optional: true, nullable: false

        field :max_output_tokens, -> { Integer }, optional: true, nullable: false

        field :response_format, -> { DexaAiSdk::Tasks::Types::ExtractRequestResponseFormat }, optional: true, nullable: false

        field :target_language, -> { DexaAiSdk::Tasks::Types::ExtractRequestTargetLanguage }, optional: true, nullable: false

        field :output_language, -> { DexaAiSdk::Tasks::Types::ExtractRequestOutputLanguage }, optional: true, nullable: false
      end
    end
  end
end
