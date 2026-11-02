# frozen_string_literal: true

module DexaAiSdk
  module Types
    class Message < Internal::Types::Model
      field :role, -> { DexaAiSdk::Types::MessageRole }, optional: false, nullable: false

      field :content, -> { DexaAiSdk::Types::MessageContent }, optional: false, nullable: false

      field :language, -> { DexaAiSdk::Types::MessageLanguage }, optional: true, nullable: false
    end
  end
end
