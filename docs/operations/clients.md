---
title: C++ and other clients
description: Using the API from C++, and from anything else without a generated client.
order: 2
---

Fern has no C++ generator, so there is no `sdk-cpp`. The API is plain JSON over HTTP, so any
HTTP library works and the example below is complete.

## C++ with cpr and nlohmann/json

```cpp
#include <cpr/cpr.h>
#include <nlohmann/json.hpp>
#include <iostream>

using json = nlohmann::json;

json decide_extract(const std::string& base_url,
                    const std::string& token,
                    const json& request) {
    auto response = cpr::Post(
        cpr::Url{base_url + "/v1/tasks"},
        cpr::Header{{"Authorization", "Bearer " + token}},
        cpr::Body{request.dump()}
    );

    if (response.status_code != 200) {
        throw std::runtime_error(
            "decide-extractor: " + std::to_string(response.status_code) +
            " " + response.text);
    }

    return json::parse(response.text);
}

int main() {
    json request = {
        {"model", "decider-extractor-v1"},
        {"context", "User says: renew subscription for 2 years."},
        {"tasks", json::array({
            {
                {"type", "decide"},
                {"name", "should_renew"},
                {"question", "Should we offer a renewal discount?"},
                {"options", json::array({"yes", "no"})}
            },
            {
                {"type", "extract"},
                {"name", "renew_term"},
                {"instruction", "Extract the renewal term in months"},
                {"keys", json::array({"months"})}
            }
        })}
    };

    auto response = decide_extract("http://localhost:8080", std::getenv("DEXA_TOKEN"), request);

    if (response.contains("results")) {
        std::cout << response["results"].dump(2) << "\n";
    }
}
```

```bash
# vcpkg.json
{ "dependencies": [ "cpr", "nlohmann-json" ] }

cmake -B build && cmake --build build
./build/decide_extract
```

The same shape works with libcurl, Boost.Beast or any other HTTP client, and with any JSON
library. Only two things matter: send `Authorization: Bearer <token>` and read the answers
from `results`.

## Generating your own client

If your language has an OpenAPI generator, point it at the published contract:

```bash
curl -O https://raw.githubusercontent.com/dsainvg/dexa-ai-sdk/main/fern/openapi/openapi.yml
```

```bash
openapi-generator generate -i openapi.yml -g cpp-httplib -o ./client
```

```bash
openapi-generator generate -i openapi.yml -g typescript-fetch -o ./client
```

```bash
openapi-generator generate -i openapi.yml -g python -o ./client
```

Treat the output as you would treat the Fern clients: generated, regenerable, never edited.

## The contract is the interface

Whatever language you use, the contract in `fern/openapi/openapi.yml` is what you code
against. If your generator cannot produce something sensible from it, that is a contract
problem worth fixing in the OpenAPI rather than working around in every client.