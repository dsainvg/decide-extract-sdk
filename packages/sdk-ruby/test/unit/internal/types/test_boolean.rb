# frozen_string_literal: true

require "test_helper"

describe DexaAiSdk::Internal::Types::Boolean do
  describe ".coerce" do
    it "coerces true/false" do
      assert DexaAiSdk::Internal::Types::Boolean.coerce(true)
      refute DexaAiSdk::Internal::Types::Boolean.coerce(false)
    end

    it "coerces an Integer" do
      assert DexaAiSdk::Internal::Types::Boolean.coerce(1)
      refute DexaAiSdk::Internal::Types::Boolean.coerce(0)
    end

    it "coerces a String" do
      assert DexaAiSdk::Internal::Types::Boolean.coerce("1")
      assert DexaAiSdk::Internal::Types::Boolean.coerce("true")
      refute DexaAiSdk::Internal::Types::Boolean.coerce("0")
    end

    it "passes through other values with strictness off" do
      obj = Object.new

      assert_equal obj, DexaAiSdk::Internal::Types::Boolean.coerce(obj)
    end

    it "raises an error with other values with strictness on" do
      assert_raises DexaAiSdk::Internal::Errors::TypeError do
        DexaAiSdk::Internal::Types::Boolean.coerce(Object.new, strict: true)
      end
    end
  end
end
