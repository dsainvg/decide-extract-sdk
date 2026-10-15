# frozen_string_literal: true

module DexaAiSdk
  module Types
    class ImageInput < Internal::Types::Model
      field :type, -> { DexaAiSdk::Types::ImageInputType }, optional: true, nullable: false

      field :url, -> { String }, optional: true, nullable: false

      field :data, -> { String }, optional: true, nullable: false

      field :mime_type, -> { String }, optional: true, nullable: false
    end
  end
end
