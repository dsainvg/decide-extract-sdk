# frozen_string_literal: true

module DexaAiSdk
  module Types
    module ContentPartType
      extend DexaAiSdk::Internal::Types::Enum

      TEXT = "text"
      IMAGE_URL = "image_url"
      IMAGE = "image"
      AUDIO = "audio"
      INPUT_AUDIO = "input_audio"
    end
  end
end
