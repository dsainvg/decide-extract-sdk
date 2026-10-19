# frozen_string_literal: true

# Custom gemspec configuration, loaded by the generated gemspec through the 'spec'
# variable. Kept out of regeneration with .fernignore so these values survive.
#
# Fern has no API name to work from here, so the generated symbols are rewritten to
# dexa-ai-sdk after generation. Set the published identity here.

def add_custom_gemspec_data(spec)
  spec.name = "dexa-ai-sdk"
  spec.authors = ["Durga Sai"]
  spec.email = ["dexa-ai-sdk.20.12.24@kgpian.iitkgp.ac.in"]
  spec.homepage = "https://github.com/dsainvg/decide-extract-sdk"
  spec.license = "Apache-2.0"
  spec.summary = "Dexa is the Ruby client for the Decide + Extract API"
  spec.description = "Dexa runs decide and extract tasks against one context in a single request, from Ruby."

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = spec.homepage
  spec.metadata["changelog_uri"] = "#{spec.homepage}/blob/main/CHANGELOG.md"
  spec.metadata["documentation_uri"] = "#{spec.homepage}#readme"
  spec.metadata["allowed_push_host"] = "https://rubygems.org"
end