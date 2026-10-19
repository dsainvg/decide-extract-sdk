# frozen_string_literal: true

module DexaAiSdk
  module Types
    class ErrorResponseError < Internal::Types::Model
      field :type, -> { String }, optional: false, nullable: false

      field :message, -> { String }, optional: false, nullable: false

      field :param, -> { String }, optional: true, nullable: false

      field :code, -> { String }, optional: true, nullable: false
    end
  end
end
