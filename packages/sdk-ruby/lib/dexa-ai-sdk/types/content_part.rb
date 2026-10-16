# frozen_string_literal: true

module DexaAiSdk
  module Types
    class ContentPart < Internal::Types::Model
      field :type, -> { DexaAiSdk::Types::ContentPartType }, optional: true, nullable: false

      field :text, -> { String }, optional: true, nullable: false

      field :language, -> { DexaAiSdk::Types::ContentPartLanguage }, optional: true, nullable: false

      field :image_url, -> { DexaAiSdk::Types::ImageURL }, optional: true, nullable: false

      field :image, -> { DexaAiSdk::Types::ImageInput }, optional: true, nullable: false

      field :audio, -> { DexaAiSdk::Types::AudioInput }, optional: true, nullable: false

      field :input_audio, -> { DexaAiSdk::Types::AudioInput }, optional: true, nullable: false
    end
  end
end
