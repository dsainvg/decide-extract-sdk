# frozen_string_literal: true

module DexaAiSdk
  module Types
    class Usage < Internal::Types::Model
      field :prompt_tokens, -> { Integer }, optional: false, nullable: false

      field :completion_tokens, -> { Integer }, optional: false, nullable: false

      field :total_tokens, -> { Integer }, optional: false, nullable: false
    end
  end
end
