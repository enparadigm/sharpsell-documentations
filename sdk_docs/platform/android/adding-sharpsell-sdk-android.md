---
title: 'Setup'
sidebar_position: 2
slug: 'android_setup'
---
import ReactPlayer from 'react-player';

# Sharpsell SDK Integration

<br></br>
<ReactPlayer playing controls url='/videos/android_integration.mp4'/>
<br></br>

**[Open Android Sample App](https://github.com/enparadigm/sharpsell_android_sample)**

:::note
Our SDK supports the following android processors — `armeabi-v7a`, `arm64-v8a`, `x86_64`.
:::

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

:::info
To know more about Android version and policy details [click here](/android_version_details)
:::

3. Use Java 17 (the Sharpsell Android SDK is built with Java 17). Enable core library desugaring if your app still needs older language APIs.

4. Firebase should be enabled and the `google-services.json` file should be properly set up.

:::tip Firebase Setup
Please refer to the [Firebase Setup](/#2-firebase-setup) section to setup Firebase for Android.
:::

5. On Android 13 (API 33) and above, request `POST_NOTIFICATIONS` before showing Sharpsell notifications.

## Installation

1. Add the following lines to the project-level `build.gradle` file.

```gradle
allprojects {
    repositories {
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
    ndkVersion "28.1.13356709"

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

    // The SDK has been tested with these Firebase versions
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

3. If you are using ProGuard rules in your app, add the below rules to your `proguard-rules.pro` file (this is not a mandatory step if minify is disabled).

```
# Flutter
-keep class io.flutter.app.** { *; }
-keep class io.flutter.plugin.**  { *; }
-keep class io.flutter.util.**  { *; }
-keep class io.flutter.view.**  { *; }
-keep class io.flutter.**  { *; }
-keep class com.enparadigm.sharpsell.**  { *; }

# Keep classes and methods annotated with @Keep
-keep @androidx.annotation.Keep class *
-keepclassmembers @androidx.annotation.Keep class * { *; }
```

You need the following lines too in your app-level `build.gradle` file for the ProGuard rules.

```gradle
proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
```

:::info
To refer FAQ if any issue occur [click here](/faq#integration-issues)
:::
