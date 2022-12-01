---
title: 'Setup'
sidebar_position: 1
slug: 'android_setup'
---
import ReactPlayer from 'react-player';

# Sharpsell SDK Integration

## Pre-Requisites
1. The application should be migrated to AndroidX. Check if the following line is present in the project level `gradle.properties`. If this line is not present, the project needs to be migrated to [androidX](https://developer.android.com/jetpack/androidx/migrate).

```gradle
android.useAndroidX=true
```
2. The minimum android SDK version should be at least 21.
```gradle
minSdkVersion 21
```
3. Firebase should be enabled and the `google-seriveces.json` file should be properly setup.

:::tip Firebase setup
Firebase setup have to be done in order to enable push notification and analytics on sharpsell SDK.
To setup android firebase setup follow this - https://firebase.google.com/docs/android/setup
:::

## Needed User Permissions 

Sharpsell needs some user permissions like gallery access, camera access etc,. In order to set profile picture and for other feature. 

Below we have mentioned what all the permissons will be needed and reason for that.
1. 

## Installation
1. Add the following lines to the project level `builds.gradle` file.
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
            url artifactory_url
            credentials {
                username = artifactory_username
                password = artifactory_password
            }
        }
    }
}
```gradle
```gradle
artifactory_url=http://artifactory.enparadigm.com/artifactory/sharpsell
```
:::info
Sharpsell team will give the artifactory_username and artifactory_password. 
:::

2. Add the following lines to the app level `builds.gradle` file.
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

    implementation "com.enparadigm.sharpsell:sdk:$sdkVersion"
}
```

<!-- Youtube and AWS videos here:
<ReactPlayer playing controls url='https://www.youtube.com/watch?v=8Vzv2CdbEY0&list=PLjxrf2q8roU23XGwz3Km7sQZFTdB996iG&index=12&ab_channel=Flutter' />

Assets videos here:
<ReactPlayer playing controls url='/videos/test.mp4'/> -->
