# frozen_string_literal: true

module DexaAiSdk
  module Types
    class RunTasksRequest < Internal::Types::Model
      field :model, -> { String }, optional: false, nullable: false

      field :context, -> { String }, optional: true, nullable: false

      field :messages, -> { Internal::Types::Array[DexaAiSdk::Types::Message] }, optional: true, nullable: false

      field :images, -> { Internal::Types::Array[DexaAiSdk::Types::ImageInput] }, optional: true, nullable: false

      field :audio, -> { Internal::Types::Array[DexaAiSdk::Types::AudioInput] }, optional: true, nullable: false

      field :tasks, -> { Internal::Types::Array[DexaAiSdk::Types::Task] }, optional: false, nullable: false

      field :temperature, -> { Float }, optional: true, nullable: false

      field :max_output_tokens, -> { Integer }, optional: true, nullable: false

      field :response_format, -> { DexaAiSdk::Types::RunTasksRequestResponseFormat }, optional: true, nullable: false

      field :target_language, -> { DexaAiSdk::Types::RunTasksRequestTargetLanguage }, optional: true, nullable: false

      field :output_language, -> { DexaAiSdk::Types::RunTasksRequestOutputLanguage }, optional: true, nullable: false
    end
  end
end
