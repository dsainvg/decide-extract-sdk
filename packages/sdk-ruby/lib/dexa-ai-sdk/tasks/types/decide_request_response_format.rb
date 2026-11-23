# frozen_string_literal: true

module DexaAiSdk
  module Tasks
    module Types
      class DecideRequestResponseFormat < Internal::Types::Model
        field :type, -> { DexaAiSdk::Tasks::Types::DecideRequestResponseFormatType }, optional: false, nullable: false
      end
    end
  end
end
