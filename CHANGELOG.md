# Changelog

## [0.10.2](https://github.com/Digital-Assistant/Digital-Assistant-SDK/compare/v0.10.1...v0.10.2) (2026-10-08)


### Bug Fixes

* **release:** stage npm publishes and keep declarations in production builds ([14ccdf0](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/14ccdf04ed1287524c91566dc89b6524c99f8d50))

## [0.10.1](https://github.com/Digital-Assistant/Digital-Assistant-SDK/compare/v0.10.0...v0.10.1) (2026-10-08)


### Bug Fixes

* **package:** complete rename to @udan/digital-assistant-sdk ([48d072c](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/48d072c6ebc3585056904e8a8b716c456ba655a3))
* remove clientSecret leak and sweep console.log calls ([68438b9](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/68438b95e257289057695df93c659ae03a78f1da))
* remove clientSecret leak and sweep console.log calls ([12a2d5d](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/12a2d5daff041b6b8a4d4fe49e4772a441cd0f9b))

## [0.10.0](https://github.com/Digital-Assistant/Digital-Assistant-SDK/compare/v0.9.0...v0.10.0) (2026-10-07)


### Features

* **package:** npm publishing prerequisites for @udan/digital-assistant-core ([2f037f8](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/2f037f8f27ca47ec5040576b68fe5b85d131921a))
* **package:** publish as @udan/digital-assistant-core ([3d984d8](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/3d984d83f755c9c726c4375554c67ab628687b70))


### Bug Fixes

* **build:** build production bundle before publish ([9f80794](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/9f807943610cbfc151c9939921af35dd75960e5f))
* **build:** exclude tests from emitted declarations ([cc370a1](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/cc370a128e242b56eed8e4f04a46e55a0971882e))
* **build:** run domjson patch only in this repo ([318cbbb](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/318cbbb0e23e1df6cf0e7c6e259d14cb691acd77))
* **config:** align keycloakUrl env key ([f4eadf4](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/f4eadf46a20ad1cd4d713c1ab9a7ec509017389d))

## 0.9.0 (2026-10-07)


### Features

* dispatch UDAConfigUpdated event after AppConfig updates ([1cca60d](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/1cca60d1c00e2c29daf51c5f69823c862df21522))
* enforce enableRecording flag in startRecording and fix profanity check ownership ([171de11](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/171de11ddeb4b8f0fff15b19503c589fbea1f25d))
* enhance tooltip functionality and improve playback service with new event handling ([ce7b47f](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/ce7b47f31d3a1c1b6d04e40c06f12d96ae3ec517))


### Bug Fixes

* **ci:** pass PR refs via env to avoid script injection ([144f55b](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/144f55bbd5ed3cae3e7f64ce804b6f60aece2cad))
* comment out playback status check in invokeNextNode function ([615f6c1](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/615f6c1b2a96315cd719fbbe8dc2aa7312081d7c))
* gate slow playback delay behind enableSlowReplay flag ([579be1b](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/579be1bddfc48097b9e83ce8cbd6b79f88576cef))
* **test:** repair 6 suites failing under Jest 30 jsdom ([7d59049](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/7d59049fc3f373875ae1913771970deda7020210))
* **types:** avoid null access after Prettier reflow ([b3afe44](https://github.com/Digital-Assistant/Digital-Assistant-SDK/commit/b3afe44490423db285c0c3128669cf7c13ce1344))
