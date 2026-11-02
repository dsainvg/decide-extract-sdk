# frozen_string_literal: true

module DexaAiSdk
  module Types
    class ImageURL < Internal::Types::Model
      field :url, -> { String }, optional: false, nullable: false

      field :detail, -> { DexaAiSdk::Types::ImageURLDetail }, optional: true, nullable: false
    end
  end
end
