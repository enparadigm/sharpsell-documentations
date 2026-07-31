---
title: "Android Version Policy"
sidebar_position: 3
slug: 'android_version_details'
---

## Android Versions - An overview

<img src="/img/android_versions.png" width="500"/>

## Frequently Asked Questions

### What does the *target android version* mean?

- Every new Android version introduces changes that bring security and performance improvements and enhance the Android user experience.
- Some of these changes only apply to apps that explicitly declare support through their `targetSdkVersion` manifest attribute (also known as the target API level).
- Configuring the app to target a recent API level ensures that users can benefit from these improvements, while your app can still run on older Android versions.
- It is the **Android version the app was designed and tested on.** This is more like a certification or sign-off you are giving the Android OS as a hint to how it should handle your app in terms of OS features.

### Which is Sharpsell’s target a*ndroid version?*

- [Android 12](https://developer.android.com/about/versions/12) and the target SDK version is 32

### My app’s target android version is different from that of sharpsell. How do I integrate sharpsell SDK?

- We would recommend you update the target android version and compile SDK version of your application in the same as the sharpsell SDK versions, by doing this it will be easy to the compilation as well as target API-level features will be effective in both sharpsell SDK and your application.
- To integrate sharpsell sdk please follow the link : [https://docs.enparadigmtech.com/](https://docs.enparadigmtech.com/)

## What is `API Level`?

API Level is an integer value that uniquely identifies the framework API revision offered by a version of the Android platform, There is an image on the top for you to take a look at.

```
<uses-sdk android:minSdkVersion="integer"
          android:targetSdkVersion="integer"
          android:maxSdkVersion="integer" />
```

Applications can use a manifest element provided by the framework API — `<uses-sdk>` — to describe the minimum and maximum API Levels under which they are able to run, as well as the preferred API Level that they are designed to support. The element offers three key attributes:

- `android:minSdkVersion` — Specifies the minimum API Level on which the application is able to run. The default value is "1".
- `android:targetSdkVersion` — Specifies the API Level on which the application is designed to run. In some cases, this allows the application to use manifest elements or behaviours defined in the target API Level, rather than being restricted to using only those defined for the minimum API Level.
- `android:maxSdkVersion` — Specifies the maximum API Level on which the application is able to run. Declaring this attribute is **not recommended.** Please read the `[<uses-sdk>](https://developer.android.com/guide/topics/manifest/uses-sdk-element)` documentation before using this attribute.

**Caution**:

If you do not declare this attribute, the system assumes a default value of "1", which indicates that your application is compatible with all versions of Android. If your application is *not*
compatible with all versions and you have not declared the proper **`minSdkVersion`**, then when installed on a system, the application will crash during runtime when attempting to access the unavailable APIs.

### Sharpsell Sdk’s minimum and target version.

| Minimum Sdk Version | 21 (Lollipop) |
| --- | --- |
| Target Sdk Version | 32 (Android 12) |
| Max Sdk Version | Not defined. |

### Compatibility check for target version

| Android version of the user’s device | Sharpsell UX and behaviour |
| --- | --- |
| Higher than Sharpsell’s target version | It will run without a problem and also have the feature's effects.
For example, setting this value to "11" or higher allows the system to apply a new default theme (Holo) to your app when running on Android 3.0 or higher… |
| Same as  Sharpsell’s target version | It will run without a problem and also have the feature's effects. |
| Lower than Sharpsell’s target version | It will run the application without any problem, but if any features are specifically developed or supported in a higher version, they may not be available on older versions. |

### Compatibility check for minimum supported version

| Android version of the user’s device | Sharpsell UX and behaviour |
| --- | --- |
| Higher than Sharpsell’s minimum supported version | The application has no problem in both compile time and run time. |
| Lower than Sharpsell’s minimum supported version | The application will not be installed. |