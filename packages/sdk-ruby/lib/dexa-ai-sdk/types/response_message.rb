# frozen_string_literal: true

module DexaAiSdk
  module Types
    class ResponseMessage < Internal::Types::Model
      field :role, -> { DexaAiSdk::Types::ResponseMessageRole }, optional: false, nullable: false

      field :content, -> { String }, optional: false, nullable: false

      field :language, -> { DexaAiSdk::Types::ResponseMessageLanguage }, optional: true, nullable: false
    end
  end
end
