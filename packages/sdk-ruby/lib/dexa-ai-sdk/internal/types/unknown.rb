# frozen_string_literal: true

module DexaAiSdk
  module Internal
    module Types
      module Unknown
        include DexaAiSdk::Internal::Types::Type

        def coerce(value)
          value
        end
      end
    end
  end
end
