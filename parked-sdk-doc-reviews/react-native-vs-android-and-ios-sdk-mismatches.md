# React Native docs vs Android SDK and iOS SDK

This file compares **React Native documentation** (`5.x.xx`) in two directions:

1. **React Native Android docs** ↔ **Android SDK** in `/Users/nikunjkhunt/Documents/ss/sharpsell` (and native Android docs, which describe that same SDK).
2. **React Native iOS docs** ↔ **iOS SDK** in that same repo (and native iOS docs).

No documentation pages were changed.

**Important:** there is **no React Native SDK package** in the Sharpsell repo. RN Android is a host-app wrapper around `com.enparadigm.sharpsell:sdk`. RN iOS docs are a copy of native iOS Setup/Using/Deeplink, not a JS/RN module.

| Layer | Path |
| --- | --- |
| RN Android docs | `sdk_versioned_docs/version-5.x.xx/platform/react/android/` |
| Native Android docs | `sdk_versioned_docs/version-5.x.xx/platform/android/` |
| Android SDK in repo | `sharp-sell/sdk/android/` (`Sharpsell.kt`, sample `MainActivity.java`, Gradle) |
| RN iOS docs | `sdk_versioned_docs/version-5.x.xx/platform/react/iOS/` |
| Native iOS docs | `sdk_versioned_docs/version-5.x.xx/platform/iOS/` |
| iOS SDK in repo | `sharp-sell/sdk/iOS/`, `sharp-sell/bin/ios-sdk/`, `sharp-sell/baseapp/ios/` |

---

# A. React Native Android vs Android SDK

RN Android Setup/Using call the **same** Java/Kotlin API as native Android: `com.enparadigm.sharpsell.sdk.Sharpsell`.

## A1. Setup: RN Android docs vs native Android docs vs repo

| Topic | RN Android Setup | Native Android Setup | Android SDK in repo |
| --- | --- | --- | --- |
| What you integrate | Same AAR: `com.enparadigm.sharpsell:sdk:$sdkVersion` | Same AAR | Publishing `groupId com.enparadigm.sharpsell`, `artifactId sdk`. Sample uses `project(':sdk')` |
| Exclude Flutter debug/profile embeddings | Yes | Yes | Only on the **commented** Maven line in the sample |
| minSdk | 21 | Not on Setup page (Intro/policy say 21) | **28** |
| Java | 1.8 | 1.8 | **17** |
| Firebase BOM | 28.3.0 + messaging-ktx + crashlytics-ktx | Same | Sample: `firebase-messaging:24.0.1`, no BOM, no crashlytics. Publishing expects BOM **33.11.0** |
| dataBinding | Required | Required | **Not enabled** on library or sample |
| Repos | RN node maven + mavenLocal + jcenter + flutter.io + jitpack + maven.google.com + Artifactory | `google()` + mavenCentral + jcenter + flutter.io + jitpack + maven.google.com + Artifactory | Host: `google()`, `mavenCentral()`, Artifactory from **env vars**. No jcenter on SDK host |
| RN-only Gradle | Force `com.facebook.react:react-native:` + `REACT_NATIVE_VERSION` | Not present | No RN project in repo |
| ABI note | Missing | `armeabi-v7a`, `arm64-v8a`, `x86_64` | Sample `abiFilters` match native docs |
| ProGuard | **Missing entire section** | Flutter + `com.enparadigm.sharpsell.**` keep rules | Sample ProGuard files are empty; minify off |
| AndroidX / minSdk as Setup prereqs | Yes (on RN Setup) | Moved to Intro, not on native Setup | `android.useAndroidX=true`; min 28 |
| google-services filename | `google-seriveces.json` | Not on native Setup (Intro has same typo) | Standard `google-services.json` |
| Firebase setup link | **rnfirebase.io** | Google Android Firebase docs (Intro) | Sample uses Google FCM APIs, not `@react-native-firebase` |
| Sample link | Same GitHub Android sample | Same GitHub Android sample | Real sample: `sharp-sell/sdk/android/app` |
| `SharpSellSDKPackage` | RN-only Java `ReactPackage` | N/A | Does not exist in repo (host must write it) |
| Filename vs class | Text says `SharpsellSDKPackage.java`, class is `SharpSellSDKPackage` | — | — |

## A2. Using: RN Android docs vs native Android Using vs `Sharpsell.kt` / sample

Public Android API (`Sharpsell.kt`):

- `createSharpsellEngine(Application)`
- `initialize(Context, String, SuccessListener, ErrorListener)`
- `open(Context, String? = null)`
- `isSharpsellNotification` / `showNotification`
- `clearData` / `enableLogsInProductionSdk`

| Topic | RN Android Using | Native Android Using | Android SDK / sample |
| --- | --- | --- | --- |
| Engine | `createSharpsellEngine(this)` in `MainApplication` | Same in `Application` (`MyApp`) | Matches `MyApp.java` |
| Extra RN wiring | `getPackages()` + `SharpSellSDKPackage`; `ApplicationLifecycleDispatcher.onApplicationCreate` | Not present | Dispatcher is **Expo**, not in the Android sample |
| Step 2 initialize snippet | `Sharpsell.INSTANCE.initialize()` **no args** | Full `initialize(context, data.toString(), …)` | **Will not compile** against `Sharpsell.kt` |
| Real initialize (buried in Home) | `getHomeScreen` does initialize + open | Separate Step 2, then `open` | Sample: initialize on login, `open` later |
| Init JSON | `company_code`, `base_url`, `sharpsell_api_key`, `user_unique_id`, `fcm_token` | Same **plus** optional `user_details` | Mandatory: company_code, sharpsell_api_key, user_unique_id. Sample also sends **`client_data`**. `user_details` optional |
| `getData(obj)` | Parses `obj` then **ignores it**; hardcodes fields; uses undefined `fcmToken` | N/A | Sample reads caller/UI values |
| JS bridge | `SharpSellSDK.getHomeScreen(data)` with `@react-native-firebase/messaging` | N/A | No RN JS in repo. Native sample does not use RN Firebase |
| Home | Init then `open(ctx, null)` | `open(ctx, null)` after a prior initialize | Matches API if initialize already succeeded |
| Presentation | camelCase route + name/inputs, then `dataPS.toString()` (**undefined `dataPS`**) | Same JSON, `data.toString()` | Matches native JSON; RN snippet is broken |
| Other routes | `launchpad`, `mcDirectory`, `potd`, `dvc`, `tcHome`, `productBundle`, `quickLinks` | Same | Same strings in `MainActivity` |
| Custom MC | Prose: `entry_point`. Code: `app_url` | Code: `app_url` | Flutter `login_helper` wants **`entry_point`** for `mcDirectory` |
| `yourProgress` / `pitchWiz` / `profile` | Missing | Missing in 5.x Android Using | **Present** in `MainActivity` |
| Notifications | Same `isSharpsellNotification` + `showNotification` | Same | Matches `MyFirebaseMessagingService` |
| Logs | Documented; also forced `true` inside `getHomeScreen` | Documented as a separate step | Exists; requires engine already created |
| `clearData` | `clearData(getReactApplicationContext())` | `clearData(MainActivity.this)` | Matches |

## A3. What RN Android adds (only in RN docs)

These are host-app React Native steps, not part of the Android SDK:

1. `SharpSellSDKPackage` implementing `ReactPackage`.
2. `SharpSellSDK` extending `ReactContextBaseJavaModule` (`getName()` = `"SharpSellSDK"`).
3. `@ReactMethod` wrappers (only Home is shown as a full method; other screens are raw `Sharpsell.INSTANCE.open` Java, not exported to JS).
4. `app.js` calling the native module.

None of that exists in `sharp-sell/sdk/android`.

## A4. RN Android vs Android SDK — short list of real breaks

1. Empty `initialize()` does not match `Sharpsell.initialize(Context, String, …)`.
2. minSdk 21 / Java 8 / Firebase BOM 28.3.0 / dataBinding do not match the current Android SDK (28 / 17 / Messaging 24.x / no dataBinding).
3. `user_details` and `client_data` are in the Android sample/API path; RN Using omits them.
4. Presentation snippet `dataPS` will not compile.
5. Custom MC key `app_url` vs SDK/Flutter `entry_point`.
6. Missing routes that the Android sample already has.
7. No ProGuard / ABI guidance on RN Setup (native Android Setup has both).
8. RN Firebase vs Google FCM used by the Android sample.

---

# B. React Native iOS vs iOS SDK

RN iOS pages are **native Swift/ObjC host instructions**, not `NativeModules` / RCT bridges. They should match the **iOS SDK** (SharpsellCore + local XCFrameworks) the repo actually builds.

## B1. Setup: RN iOS docs vs native iOS docs vs repo

| Topic | RN iOS Setup | Native iOS Setup | iOS SDK in repo |
| --- | --- | --- | --- |
| Integration model | SPM SharpsellCore + drag local XCFrameworks | Same | `bin/generate-iOS-swift-package-framework` + sibling SharpsellCore. Sample: `bin/ios-sdk/sync-sample` |
| Workspace note | “Use `.xcworkspace` generated for iOS” | Not stated | RN hosts typically have a workspace; iOS SDK sample is `Sharpsell_Demo.xcodeproj` (sibling repo) |
| Sample link | **Android** GitHub `sharpsell_android_sample` | No sample link | Sibling **`sharpsell-iOS-sdk-sample`**, not in this repo |
| Setup video | None | `iOS_setup.mp4` | — |
| Xcode | **13.4.1** | **15** | SDK generate Podfile is iOS **16.0** (needs a current Xcode) |
| Min iOS | **12.0** | **13.0** | Generate Podfile **16.0**; baseapp **15.0** (pods 14.0); plugin podspec still 10.0; `AppFrameworkInfo` 12.0 |
| SPM URL | `https://github.com/enparadigm/SharpsellCore.git` | Same | Scripts expect sibling `SharpsellCore` with `Package.swift` |
| SPM version rule | **UpTo Next Major 2.7.0** | **Exact Version** from Sharpsell team | Not hardcoded 2.7.0 in this repo |
| Local XCFrameworks listed | App, Flutter, FBLPromises, **FMDB** | App, Flutter, FBLPromises (**no FMDB**) | Generate moves App, Flutter, FBLPromises. **FMDB move is commented out** |
| “All four” frameworks | Listed four names | Lists three, still says “all four” | Three local. Sample **also** copies **daily_flutter** + **WebRTC** (not in either docs page) |
| Debug vs Release | Debug for simulator, Release for store | Same | Generate defaults to **Release only** unless `isDebug=true` |
| Permissions / Associated Domains | Same as native iOS | Same | `Info.plist`: camera, photos, mic, contacts (correct contacts string), `whatsapp`+`sharpsell`, URL scheme `sharpsell`, ATT, background fetch/remote-notification |
| Contacts plist text | Camera copy-paste (same bug as native) | Same bug | Repo string is about contacts autofill |

## B2. Using: RN iOS docs vs native iOS Using vs repo Flutter/iOS pipeline

There is no `Sharpsell.services` Swift source in this repo (it lives in SharpsellCore). The Flutter module the iOS SDK embeds is in `sharp-sell/sharpsell/` and `sdk/sharpsell/`.

| Topic | RN iOS Using | Native iOS Using | iOS SDK / Flutter in repo |
| --- | --- | --- | --- |
| Import | `Import SharpsellCore` | Same | SharpsellCore package |
| Engine | `Sharpsell.services.createFlutterEngine()` in AppDelegate | Same | Flutter engine is created by the native wrapper; channel in `sdk/sharpsell/lib/main.dart` |
| Init keys | company_code, sharpsell_api_key, base_url, user_unique_id, fcm_token | Same **plus `user_details`** block | Mandatory: company_code, sharpsell_api_key, user_unique_id. `user_details` / `client_data` forwarded on SDK login |
| Team-provided list | company_code, **`user_group_id`**, base_url | company_code, **`sharpsell_api_key`**, base_url | `user_group_id` is **not** a current mandatory SDK field |
| Notifications | Token setter + isSharpsell + show + MoEngage click + handleNotificationRedirection | Same pattern, native Using is fuller on click | Flutter: `show_notification`, `is_sharpsell_notification`. MoEngage in plugin / Info.plist |
| `open` | JSON string via `convertJsonToString` | Same | Channel `open` expects a **JSON string** |
| Home | `open(arguments: [:])` empty dict | Same | Inconsistent with stringify used on other routes |
| Routes documented | Same set as native iOS (no yourProgress / pitchWiz / profile) | Same gap | Android sample + `login_helper` have those routes |
| Custom MC | `app_url` | `app_url` | Flutter wants **`entry_point`** for `mcDirectory` |
| enableLogs | **Missing** | **Missing** | Flutter channel `enable_logs_in_production_sdk` exists |
| RN JS / NativeModules | **None** | N/A | No RN iOS module in repo |

## B3. Deeplink: RN iOS vs native iOS vs repo

RN iOS deeplink page and native iOS deeplink page are **the same file content**.

| Topic | Both RN and native iOS deeplink docs | iOS SDK / product in repo |
| --- | --- | --- |
| Universal links | `continue userActivity` → `route = full URL` | Flutter `open` stashes `https…` routes |
| Login gate | `defaults.bool(forKey: "isUserLoggedIn")` | `defaults` is **not** an SDK API |
| Notification click | MoEngage `moe_deeplink` only (incomplete vs Using page) | Using page also has `handleNotificationRedirection` |
| Associated domain host | Not specified (team provides) | Android sample uses `*.enparadigmtech.com` / `*.sharpselltech.com`; iOS Info.plist has scheme `sharpsell` |

## B4. RN iOS vs iOS SDK — short list of real breaks

1. Min iOS **12** / Xcode **13.4.1** / SPM **2.7.0** vs native docs (13 / 15 / team version) vs repo generate **iOS 16**.
2. **FMDB** still required on RN iOS Setup; generate script **does not** ship it. Native iOS Setup already dropped it.
3. Sample also needs **daily_flutter** + **WebRTC**; neither RN nor native Setup lists them.
4. Sample link points at an **Android** repo.
5. Init still advertises **`user_group_id`**; current SDK login uses **`sharpsell_api_key`**. Native iOS Using already updated that list; RN iOS Using did not.
6. RN iOS Using omitted the **`user_details`** payload that native iOS Using includes.
7. No RN bridge: a React Native iOS app is told to call Swift `Sharpsell.services` in AppDelegate, not from JS (unlike RN Android, which at least shows `@ReactMethod`).
8. Custom MC `app_url` vs Flutter `entry_point`. Missing `yourProgress` / `pitchWiz` / `profile`.

---

# C. RN Android vs RN iOS (how the two RN sides disagree)

| Topic | RN Android | RN iOS |
| --- | --- | --- |
| Calls into | Android `Sharpsell.INSTANCE.*` from a Java native module | iOS `Sharpsell.services.*` from AppDelegate / Swift (no JS module shown) |
| Sample URL | Android GitHub sample | **Same Android** GitHub sample |
| Init advertised extras | sharpsell_api_key (correct) | Still lists user_group_id |
| user_details | Missing | Missing (native iOS has it) |
| enableLogs | Documented | Not documented |
| Notifications | Android FCM service | iOS AppDelegate + MoEngage |
| Deeplink page | **None** (native Android has one; RN Android does not copy it) | Copy of native iOS deeplink |
| Extra host files | `SharpSellSDKPackage` + `SharpSellSDK` | None beyond native iOS files |

---

# D. What matches

**RN Android ↔ Android SDK**

- Artifact `com.enparadigm.sharpsell:sdk`
- `createSharpsellEngine` from Application
- Route strings that are documented (home, presentation, launchpad, mcDirectory, potd, dvc, tcHome, productBundle, quickLinks)
- Notification check-then-show
- `clearData` / `enableLogsInProductionSdk` exist on the Android API

**RN iOS ↔ iOS SDK**

- SPM URL SharpsellCore
- `createFlutterEngine` at launch
- Permission *keys* (camera, photos, mic, contacts, whatsapp/sharpsell)
- Same `open` + convertJsonToString pattern as native iOS Using
- Token / isSharpsell / showNotification flow (as documented)

---

## Source files

- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/platform/react/android/adding-sharpsell-sdk-react-native.md`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/platform/react/android/using-sharpsell-react-native.md`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/platform/android/adding-sharpsell-sdk-android.md`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/platform/android/using-sharpsell-android.md`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/platform/react/iOS/adding-sharpsell-sdk-ios.md`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/platform/react/iOS/using-sharpsell-iOS.md`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/platform/iOS/adding-sharpsell-sdk-ios.md`
- `/Users/nikunjkhunt/Documents/ss/sharpsell-documentations/sdk_versioned_docs/version-5.x.xx/platform/iOS/using-sharpsell-iOS.md`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/sdk/android/sdk/src/main/java/com/enparadigm/sharpsell/sdk/Sharpsell.kt`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/sdk/android/app/src/main/java/com/enparadigm/smartsellcore/MainActivity.java`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/bin/ios-sdk/templates/sharpsell-Podfile`
- `/Users/nikunjkhunt/Documents/ss/sharpsell/sharp-sell/bin/generate-iOS-swift-package-framework`
