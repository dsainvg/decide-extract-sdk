# frozen_string_literal: true

module DexaAiSdk
  module Tasks
    module Types
      class DecideRequest < Internal::Types::Model
        field :model, -> { String }, optional: false, nullable: false

        field :context, -> { String }, optional: true, nullable: false

        field :messages, -> { Internal::Types::Array[DexaAiSdk::Types::Message] }, optional: true, nullable: false

        field :images, -> { Internal::Types::Array[DexaAiSdk::Types::ImageInput] }, optional: true, nullable: false

        field :audio, -> { Internal::Types::Array[DexaAiSdk::Types::AudioInput] }, optional: true, nullable: false

        field :question, -> { String }, optional: false, nullable: false

        field :choices, -> { Internal::Types::Array[String] }, optional: true, nullable: false

        field :options, -> { Internal::Types::Array[String] }, optional: true, nullable: false

        field :instruction, -> { String }, optional: true, nullable: false

        field :temperature, -> { Float }, optional: true, nullable: false

        field :max_output_tokens, -> { Integer }, optional: true, nullable: false

        field :response_format, -> { DexaAiSdk::Tasks::Types::DecideRequestResponseFormat }, optional: true, nullable: false

        field :target_language, -> { DexaAiSdk::Tasks::Types::DecideRequestTargetLanguage }, optional: true, nullable: false

        field :output_language, -> { DexaAiSdk::Tasks::Types::DecideRequestOutputLanguage }, optional: true, nullable: false
      end
    end
  end
end
