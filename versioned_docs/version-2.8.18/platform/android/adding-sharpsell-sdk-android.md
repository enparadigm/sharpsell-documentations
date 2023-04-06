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

<!-- ## Pre-Requisites
1. The application should be migrated to AndroidX. Check if the following line is present in the project level `gradle.properties`. If this line is not present, the project needs to be migrated to [androidX][https://developer.android.com/jetpack/androidx/migrate].

```gradle
android.useAndroidX=true
```
2. The minimum android SDK version should be at least 21.
```gradle
minSdkVersion 21
```
3. Firebase should be enabled and the `google-seriveces.json` file should be properly set up.

:::tip Firebase setup
Firebase setup has to be done to enable push notification and analytics on Sharpsell SDK.
To set up android firebase setup follow this - https://firebase.google.com/docs/android/setup
::: -->

:::note
Our SDK supports the following android processors - 'armeabi-v7a', 'arm64-v8a',   'x86_64'
:::

<!-- ## Needed User Permissions 

Sharpsell needs some user permissions like gallery access, camera access etc. To set a profile picture and other features. 

Below we have mentioned what all the permissions will be needed and the reason for that.
1.  -->

## Installation
1. Add the following lines to the project-level `builds.gradle` file.
```gradle
allprojects {
    repositories {
        google()
        mavenCentral()
        jcenter()
        maven { url 'https://storage.googleapis.com/download.flutter.io' }
        maven { url "https://jitpack.io" }
        maven { url "https://maven.google.com" }
        maven {
            url 'http://artifactory.enparadigm.com/artifactory/sharpsell_sdk'
            credentials {
                username = artifactory_username
                password = artifactory_password
            }
        }
    }
}
```
:::info
Sharpsell team will give the artifactory_username and artifactory_password. 
:::

2. Add the following lines to the app-level `builds.gradle` file.
```gradle
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    dataBinding {
        enabled = true
    }
}

dependencies {
    // The SDK has been tested with these firebase versions
    implementation platform('com.google.firebase:firebase-bom:28.3.0')
    implementation 'com.google.firebase:firebase-messaging-ktx'
    implementation 'com.google.firebase:firebase-crashlytics-ktx'

    implementation 'com.enparadigm.sharpsell:sdk:$sdkVersion'
}
```
:::info
To refer FAQ if any issue occur [click here](/faq#integration-issues)
:::

[https://developer.android.com/jetpack/androidx/migrate]: https://developer.android.com/jetpack/androidx/migrate