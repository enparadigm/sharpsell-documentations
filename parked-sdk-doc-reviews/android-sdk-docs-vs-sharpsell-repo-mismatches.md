# Android SDK documentation vs Sharpsell repo — mismatch list

This file is a read-only comparison. **No documentation pages were changed.**

## Scope

**Documentation compared (published latest SDK, version `5.x.xx`):**

- `sdk_versioned_docs/version-5.x.xx/intro.mdx` (Android tabs)
- `sdk_versioned_docs/version-5.x.xx/platform/android/adding-sharpsell-sdk-android.md`
- `sdk_versioned_docs/version-5.x.xx/platform/android/using-sharpsell-android.md`
- `sdk_versioned_docs/version-5.x.xx/platform/android/deeplinking-android.md`
- `sdk_versioned_docs/version-5.x.xx/android-version-policy-documentation.md`
- `sdk_versioned_docs/version-5.x.xx/faq.md` (Android items)

**Repo compared:** `/Users/nikunjkhunt/Documents/ss/sharpsell`

| Area | Path |
| --- | --- |
| Native Android SDK wrapper | `sharp-sell/sdk/android/sdk/` (`Sharpsell.kt`) |
| Host / sample app | `sharp-sell/sdk/android/app/` (`MainActivity.java`, `MyApp.java`, Gradle, manifest) |
| Flutter engine used by the SDK | `sharp-sell/sdk/sharpsell/lib/main.dart`, `sharp-sell/sharpsell/` |
| Plugin Android Gradle / manifest | `sharp-sell/sharpsell/android/` |

Staging copies under `sdk_docs/platform/android/` are noted only when they differ from published `5.x.xx`.

---

## Summary

The published Android docs still describe an older integration surface (minSdk 21, target 32, Java 8, Firebase BOM 28.3.0, jcenter, a single demo host). The current repo SDK sample and library target **minSdk 28 / compile+target 36 / Java 17**, use **Firebase Messaging 24.x / BOM 33.11.0**, and the sample implements extra init fields and routes (`client_data`, `pitchWiz`, `yourProgress`, `profile`) that `5.x.xx` docs omit.

---

## 1. SDK / Gradle versions

| # | Topic | Documentation (`5.x.xx`) | Repo (`sharp-sell/sdk/android`) |
| --- | --- | --- | --- |
| 1.1 | Minimum SDK | Intro and version policy: `minSdkVersion 21` (Lollipop) | SDK library, sample app, and Flutter plugin: `minSdkVersion 28` |
| 1.2 | Target SDK | Version policy: target **32**, Android **12** | Sample app and SDK library: `targetSdkVersion 36`. Sample comment: edge-to-edge for SDK 36 |
| 1.3 | Compile SDK | Not documented | Sample + SDK module: `compileSdkVersion 36`. Flutter plugin: `compileSdkVersion 35` |
| 1.4 | Java / JVM | `JavaVersion.VERSION_1_8` | `JavaVersion.VERSION_17` and Kotlin `jvmTarget = "17"` |
| 1.5 | Kotlin / AGP | Not documented | Kotlin `2.1.0`, Android Gradle Plugin `8.9.1` |
| 1.6 | NDK | Not documented | `ndkVersion = "28.1.13356709"` (sample + SDK + plugin). Sample also sets `rive.ndk.version` |
| 1.7 | Core library desugaring | Not documented | Sample enables `coreLibraryDesugaringEnabled true` and depends on `desugar_jdk_libs:2.1.4` |
| 1.8 | Namespace (AGP 8) | Not documented | Sample `namespace = "com.enparadigm.smartsellcore"`; SDK library `namespace = "com.enparadigm.sharpsell.sdk"` |
| 1.9 | `dataBinding { enabled = true }` | Required in app-level Gradle | Neither the SDK library nor the sample app enables data binding |
| 1.10 | Gradle file name | “project-level `builds.gradle`” / “app-level `builds.gradle`” | Actual files are `build.gradle` (no `s`) |

---

## 2. Repositories and artifact consumption

| # | Topic | Documentation (`5.x.xx`) | Repo |
| --- | --- | --- | --- |
| 2.1 | `jcenter()` | Listed in host `allprojects.repositories` | SDK host `sharp-sell/sdk/android/build.gradle` does **not** use jcenter. Flutter plugin `sharpsell/android/build.gradle` and `baseapp/android/build.gradle` still do |
| 2.2 | `https://storage.googleapis.com/download.flutter.io` | Listed as a required Maven repo | SDK host Gradle does not declare this. Published SDK pulls Flutter as `flutter_release` via Artifactory |
| 2.3 | `https://jitpack.io` | Listed as a required Maven repo | SDK host Gradle does not declare it. Flutter plugin forces `com.github.AbedElazizShe:LightCompressor:1.0.0` (JitPack-style coordinate) internally |
| 2.4 | `https://maven.google.com` | Listed (duplicate of `google()`) | SDK host uses `google()` + `mavenCentral()` only |
| 2.5 | Artifactory URL | Hardcoded `https://artifactory.sharpselltech.com/artifactory/sharpsell_sdk` | Built from env: `artifactoryRepoUrl` + `artifactoryRepoKey`, with `allowInsecureProtocol = true` |
| 2.6 | Artifactory credentials | `username = artifactory_username` / `password = artifactory_password` (as if they were Gradle extras) | `System.getenv('artifactoryUserName')` and `System.getenv('artifactoryUserPassword')` |
| 2.7 | Maven coordinates | `com.enparadigm.sharpsell:sdk:$sdkVersion` | Matches publishing: `groupId com.enparadigm.sharpsell`, `artifactId sdk` |
| 2.8 | How the sample consumes the SDK | Implies Maven `implementation ("com.enparadigm.sharpsell:sdk:$sdkVersion")` | Sample uses `implementation project(':sdk')`. The Maven line is **commented out** |
| 2.9 | Exclude Flutter debug/profile embeddings | Required: exclude `flutter_embedding_debug` and `flutter_embedding_profile` | Only present on the commented Maven dependency. Local `project(':sdk')` path does not apply those excludes |
| 2.10 | Staging vs published Artifactory | Published `5.x.xx` uses `artifactory.sharpselltech.com/.../sharpsell_sdk` | Staging `sdk_docs/platform/android/adding-sharpsell-sdk-android.md` still shows `http://artifactory.enparadigm.com/artifactory/sharpsell` — that staging URL also does not match the current host Gradle |

---

## 3. Firebase

| # | Topic | Documentation (`5.x.xx`) | Repo |
| --- | --- | --- | --- |
| 3.1 | Firebase BOM | `com.google.firebase:firebase-bom:28.3.0` | Publishing logic in `sdk/build.gradle` expects BOM **`33.11.0`**. Sample does **not** use a BOM |
| 3.2 | Messaging artifact | `firebase-messaging-ktx` (versionless via BOM 28.3.0) | Sample: `com.google.firebase:firebase-messaging:24.0.1` (non-ktx). Publishing maps messaging to `24.1.1` for BOM 33.11.0 |
| 3.3 | Crashlytics | `firebase-crashlytics-ktx` required | Sample app does **not** depend on Crashlytics. Publishing maps crashlytics to `19.4.2` when BOM is 33.11.0 |
| 3.4 | google-services file name | Intro: `google-seriveces.json` (typo) | Standard name is `google-services.json` |
| 3.5 | `add_firebase` init flag | Not documented | `Sharpsell._configure` reads `add_firebase` (default `false` in SDK configure map; `Config` model default is `true`) |
| 3.6 | Android 13+ notification permission | Not documented | Sample `MainActivity` requests `POST_NOTIFICATIONS` on API 33+ |
| 3.7 | MoEngage FCM service | Not documented | Flutter plugin manifest registers `com.moengage.firebase.MoEFireBaseMessagingService` |
| 3.8 | `update_fcm_token` | Not documented; only pass `fcm_token` on `initialize` | Flutter method channel implements `update_fcm_token`, but **`Sharpsell.kt` has no Android wrapper** for it |

---

## 4. ABI / packaging

| # | Topic | Documentation (`5.x.xx`) | Repo |
| --- | --- | --- | --- |
| 4.1 | Supported ABIs | `armeabi-v7a`, `arm64-v8a`, `x86_64` | Sample release `abiFilters` match |
| 4.2 | JNI `pickFirsts` for `libsqlite3.so` | Not documented | Sample `packaging.jniLibs.pickFirsts` for `arm64-v8a`, `armeabi-v7a`, `x86_64` `libsqlite3.so` |

---

## 5. ProGuard

| # | Topic | Documentation (`5.x.xx`) | Repo |
| --- | --- | --- | --- |
| 5.1 | Host ProGuard rules | Keep `io.flutter.app.**`, `io.flutter.plugin.**`, `io.flutter.util.**`, `io.flutter.view.**`, `io.flutter.**`, `com.enparadigm.sharpsell.**`, plus `@Keep` | Sample `app/proguard-rules.pro` and `sdk/proguard-rules.pro` are empty templates. SDK `defaultConfig` references `consumer-rules.pro` but **that file does not exist** |
| 5.2 | `proguardFiles` default | `proguard-android.txt` | Sample: `proguard-android-optimize.txt` |
| 5.3 | Minify in sample | Docs treat ProGuard as something hosts should add | Sample `minifyEnabled false` / `shrinkResources false` |

---

## 6. Public Android API (`Sharpsell.kt`) vs docs snippets

Public methods on `object Sharpsell`:

- `createSharpsellEngine(Application)`
- `enableLogsInProductionSdk(Context, Boolean)`
- `initialize(Context, String, SuccessListener, ErrorListener<String>?)`
- `open(Context, String? = null)`
- `showNotification(Context, String?)`
- `isSharpsellNotification(Context, String?, ResultListener<Boolean>)`
- `clearData(Context)`

| # | Topic | Documentation (`5.x.xx`) | Repo |
| --- | --- | --- | --- |
| 6.1 | Kotlin `initialize` argument type | Kotlin tab passes `data` as a `JSONObject` | Signature is `data: String`. Java tab correctly uses `data.toString()`. Kotlin snippet would not compile against the API |
| 6.2 | Kotlin `enableLogsInProductionSdk` | Uses `Sharpsell.INSTANCE.enableLogsInProductionSdk(MainActivity.this, true)` (Java style) | Kotlin should call `Sharpsell.enableLogsInProductionSdk(this, true)` on the `object` |
| 6.3 | Engine required before logs | Docs say call logs “just before initialize” | `enableLogsInProductionSdk` calls `checkIfEngineCreated()` and throws if `createSharpsellEngine` was not run. Sample creates the engine in `MyApp`, then enables logs in `MainActivity.onCreate` |
| 6.4 | `SharpsellActivity` | Not documented | Library launches `com.enparadigm.sharpsell.sdk.SharpsellActivity` (Flutter cached engine + edge-to-edge window insets for API 36) |
| 6.5 | Flutter channel methods with no Android wrapper | — | Channel also handles `update_fcm_token` and `get_moEngage_company_id`. Neither is exposed on `Sharpsell.kt` |
| 6.6 | In-repo SDK README | — | `sharp-sell/sdk/android/README.md` still documents **SmartSell**, `createSmartSellEngine`, and old init keys (`company_unique_id`, `user_group_id`). That README also does not match current `Sharpsell.kt` or the published docs |

---

## 7. Initialize JSON

Mandatory keys in `sharpsell.dart` `_configure` (SDK mode): `company_code`, `sharpsell_api_key`, `user_unique_id`.

| # | Topic | Documentation (`5.x.xx`) | Repo |
| --- | --- | --- | --- |
| 7.1 | Intro field table | Lists `company_code`, `user_unique_id`, **`user_group_id`**, **`user_meta`**, **`name`**, **`mobile_number`**, **`email`**, `fcm_token`. Says Sharpsell provides `user_group_id` | Current SDK login does **not** take top-level `user_group_id` / `name` / `mobile_number` / `user_meta`. Mandatory keys are `company_code`, `sharpsell_api_key`, `user_unique_id` |
| 7.2 | Intro missing keys | Intro table omits `sharpsell_api_key`, `base_url`, `user_details`, `client_data` | Using-Android page and sample include `sharpsell_api_key` and `base_url`. Sample also sends `client_data` |
| 7.3 | `user_details` | Using-Android documents `user_details` with `first_name`, `last_name`, `identifier_type`, `phone`, `email`, `external_unique_id`, `profile_image_url`, `user_meta_data`, `reporting_to` | Login API (`AuthenticationHelper.doSDKLogin`) forwards `user_details` if present. **Sample `MainActivity.login()` does not send `user_details` at all** |
| 7.4 | `reporting_to` shape | Android docs: only `identifier_type` + `identifier_value` | Flutter using-docs (and typical login payloads) use a full user object (`first_name`, `last_name`, `phone`, `email`, `user_meta_data`, …). Android docs do not match that richer shape |
| 7.5 | `identifier_type` example | Empty string `""` | Flutter docs use `"unique_id"` |
| 7.6 | `client_data` | Not in Android using-docs | Sample sends `client_data` with `correlation_id`, `language`, `quote_id`, `user_type`, `deeplink_redirection`. `doSDKLogin` forwards `client_data` to the API |
| 7.7 | `base_url` | Documented as optional | Code: `getBaseUrlFrom(companyCode, baseUrl)` — can be omitted if company code maps to a known URL |
| 7.8 | Sample vs docs initialize payload | Docs: company/api/user/fcm + optional `user_details` | Sample: company/api/user/base_url/fcm + `client_data`, no `user_details` |

---

## 8. Routes / entry points

Sample `MainActivity` buttons vs published Using-Android page.

| Route | In `5.x.xx` Android docs | In sample `MainActivity` | In `login_helper.dart` `updateThemeAndStartSdk` |
| --- | --- | --- | --- |
| Home (`open(..., null)`) | Yes | Yes | Fallback to home |
| `productPresentationInput` | Yes | Yes | Yes |
| `launchpad` | Yes | Yes | Yes (goes to `courses` if launchpad module is available) |
| `mcDirectory` | Yes | Yes | Yes |
| Custom MC (`mcDirectory` + extra key) | Yes (`app_url`) | Custom landing puts the **URL in `route`**, `app_url` is commented out | Custom MC looks for **`entry_point`**, not `app_url` |
| `potd` | Yes | Yes | Yes |
| `dvc` | Yes | Yes | Yes |
| `tcHome` | Yes | Yes | Yes |
| `productBundle` | Yes | Yes | Yes |
| `quickLinks` | Yes | Yes | Yes |
| `yourProgress` | **Missing** from published `5.x.xx` | Yes | Yes |
| `pitchWiz` | **Missing** | Yes | Yes (`pitchwizList` = `'pitchWiz'`) |
| `profile` | **Missing** | Yes | Yes |
| HTTPS URL as `route` | Deeplink page only | Custom landing uses `route = <full URL>` | `Sharpsell.open` stashes values whose `route` starts with `https` as a post-login deep link |

Additional route mismatches:

| # | Topic | Documentation (`5.x.xx`) | Repo |
| --- | --- | --- | --- |
| 8.1 | Your Progress | Not in published `5.x.xx` Using-Android | Sample + Flutter router use `"yourProgress"`. Staging `sdk_docs/platform/android/using-sharpsell-android.md` **does** document it — published `5.x.xx` dropped it |
| 8.2 | PitchWiz | Not documented | Sample route `"pitchWiz"` |
| 8.3 | Profile | Not documented | Sample route `"profile"` |
| 8.4 | Custom marketing collateral key | Docs: `route = "mcDirectory"` + `app_url` | `login_helper` for `mcDirectory` reads **`entry_point`** (`AppRouter.argSdkMcEntryPoint`) as a directory id. `app_url` is used when **`route == "customAppURL"`**, which the sample never sends |
| 8.5 | Custom landing | Docs describe custom MC via `app_url` on `mcDirectory` | Sample `openCustomLanding()` sets `route` to the pasted URL (HTTPS deep link), and comments out `app_url` |
| 8.6 | Presentation field note | Note says pass proper `presentationInputName` | JSON key in sample and models is **`presentation_name`** (plus `input_one`, `input_two`) |

---

## 9. Notifications

| # | Topic | Documentation (`5.x.xx`) | Repo |
| --- | --- | --- | --- |
| 9.1 | `isSharpsellNotification` + `showNotification` | Documented | Sample `MyFirebaseMessagingService` matches the Java snippet |
| 9.2 | Service registration | Not shown (only `onMessageReceived` body) | Sample manifest registers `.MyFirebaseMessagingService` with `com.google.firebase.MESSAGING_EVENT` |
| 9.3 | `onNewToken` | Not documented | Sample logs the new token only; does **not** call any SDK update-token API (and Android SDK has none) |
| 9.4 | Notification tap / killed state | Not documented | `Sharpsell.kt` `handleNotificationRedirection` looks for extras key `notificationJson` and then calls Flutter `handle_notification_redirection` |
| 9.5 | FAQ notification link | `https://docs.enparadigmtech.com/platform/android/android_implementation#step-3-handling-notification` | That host is the old docs site, not this Docusaurus `/sdk` site |

---

## 10. Deep linking

| # | Topic | Documentation (`5.x.xx`) | Repo sample manifest / `MainActivity` |
| --- | --- | --- | --- |
| 10.1 | Host | Single host `sharpsell-demo-dev.enparadigmtech.com` with no path | Wildcards: `*.enparadigmtech.com` and `*.sharpselltech.com` with `pathPrefix` `/app`, `/core/v1/verify`, `/static/authenticate` |
| 10.2 | Flutter default deep linking | Not documented | `<meta-data android:name="flutter_deeplinking_enabled" android:value="false" />` |
| 10.3 | `PrefHelper` | Used in the deeplink snippet as if it were part of the SDK | **Sample-only** helper (`com.enparadigm.smartsellcore.PrefHelper`). Not in `com.enparadigm.sharpsell.sdk` |
| 10.4 | `onCreate` snippet | `onCreate(@Nullable Bundle savedInstanceState)` with **no return type** (`void` missing) | Sample: `protected void onCreate(@Nullable Bundle savedInstanceState)` |
| 10.5 | `onNewIntent` | Present | Sample matches the idea (`super.onNewIntent` + `handleIntent`) |
| 10.6 | Passing the URL | `data.put("route", url)` then `open` | Sample matches. Flutter `open` treats `https…` routes as stashed deep links |
| 10.7 | iOS content on Android page | Prerequisites include iOS AASA upload and link `https://enparadigmtech.com/apple-app-site-association` | Android sample does not use that URL. Sample hosts are `*.enparadigmtech.com` / `*.sharpselltech.com` |
| 10.8 | Step 1 heading | “Create the Sharpsell Engine…” under a Manifest intent-filter section | That heading is copy-paste from Using-Android Step 1; the snippet is manifest XML, not engine creation |

---

## 11. Permissions and merged native pieces (undocumented)

Docs comment out the “Needed User Permissions” section. The Flutter plugin and sample still declare/merge native pieces hosts will see:

| Item | Where in repo |
| --- | --- |
| `ACCESS_FINE_LOCATION` / `ACCESS_COARSE_LOCATION` | Sample app manifest |
| `CAMERA`, `READ_CONTACTS`, `MODIFY_AUDIO_SETTINGS`, `FOREGROUND_SERVICE` | `sharpsell/android/src/main/AndroidManifest.xml` |
| Camera `<queries>` for `IMAGE_CAPTURE` | Plugin manifest |
| `UCropActivity` | Plugin application |
| Facebook `com.facebook.sdk.ApplicationId` → `@string/facebook_app_id` | Plugin manifest + `facebook-android-sdk:5.15.3` |
| FileProviders (`flutter_inappwebview_android`, `MyFileShareProvider`) | Plugin manifest |
| MoEngage Firebase messaging service | Plugin manifest |
| Plugin **removes** `READ_MEDIA_VIDEO` / `AUDIO` / `IMAGES` and `REQUEST_INSTALL_PACKAGES` via `tools:node="remove"` | Plugin manifest |

---

## 12. Sample app / reference project

| # | Topic | Documentation (`5.x.xx`) | Repo |
| --- | --- | --- | --- |
| 12.1 | Sample app link | Setup page: `https://github.com/enparadigm/sharpsell_android_sample` | Current working sample lives in-repo at `sharp-sell/sdk/android/app` (`com.enparadigm.smartsellcore`) |
| 12.2 | Sample app `versionName` | Not documented | `2.8.0` (host wrapper, not the published SDK version) |
| 12.3 | Engine creation | `MyApp` + `createSharpsellEngine` | Matches `MyApp.java` |
| 12.4 | Staging Using page extras | Published `5.x.xx` Using-Android has no sample-app link and no usage video | Staging `sdk_docs/.../using-sharpsell-android.md` still has a usage video and the GitHub sample link |

---

## 13. Version policy and FAQ (stale vs repo)

| # | Topic | Documentation (`5.x.xx`) | Repo |
| --- | --- | --- | --- |
| 13.1 | Policy table | min **21**, target **32**, max not defined | min **28**, target **36**, compile **36** |
| 13.2 | “Which is Sharpsell’s target android version?” | Android 12 / API 32 | Sample/library target API 36 |
| 13.3 | Integration link in version policy | `https://docs.enparadigmtech.com/` | Current docs site is this Docusaurus app under `/sdk` |
| 13.4 | FAQ “target version different from Sharpsell” | Talks about `<uses-sdk/>` in the manifest | Current Gradle uses `minSdkVersion` / `targetSdkVersion` in `defaultConfig`, not a `<uses-sdk>` snippet |
| 13.5 | FAQ push-notification deep link | Old `docs.enparadigmtech.com` URL | Does not point at `/sdk/.../android_implementation` |

---

## 14. Things that **do** match

Included so the list is not only negatives:

- Artifact `com.enparadigm.sharpsell:sdk`
- `android.useAndroidX=true` is still set in sample `gradle.properties`
- ABI list `armeabi-v7a`, `arm64-v8a`, `x86_64`
- `createSharpsellEngine` from a custom `Application`
- Java `initialize(..., data.toString(), SuccessListener, ErrorListener)`
- Notification check-then-show pattern
- `open(context, null)` for home
- Route strings that are documented (`productPresentationInput`, `launchpad`, `mcDirectory`, `potd`, `dvc`, `tcHome`, `productBundle`, `quickLinks`) exist in the sample and in `login_helper`
- `clearData` on logout
- `enableLogsInProductionSdk` exists and is used by the sample
- Deeplink handling pattern: `onNewIntent` + `route = full URL` + `Sharpsell.open`

---

## 15. Code-level bugs / copy issues in the docs (independent of Gradle versions)

These are documentation defects that would fail against the current API even if versions were updated:

1. Kotlin `initialize` passes a `JSONObject` instead of `String`.
2. Kotlin Enable-logs snippet uses Java `INSTANCE` / `MainActivity.this`.
3. Deeplink `onCreate` is missing `void`.
4. `PrefHelper` is not an SDK type.
5. Custom MC key `app_url` vs code `entry_point`.
6. Presentation note uses `presentationInputName` vs JSON `presentation_name`.
7. Intro init table is the old SmartSell field set (`user_group_id`, `name`, `mobile_number`, …).
8. Filename `builds.gradle` and `google-seriveces.json`.
9. Published `5.x.xx` Using-Android omits `yourProgress` even though the in-repo sample and staging docs include it.

---

## Source files (absolute)

Documentation:

- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/intro.mdx`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/platform/android/adding-sharpsell-sdk-android.md`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/platform/android/using-sharpsell-android.md`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/platform/android/deeplinking-android.md`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/android-version-policy-documentation.md`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/faq.md`

Repo:

- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/sdk/android/sdk/src/main/java/com/enparadigm/sharpsell/sdk/Sharpsell.kt`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/sdk/android/app/src/main/java/com/enparadigm/smartsellcore/MainActivity.java`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/sdk/android/app/build.gradle`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/sdk/android/sdk/build.gradle`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/sdk/android/build.gradle`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/sdk/android/app/src/main/AndroidManifest.xml`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/sharpsell/lib/sharpsell.dart`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/sharpsell/lib/smartsell/app/common_tasks/login_helper.dart`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/sdk/sharpsell/lib/main.dart`
