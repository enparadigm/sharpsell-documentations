---
title: 'Setup'
sidebar_position: 1
---

# Sharpsell iOS SDK

## Pre-Requisites

1. Minimum iOS version supported by sharpsell is iOS `11.0`
 
2. Firebase should be enabled and the `GoogleService-Info.plist` file should be properly setup.

:::tip Firebase setup
Firebase setup have to be done in order to enable push notification and analytics on sharpsell SDK.
To setup iOS firebase setup follow this - https://firebase.google.com/docs/ios/setup
:::

## Installation

There are 2 steps involved in adding the sharpsell SDK in your project.

1. **Add the Sharpsell Swift Package** to the parent app
2. **Add Sharpsell local XCFrameworks in Framework, Libraries and Embedded content** in the parent
   app build settings.

### 1. Add the Sharpsell Swift Package

1. Add Sharpsell package [URL](https://github.com/enparadigm/SharpsellCore.git) as package
   dependency in you parent app. 
   For e.g - Attached the sample screenshot for your refrence (version may changes, contact sharpsell team for the latest version)
         <img width="1161" alt="Screenshot 2022-09-26 at 8 49 31 AM" src="https://user-images.githubusercontent.com/93570040/192187441-6b09285f-967b-41a4-b953-7e40333bc4f4.png">
2. Choose Branch in the Dependency Rule then click choose "UpTo Next Major" in the versions and add 2.6.0 as a major version,
   then click Add Package button.This will add the sharpsell framework as a package dependency for
   your app

### 2.Add Local XCFrameworks in Framework, Libraries and Embedded content

1. Download the XCFramework from the link which is given by Sharpsell team and unzip it.

2. You will find debug and release folders. Inside the folders you will find the below xcframeworks 
   - App.xcframework 
   - Flutter.xcframework 
   - FBLPromises.xcframework 
   - FMDB.xcframework

3. In order to run in iOS Simulators, we need to use debug version.So, if you are testing the app in
   simulator then use XCFramrworks which is available in Debug Folder.

4. Use XCFrameworks which is in Release folder when sharing a build or release the app to the app
   store. Debug frameworks will be slower compare with release framework.

5. Drag and drop all four XCFramework in **Framework, Libraries and Embedded content** section in
   project settings for your app target. All the frameworks will be added as **Embed & Sign**
   framework by default.

Make sure all other framework are in **Embed & Sign** .

## Testing sharpsell in iOS Simulators

**Note:** - Not supported in 2.6.0 version due to local depdency failures. We will be fixing this in the version.

  In order to run in iOS Simulators, we need to use debug version.So, if you are testing the app in
simulator then use XCFramrworks which is available in Debug Folder and replace those into the
project as mentioned above.


:::caution

Make sure we are using release frameworks when sharing a build or release the app to the
app store. Debug frameworks will be slower compare with release framework.

:::

