---
title: 'Setup'
sidebar_position: 1
slug: 'react_native_setup'
---
import ReactPlayer from 'react-player';

# Sharpsell SDK Integration

<ReactPlayer playing controls url='/videos/React_android_integration.mp4'/>

<br></br>

React Native Android uses the **same Android SDK AAR** as the native Android integration (`com.enparadigm.sharpsell:sdk`). Follow the native Android Gradle requirements, then wrap the SDK in a React Native package.

## Pre-Requisites

1. The application should be migrated to AndroidX. Check if the following line is present in the project-level `gradle.properties`. If this line is not present, the project needs to be migrated to [AndroidX](https://developer.android.com/jetpack/androidx/migrate).

```gradle
android.useAndroidX=true
```

2. The minimum Android SDK version should be at least 28, and the app should target API 36.

```gradle
minSdkVersion 28
targetSdkVersion 36
compileSdk 36
```

3. Use Java 17. Enable core library desugaring.

4. Firebase should be enabled and the `google-services.json` file should be properly set up.

:::tip Firebase setup
Firebase setup has to be done in order to enable push notification and analytics on Sharpsell SDK.
For a React Native host you can use either the [Google Android Firebase setup](https://firebase.google.com/docs/android/setup) or [React Native Firebase](https://rnfirebase.io/).
:::

5. On Android 13 (API 33) and above, request `POST_NOTIFICATIONS` before showing Sharpsell notifications.

## Installation

1. Add the following lines to the project-level `build.gradle` file.

```gradle
allprojects {
    repositories {
        mavenLocal()
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url(new File(['node', '--print', "require.resolve('react-native/package.json')"].execute(null, rootDir).text.trim(), '../android'))
        }
        maven {
            // Android JSC is installed from npm
            url(new File(['node', '--print', "require.resolve('jsc-android/package.json')"].execute(null, rootDir).text.trim(), '../dist'))
        }
        google()
        mavenCentral()
        maven {
            url 'https://artifactory.sharpselltech.com/artifactory/sharpsell_sdk'
            credentials {
                username = artifactory_username
                password = artifactory_password
            }
        }
    }
}
```

:::info
Sharpsell team will give the `artifactory_username` and `artifactory_password`.
:::

2. Add the following lines to the app-level `build.gradle` file.

```gradle
android {
    compileSdk 36

    compileOptions {
        coreLibraryDesugaringEnabled true
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }

    defaultConfig {
        minSdkVersion 28
        targetSdkVersion 36
    }

    buildTypes {
        release {
            ndk {
                abiFilters 'armeabi-v7a', 'arm64-v8a', 'x86_64'
            }
        }
    }

    packaging {
        jniLibs {
            pickFirsts += [
                'lib/arm64-v8a/libsqlite3.so',
                'lib/armeabi-v7a/libsqlite3.so',
                'lib/x86_64/libsqlite3.so'
            ]
        }
    }
}

dependencies {
    coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:2.1.4'
    implementation 'com.google.firebase:firebase-messaging:24.0.1'

    implementation ("com.enparadigm.sharpsell:sdk:$sdkVersion") {
        exclude group: 'io.flutter', module: 'flutter_embedding_debug'
        exclude group: 'io.flutter', module: 'flutter_embedding_profile'
    }
}
```

:::info
Sharpsell team will give the SDK version which needs to be added in the implementation.
:::

The Sharpsell Android SDK supports `armeabi-v7a`, `arm64-v8a`, and `x86_64`. If you minify the app, add the ProGuard keep rules from the [Android Setup](../../android/adding-sharpsell-sdk-android.md) page.

## Creating Package

Create `SharpSellSDKPackage.java` in `android/app/src/main/java/...` so you can access the native module from JavaScript.

```java
package com.myreactnative;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class SharpSellSDKPackage implements ReactPackage {
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(
                new SharpSellSDK(reactContext)
        );
    }
}
```
