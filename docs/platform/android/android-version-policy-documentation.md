---
title: "Android Version Policy"
sidebar_position: 1
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

### I want to integrate Sharpsell SDK, what if my app’s target android version is different from that of Sharpsell?

There is something called `<uses-sdk/>` contained in **[`<manifest>`](https://developer.android.com/guide/topics/manifest/manifest-element)** which lets you express an application's compatibility with one or more versions of the Android platform, by means of an API Level integer. The API Level expressed by an application will be compared to the API Level of a given Android system, which may vary among different Android devices.

---

## What is `API Level`?

API Level is an integer value that uniquely identifies the framework API revision offered by a version of the Android platform, There is an image on the top for you to take a look at.

```
<uses-sdk 
  android:minSdkVersion="integer"
  android:targetSdkVersion="integer"
  android:maxSdkVersion="integer" 
/>
```

Applications can use a manifest element provided by the framework API — `<uses-sdk>` — to describe the minimum and maximum API Levels under which they are able to run, as well as the preferred API Level that they are designed to support. The element offers three key attributes:

- `android:minSdkVersion` — Specifies the minimum API Level on which the application is able to run. The default value is "1".
- `android:targetSdkVersion` — Specifies the API Level on which the application is designed to run. In some cases, this allows the application to use manifest elements or behaviours defined in the target API Level, rather than being restricted to using only those defined for the minimum API Level.
- `android:maxSdkVersion` — Specifies the maximum API Level on which the application is able to run. **Important:** Please read the `[<uses-sdk>](https://developer.android.com/guide/topics/manifest/uses-sdk-element)` documentation before using this attribute.

**Caution**:

If you do not declare this attribute, the system assumes a default value of "1", which indicates that your application is compatible with all versions of Android. If your application is *not*
compatible with all versions and you have not declared the proper **`minSdkVersion`**, then when installed on a system, the application will crash during runtime when attempting to access the unavailable APIs.

1. What is the relationship between the android version of the user’s device and this target version?

| Android version of the user’s device | Sharpsell UX and behaviour |
| --- | --- |
| Higher than Sharpsell’s target version | It will run without a problem and also have the feature's effects.
For example, setting this value to "11" or higher allows the system to apply a new default theme (Holo) to your app when running on Android 3.0 or higher… |
| Same as  Sharpsell’s target version | It will run without a problem and also have the feature's effects. |
| Lower than Sharpsell’s target version | It will run the application without any problem but the features whatever the API has will not be affected in the app, like the below example. Because the target version is lower than the version which is running. |

### **An Example**

In Android 12 the appearance of custom notifications was changed. Previously they could use the whole notification area, but in Android 12 system applies the standard template to all custom notifications so they look more consistent.

![https://miro.medium.com/max/1400/1*kId2tXN6U540ML59MU2rlw.png](https://miro.medium.com/max/1400/1*kId2tXN6U540ML59MU2rlw.png)

If your `targetSdkVersion` is **below 31** system will assume that you haven’t tested that feature and will **display notifications in the old way** to minimise the risk that notification will not be displayed correctly. Only after you update the target SDK version to 31 the new notification appearance will be used.

1. What does min supported version mean?
    - This is the  “lowest” android version minimum API Level required for the application to run. The Android system will prevent the user from installing the application if the system's API Level is lower than the value specified in this attribute
    - The `minSdkVersion` and `targetSdkVersion` elements identify the lowest android version with which your app is compatible and the highest android version against which you’ve designed and tested your app.
2. What Android version are we supporting?
    - Sharpsell has 21 as `minSdkVersion` and 32 as `targetSdkVersion` which means our application can support **Android 5 (LOLLIPOP)** to **Android 12 (S).**

---

## Compatibility check

| Android version of the user’s device | Sharpsell UX and behaviour |
| --- | --- |
| Higher than Sharpsell’s minimum supported version | The application has no problem in both compile time and run time. |
| Lower than Sharpsell’s minimum supported version | The application will not be installed. |
