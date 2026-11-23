# frozen_string_literal: true

module DexaAiSdk
  module Tasks
    module Types
      class ExtractRequestResponseFormat < Internal::Types::Model
        field :type, -> { DexaAiSdk::Tasks::Types::ExtractRequestResponseFormatType }, optional: false, nullable: false
      end
    end
  end
end
