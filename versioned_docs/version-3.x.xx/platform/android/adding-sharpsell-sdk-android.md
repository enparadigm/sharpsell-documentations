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

    implementation ("com.enparadigm.sharpsell:sdk:$sdkVersion"){
        exclude group: 'io.flutter', module: 'flutter_embedding_debug'
        exclude group: 'io.flutter', module: 'flutter_embedding_profile'
    }
}
```

3. if you are using proguard rules in your app please add the below rules to you `proguard-rules.pro` file because it is not a mandatory step.
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

# Add any other specific rules for your native Android code and dependencies
```

You need the following lines too to your app-level `build.gradle` file for the proguard rules.
```gradle
proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
```

:::info
To refer FAQ if any issue occur [click here](/faq#integration-issues)
:::

[https://developer.android.com/jetpack/androidx/migrate]: https://developer.android.com/jetpack/androidx/migrate