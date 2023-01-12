---
title: 'Setup'
sidebar_position: 1
slug: 'react_native_setup'
---
import ReactPlayer from 'react-player';

# Sharpsell SDK Integration

<ReactPlayer playing controls url='/videos/React_android_integration.mp4'/>

<br></br>

**[Open React sample app](https://github.com/enparadigm/sharpsell_reactnative_full)**


## Pre-Requisites
1. The application should be migrated to AndroidX. Check if the following line is present in the project level `gradle.properties`. If this line is not present, the project needs to be migrated to [androidX](https://developer.android.com/jetpack/androidx/migrate).

```gradle
android.useAndroidX=true
```
2. The minimum android SDK version should be at least 21.
```gradle
minSdkVersion 21
```

3. Firebase should be enabled and the `google-seriveces.json` file should be properly set up.

:::tip Firebase setup
Firebase setup has to be done in order to enable push notification and analytics on Sharpsell SDK.
To set up android firebase setup follow this - https://rnfirebase.io/
:::

## Installation
1. Add the following lines to the project-level `builds.gradle` file.
```gradle
allprojects {
    configurations.all {
        resolutionStrategy {
            force "com.facebook.react:react-native:" + REACT_NATIVE_VERSION
        }
    }
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
        mavenCentral()
        jcenter()
        maven { url 'https://storage.googleapis.com/download.flutter.io' }
        maven { url "https://jitpack.io" }
        maven { url "https://maven.google.com" }
        maven {
            url 'http://artifactory.enparadigm.com/artifactory/sharpsell'
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

## Creating Package

Also, you have to create a .java file in `android/app/src/main/java` as SharpsellSDKPackage.java have to create the SDK into the package so that you can access the native modules using this package. These are steps recommended by react native 

```
package com.myreactnative;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class SharpSellSDKPackage implements ReactPackage  {
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