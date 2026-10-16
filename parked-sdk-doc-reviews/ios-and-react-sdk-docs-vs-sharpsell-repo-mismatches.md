# iOS and React SDK documentation vs Sharpsell repo — mismatch list

This file is a read-only comparison. **No documentation pages were changed.**

Android mismatches are in [android-sdk-docs-vs-sharpsell-repo-mismatches.md](android-sdk-docs-vs-sharpsell-repo-mismatches.md).

---

## Scope

**Documentation versions in this site**

| Docs version | Meaning on this site | iOS pages | React pages |
| --- | --- | --- | --- |
| **2.9.xx** | Older SDK docs | Native iOS Setup + Using only. No iOS deeplink page. No React iOS. | React **Android** Setup + Using only |
| **3.x.xx** | Previous current (pre-Flutter) | Native iOS Setup, Using, Deeplink + React iOS copies | React Android + React iOS |
| **5.x.xx** | Latest published (`/sdk`) | Same iOS/React content as 3.x.xx (cloned). Flutter was added beside them | Same as 3.x.xx |

**Repo compared:** `/Users/nikunjkhunt/Documents/ss/sharpsell`

| Area | Path |
| --- | --- |
| iOS XCFrameworks produced for the SDK | `sharp-sell/sdk/iOS/Frameworks/` |
| iOS SDK packaging scripts | `sharp-sell/bin/generate-iOS-swift-package-framework`, `sharp-sell/bin/ios-sdk/` |
| iOS SDK Podfile used when generating frameworks | `sharp-sell/bin/ios-sdk/templates/sharpsell-Podfile` (`platform :ios, '16.0'`) |
| Standalone app iOS (not the host-SDK sample) | `sharp-sell/baseapp/ios/` (`platform :ios, '15.0'`, pods target `14.0`) |
| Flutter plugin iOS | `sharp-sell/sharpsell/ios/` (`podspec` `platform :ios, '10.0'`) |
| Shared Flutter initialize / routes | `sharp-sell/sharpsell/lib/sharpsell.dart`, `login_helper.dart` |
| Android native SDK (what React Native actually calls) | `sharp-sell/sdk/android/` |

There is **no React Native package or sample inside this repo**. React docs wrap the **Android native SDK** (`com.enparadigm.sharpsell:sdk`) plus a copy of the **iOS native** pages. The iOS host sample is a **sibling repo** (`sharpsell-iOS-sdk-sample`), not in this tree. SharpsellCore SPM is a **separate GitHub package** (`https://github.com/enparadigm/SharpsellCore.git`).

---

## Older vs newer — what changed in the docs

### Version map (short)

| Topic | **2.9.xx (older)** | **3.x.xx / 5.x.xx (newer)** | **Repo today** |
| --- | --- | --- | --- |
| Docs “latest” | Frozen 2.9 snapshot | 3.x was latest before 5.x; 5.x is latest now | Current `sharp-sell` tree |
| iOS Xcode | Not stated on Setup | Native Setup: **Xcode 15**. Intro + React iOS: still **13.4.1** | Not pinned in-repo; SDK Podfile is iOS **16.0** |
| Min iOS in docs | Not stated on Setup | Native Setup: **13.0**. Intro + React iOS: **12.0** | SDK generate Podfile **16.0**; baseapp **15.0** / pods **14.0**; Flutter `AppFrameworkInfo` still **12.0** |
| SPM version in Setup | Exact “UpTo Next Major **2.9.4**” | Native: “Exact Version given by team”. React iOS still says **2.7.0** | Version comes from SharpsellCore tags, not this repo |
| Local XCFrameworks listed | App, Flutter, FBLPromises, **FMDB** | Native 3.x/5.x: App, Flutter, FBLPromises (**FMDB dropped**). React iOS still lists **FMDB** | Generate script moves App, Flutter, FBLPromises. **FMDB is commented out**. Sample also copies **daily_flutter** + **WebRTC** (not in any docs) |
| Init JSON | `company_code`, `user_unique_id`, **`user_group_id`**, `country_code`, `user_meta`, `name`, `mobile_number`, `email`, `fcm_token` | `company_code`, `base_url`, **`sharpsell_api_key`**, `user_unique_id`, `fcm_token`, optional `user_details` | Mandatory: `company_code`, `sharpsell_api_key`, `user_unique_id`. Optional `base_url`, `fcm_token`, `user_details`, `client_data` |
| `open` payload (iOS) | Dictionary (`open(arguments: presentationArgs)`) | JSON **string** via `convertJsonToString` | Flutter channel `open` decodes a **JSON string** |
| Custom MC extra key | `entry_point` (matches Flutter `login_helper`) | Docs switched to **`app_url`** | Flutter still reads **`entry_point`** for `mcDirectory` |
| iOS notifications | `isSharpsellNotification` + `showNotification` + `handleNotificationRedirection` | Added `setPushTokenWhenDidRegisterForRemoteNotifications`, `setNotificationDataWhenDidReceiveRemoteNotification`, MoEngage `moe_deeplink` branch | Same Flutter notification APIs as Android; MoEngage is in the plugin |
| iOS Associated Domains | Not on Setup. **No deeplink page** | Setup has Associated Domains. Deeplink page added | `LSApplicationQueriesSchemes` includes `whatsapp` + `sharpsell`; URL scheme `sharpsell` |
| iOS sample link | GitHub `sharpsell_iOS_sample` | Dropped from native Setup | Sibling `sharpsell-iOS-sdk-sample` (not in this repo) |
| React Android routes | **snake_case**: `product_presentation_input`, `mc_directory`, `tc_home`, `product_bundle`, `quick_links` | **camelCase**: `productPresentationInput`, `mcDirectory`, `tcHome`, `productBundle`, `quickLinks` | Router uses camelCase (`AppRouter`) |
| React Artifactory | `http://artifactory.enparadigm.com/artifactory/sharpsell_sdk` | `https://artifactory.sharpselltech.com/artifactory/sharpsell_sdk` | Env vars `artifactoryRepoUrl` + `artifactoryRepoKey` |
| React Flutter embedding excludes | Not excluded | Exclude `flutter_embedding_debug` / `profile` | Same as Android published AAR guidance |
| React iOS section | **Does not exist** | Added (mostly a copy of native iOS, but with older Xcode/iOS/SPM/FMDB leftovers) | No RN iOS wrapper in this repo |
| 3.x vs 5.x iOS/React content | — | **No material iOS/React content change.** 5.x cloned 3.x and added Flutter | 5.x docs did not pick up current iOS 16 / extra frameworks / extra routes |

### 2.9.xx → 3.x.xx (the real “old vs new” docs jump)

**iOS Setup**

- Added Pre-Requisites: Xcode 15, iOS 13, Firebase `GoogleService-Info.plist`.
- Added Associated Domains steps.
- Added `sharpsell` next to `whatsapp` in `LSApplicationQueriesSchemes`.
- SPM rule changed from hardcoded **2.9.4** to “version given by Sharpsell team”.
- Dropped **FMDB.xcframework** from the local-framework list (native iOS only).
- Dropped the GitHub iOS sample-app link.

**iOS Using**

- Init fields: old user-profile top-level keys → `sharpsell_api_key` + `base_url` + `user_details`.
- Notifications: extra token/data setters and MoEngage deeplink handling.
- `open`: dict → JSON string (`convertJsonToString`).
- Custom directory key: `entry_point` → `app_url` (this is a **docs regression** vs Flutter code).

**React Android**

- Init: `user_group_id` / `name` / `mobile_number` → `sharpsell_api_key` / `base_url`.
- Routes: snake_case → camelCase (now matches the Flutter router).
- Artifactory host updated.
- Custom MC: text still says `entry_point`, snippet uses `app_url`.

**React iOS**

- Entire section is new in 3.x. It was **not** fully updated to match native 3.x/5.x (still Xcode 13.4.1, iOS 12, SPM **2.7.0**, FMDB).

### 3.x.xx → 5.x.xx

Native iOS Setup/Using/Deeplink and React Android/iOS pages are the **same content** as 3.x.xx.

What 5.x actually added is Flutter, not a refresh of iOS or React. So published “latest” iOS/React docs are still the 3.x snapshot, while the repo has moved (iOS 16 Podfile, extra XCFrameworks, extra routes).

---

# Part A — iOS: published 5.x.xx docs vs repo

Compared: `sdk_versioned_docs/version-5.x.xx/platform/iOS/*`, plus Intro iOS tab.

## 1. Xcode / min iOS (docs disagree with themselves and with the repo)

| Source | Xcode | Min iOS |
| --- | --- | --- |
| Intro `5.x.xx` iOS tab | 13.4.1 | 12.0 |
| Native iOS Setup `5.x.xx` | 15 | 13.0 |
| React iOS Setup `5.x.xx` | 13.4.1 | 12.0 |
| Flutter plugin podspec | — | 10.0 |
| `baseapp/ios/Podfile` | — | 15.0 (pods forced to 14.0) |
| iOS SDK generate Podfile `bin/ios-sdk/templates/sharpsell-Podfile` | — | **16.0** |
| `AppFrameworkInfo.plist` | — | 12.0 |

**Mismatch:** hosts following Intro/React iOS (12 / Xcode 13) will be below what native Setup and the current SDK generate pipeline require.

## 2. How the iOS SDK is actually packaged vs Setup docs

Docs say: add SPM `SharpsellCore`, then drag **3** (or “all four”) local XCFrameworks: App, Flutter, FBLPromises.

Repo generate + sample sync:

1. `flutter build ios-framework` into `sdk/iOS/Frameworks/`.
2. **Firebase** XCFrameworks are **removed** from that output (Firebase is an SPM dependency in SharpsellCore). CamelCase leftovers (`FirebaseCoreExtension`, `FirebaseSessions`, …) are stripped again in `bin/ios-sdk/sync-sample`.
3. **Local (host-embedded)** frameworks: **App, Flutter, FBLPromises** only. FMDB move is **commented out**.
4. Remaining plugin XCFrameworks (60+, e.g. `sharpsell`, `camera_avfoundation`, `moengage_flutter_ios`, `Sentry`, …) go into **SharpsellCore/artifacts**, not into the “drag into Xcode” list.
5. Sample app **also** embeds **`daily_flutter.xcframework`** and **`WebRTC.xcframework`** from CocoaPods. **Not documented.**

| # | Docs (5.x native Setup) | Repo |
| --- | --- | --- |
| 2.1 | “all four XCFramework” while listing three names | Three local: App, Flutter, FBLPromises |
| 2.2 | FMDB not listed (native) | FMDB not shipped (commented out) — **this matches native 3.x/5.x**, not React iOS / 2.9 |
| 2.3 | Only those local frameworks | Sample also needs daily_flutter + WebRTC |
| 2.4 | Debug folder for simulator, Release for store | Generate script defaults to **Release only** unless `isDebug=true` |
| 2.5 | SPM URL `https://github.com/enparadigm/SharpsellCore.git` | Matches the separate SharpsellCore repo the scripts expect as a sibling |

## 3. Permissions / Info.plist

| # | Docs | Repo `baseapp/ios/Runner/Info.plist` |
| --- | --- | --- |
| 3.1 | Camera, Photo Library, Microphone, Contacts, `whatsapp` + `sharpsell` query schemes | Those keys exist |
| 3.2 | Contacts description is a **copy of the camera text** (“access your camera…”) | Actual string: access contacts for the auto-filled contact box |
| 3.3 | No `NSUserTrackingUsageDescription` | Present (App Tracking Transparency). SDK Podfile sets `PERMISSION_APP_TRACKING_TRANSPARENCY=1` |
| 3.4 | No background modes | `UIBackgroundModes`: `fetch`, `remote-notification` |
| 3.5 | No URL scheme besides LSApplicationQueriesSchemes | `CFBundleURLTypes` scheme `sharpsell` |
| 3.6 | No `MoEngageAppDelegateProxyEnabled` | Set to `false` |
| 3.7 | Location not documented | Geolocator is in the plugin; Podfile bypasses “Always” location to avoid App Store `NSLocationAlways…` |

## 4. Initialize JSON

Same Flutter `_configure` as Android: mandatory `company_code`, `sharpsell_api_key`, `user_unique_id`.

| # | 5.x iOS Using | Repo |
| --- | --- | --- |
| 4.1 | Documents those three + `base_url` + `fcm_token` + `user_details` | Matches the current API |
| 4.2 | Intro table still lists **old** fields (`user_group_id`, `name`, `mobile_number`, `user_meta`) | Those are not mandatory SDK keys anymore |
| 4.3 | `reporting_to` only `identifier_type` / `identifier_value` | Flutter using-docs and login payloads use a fuller object |
| 4.4 | No `client_data` | Android sample and `doSDKLogin` send `client_data` |
| 4.5 | Parameter name `smartsellParameters` | Docs still use the old SmartSell name; code is Sharpsell Flutter initialize |

## 5. `open` / routes

| Route | 5.x iOS docs | Flutter `login_helper` / Android sample |
| --- | --- | --- |
| Home `open(arguments: [:])` | Yes | Home is `open` with null/empty. **Empty Swift dictionary vs JSON string** is inconsistent with other iOS snippets that stringify first |
| `productPresentationInput` | Yes | Yes. Note still says `presentationInputName`; JSON key is `presentation_name` |
| `launchpad`, `mcDirectory`, `potd`, `dvc`, `tcHome`, `productBundle`, `quickLinks` | Yes | Yes |
| Custom MC | `app_url` on `mcDirectory` | Code expects **`entry_point`** for `mcDirectory`. `app_url` is for route `customAppURL` |
| `yourProgress` | Missing | Present |
| `pitchWiz` | Missing | Present |
| `profile` | Missing | Present |
| HTTPS URL as `route` | Deeplink page | `Sharpsell.open` stashes `https…` routes as post-login deep links |

iOS 2.9 passed the dictionary into `open`. 3.x/5.x stringify it. The Flutter iOS/Android channel expects a **JSON string**. Home still passing `[:]` is leftover from 2.9.

## 6. Notifications

5.x iOS Using added APIs not in 2.9:

- `setPushTokenWhenDidRegisterForRemoteNotifications`
- `setNotificationDataWhenDidReceiveRemoteNotification`
- `setNotificationDataWhenDidReceive`
- MoEngage `app_extra.moe_deeplink` then `open` with that URL
- `handleNotificationRedirection` fallback

Repo: MoEngage FCM service exists on Android plugin; iOS Info.plist disables MoEngage AppDelegate proxy. There is **no Swift `Sharpsell.services` source in this repo** (it lives in SharpsellCore). Flutter channel methods match: `initialize`, `open`, `show_notification`, `is_sharpsell_notification`, `clear_data`, plus `update_fcm_token` / `get_moEngage_company_id` which iOS docs do not mention as host APIs.

**`enableLogsInProductionSdk` is not documented for iOS** (it is documented for Android/React). Flutter implements it on the same channel.

## 7. Deeplink page

| # | Docs | Repo / sample pattern |
| --- | --- | --- |
| 7.1 | `continue userActivity` + `route = full URL` if `defaults.bool(forKey: "isUserLoggedIn")` | `defaults` is **not** an SDK API (same class of issue as Android `PrefHelper`) |
| 7.2 | Notification-click handler duplicated with Using page | Using page is more complete (MoEngage + `handleNotificationRedirection`) |
| 7.3 | No Associated Domain *value* example | Team-provided applinks; Android sample uses `*.enparadigmtech.com` / `*.sharpselltech.com` |
| 7.4 | 2.9 has **no** iOS deeplink page | Deeplink exists in product/code |

## 8. Sample app

| Docs | Repo |
| --- | --- |
| 2.9 linked `https://github.com/enparadigm/sharpsell_iOS_sample` | 3.x/5.x native Setup **removed** that link |
| “see sample Info.plist” | Sample is **not** in this repo. CI uses sibling `sharpsell-iOS-sdk-sample` / `Sharpsell_Demo` |

---

# Part B — React Native: published 5.x.xx docs vs repo

Compared: `sdk_versioned_docs/version-5.x.xx/platform/react/android/*` and `platform/react/iOS/*`.

## 1. There is no React Native SDK in the Sharpsell repo

React docs tell the host to:

1. Depend on **`com.enparadigm.sharpsell:sdk`** (Android AAR).
2. Write a custom `SharpSellSDKPackage` + `SharpSellSDK` `ReactContextBaseJavaModule`.
3. On iOS, follow (a stale copy of) native iOS Setup.

So every Android Gradle / init / route mismatch from the Android comparison **also applies to React Android docs**, plus the React-specific issues below.

**Sample link is wrong:** React pages link to `https://github.com/enparadigm/sharpsell_android_sample` (Android), including React **iOS** Setup.

## 2. React Android Setup vs repo (and vs native Android 5.x)

Same gaps as Android Setup:

- `minSdkVersion 21` vs repo **28**
- Java **1.8** vs **17**
- Firebase BOM **28.3.0** vs publishing **33.11.0** / sample messaging **24.0.1**
- `jcenter()`, JitPack, `download.flutter.io`, `maven.google.com`
- `dataBinding { enabled = true }` not used by the SDK sample
- `builds.gradle` / `google-seriveces.json` typos
- Artifactory hardcoded vs env vars

React-only extras:

| # | Docs | Repo |
| --- | --- | --- |
| 2.1 | Force `com.facebook.react:react-native:` + `REACT_NATIVE_VERSION` | No RN project in this repo — cannot verify. That is host RN Gradle, not Sharpsell |
| 2.2 | Firebase setup link is **rnfirebase.io** | Native Android docs link to Google Firebase. Repo sample uses Google FCM, not RN Firebase |
| 2.3 | Class named `SharpSellSDKPackage` in a file the text calls `SharpsellSDKPackage.java` | Naming is inconsistent in the same page |

## 3. React Android Using — broken snippets vs Android API

`Sharpsell.kt` requires:

`initialize(context, data: String, successListener, errorListener)`

| # | 5.x React Using | Actual API / sample |
| --- | --- | --- |
| 3.1 | Step 2 is `Sharpsell.INSTANCE.initialize()` **with no arguments** | Will not compile |
| 3.2 | `getData(String obj)` parses `obj` then **ignores it** and writes hardcoded keys | Sample reads UI fields / caller JSON |
| 3.3 | `getHomeScreen` re-inits then `open(..., null)` | Matches a possible wrapper pattern, but mixes init into “open home” |
| 3.4 | Presentation snippet uses `dataPS.toString()` while the object is named `data` | Copy/paste bug (also in 2.9) |
| 3.5 | JS calls `SharpSellSDK.getHomeScreen(data)` without `NativeModules.` / `NativeEventEmitter` setup | Incomplete RN bridge example |
| 3.6 | `ApplicationLifecycleDispatcher.onApplicationCreate(this)` | Expo leftover; not in the Android SDK sample `MyApp` |
| 3.7 | Custom MC: prose says `entry_point`, code uses `app_url` | Flutter wants `entry_point` for `mcDirectory` |
| 3.8 | Missing `yourProgress`, `pitchWiz`, `profile`, `client_data`, `user_details` | Present in Android sample / login helper |
| 3.9 | Notifications copied from Android (correct pattern) | Matches `MyFirebaseMessagingService` |

## 4. React iOS pages vs native iOS 5.x vs repo

React iOS is **not** a React Native iOS module. It is native iOS Setup/Using/Deeplink with RN sample links and **older leftovers**.

| Topic | Native iOS 5.x | React iOS 5.x | Repo |
| --- | --- | --- | --- |
| Xcode | 15 | **13.4.1** | SDK Podfile iOS 16 |
| Min iOS | 13.0 | **12.0** | 16.0 generate / 15.0 baseapp |
| SPM version | “team will give Exact Version” | Hardcoded **2.7.0** (older than 2.9.4) | SharpsellCore tags |
| Local frameworks | App, Flutter, FBLPromises | Still lists **FMDB** | FMDB not moved |
| Sample link | None | **Android** GitHub sample | Sibling iOS sample repo |
| Using init | `user_details` block | Weaker: api key + base_url, **info list still says `user_group_id`** | Current keys are api key, not group id |
| Workspace note | — | “use `.xcworkspace` generated for iOS” | RN hosts do use a workspace; this is the only RN-specific iOS hint |

## 5. React 2.9 route names vs code (older docs, still published)

If someone follows **2.9.xx** React Using, routes will **not** match the current Flutter router:

| 2.9.xx React docs | 3.x / 5.x docs and `AppRouter` |
| --- | --- |
| `product_presentation_input` | `productPresentationInput` |
| `mc_directory` | `mcDirectory` |
| `tc_home` | `tcHome` |
| `product_bundle` | `productBundle` |
| `quick_links` | `quickLinks` |

`launchpad`, `potd`, `dvc` were already camelCase/short in 2.9.

---

# Part C — Side-by-side: older docs vs newer docs vs repo

Use this as the “what is old, what is new, what the repo is” table.

### iOS

| Item | Older docs (2.9.xx) | Newer docs (3.x / 5.x native) | Repo now |
| --- | --- | --- | --- |
| Xcode | Unspecified | 15 (Setup) vs 13.4.1 (Intro) | Not in-repo; expect modern Xcode for iOS 16 |
| Min iOS | Unspecified | 13.0 (Setup) vs 12.0 (Intro) | **16.0** SDK Podfile; 15.0/14.0 baseapp |
| SPM | 2.9.4 UpToNextMajor | Exact version from team | SharpsellCore GitHub package |
| FMDB | Listed | Dropped (native) | Not shipped as a local framework |
| Extra local frameworks | — | Still not listed | **daily_flutter**, **WebRTC** required by sample |
| Init | group id + name/phone/email | api key + user_details | api key + optional user_details/client_data |
| `open` args | Dictionary | JSON string | JSON string |
| Custom MC | `entry_point` | `app_url` | `entry_point` |
| Push token setter | Missing | Present | Channel exists; Swift API in SharpsellCore |
| Deeplink page | Missing | Present | URL scheme + associated domains in product |
| Extra routes | Missing yourProgress/pitchWiz/profile | Still missing | Present in Flutter + Android sample |
| enableLogs | Missing | Still missing on iOS | Flutter channel `enable_logs_in_production_sdk` |

### React Native

| Item | Older docs (2.9.xx) | Newer docs (3.x / 5.x) | Repo now |
| --- | --- | --- | --- |
| RN package in repo | No | No | **No** |
| Android minSdk / Java / Firebase | 21 / 1.8 / BOM 28.3.0 | Same (not bumped) | 28 / 17 / Messaging 24.x |
| Artifactory | `artifactory.enparadigm.com` | `artifactory.sharpselltech.com` | Env-based URL |
| Init fields | Old group-id set | api key + base_url | api key set; `initialize()` empty snippet is invalid |
| Routes | snake_case (wrong for current app) | camelCase (correct names) | camelCase |
| Custom MC | `entry_point` in code | Code `app_url`, text `entry_point` | `entry_point` |
| React iOS | **None** | Stale copy (2.7.0, FMDB, iOS 12) | Native iOS 16 pipeline |
| Sample | Android GitHub repo | Same Android GitHub repo | Android sample in-repo; iOS sample sibling; **no RN sample** |

---

## Things that do match

- SPM URL `https://github.com/enparadigm/SharpsellCore.git`
- Native 3.x/5.x local list App / Flutter / FBLPromises (without FMDB)
- Query schemes `whatsapp` + `sharpsell` (3.x/5.x)
- Camera / photos / mic / contacts *keys* (descriptions for contacts do not match)
- Current init *keys* on native iOS Using and React Android `getData` (api key path), aside from empty `initialize()`
- camelCase routes on 3.x/5.x React and iOS Using (the ones that are documented)
- Android notification check-then-show pattern reused on React Android
- Artifact `com.enparadigm.sharpsell:sdk` for React Android

---

## Source files (absolute)

Documentation:

- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-2.9.xx/platform/iOS/`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-3.x.xx/platform/iOS/`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/platform/iOS/`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-2.9.xx/platform/react/android/`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-3.x.xx/platform/react/`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/platform/react/`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/intro.mdx`

Repo:

- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/bin/generate-iOS-swift-package-framework`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/bin/ios-sdk/sync-sample`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/bin/ios-sdk/templates/sharpsell-Podfile`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/sdk/iOS/Frameworks/`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/baseapp/ios/Podfile`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/baseapp/ios/Runner/Info.plist`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/sharpsell/lib/sharpsell.dart`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/sdk/android/sdk/src/main/java/com/enparadigm/sharpsell/sdk/Sharpsell.kt`
