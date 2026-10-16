---
title: "Using Sharpsell SDK in React Native"
sidebar_position: 2
slug: 'react_native_implementation'
---
import ReactPlayer from 'react-player';


<br></br>
<ReactPlayer playing controls url='/videos/React_android_usage.mp4'/>
<br></br>

React Native Android hosts the Sharpsell **Android SDK**. The Java API is the same as native Android: `com.enparadigm.sharpsell.sdk.Sharpsell`.

## Step 1: Create the SharpSell Engine

Create the Sharpsell Engine with the `Application` context in `MainApplication`, and add `SharpSellSDKPackage` to the React Native package list.

```java
import com.enparadigm.sharpsell.sdk.Sharpsell;

public class MainApplication extends Application implements ReactApplication {

    @Override
    protected List<ReactPackage> getPackages() {
      List<ReactPackage> packages = new PackageList(this).getPackages();
      packages.add(new SharpSellSDKPackage());
      return packages;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        Sharpsell.INSTANCE.createSharpsellEngine(this);
    }
}
```

## Step 2: Initializing the SDK

`initialize` requires a `Context`, a JSON **string**, a success listener, and an error listener. Do not call `Sharpsell.INSTANCE.initialize()` with no arguments.

Create `SharpSellSDK.java` as a native module:

```java
package com.myreactnative;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

import com.enparadigm.sharpsell.sdk.ErrorListener;
import com.enparadigm.sharpsell.sdk.Sharpsell;
import com.enparadigm.sharpsell.sdk.SuccessListener;
import org.jetbrains.annotations.Nullable;
import org.json.JSONObject;

public class SharpSellSDK extends ReactContextBaseJavaModule {

    public SharpSellSDK(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "SharpSellSDK";
    }

    private String buildInitPayload(String obj, String fcmToken) {
        try {
            JSONObject objData = new JSONObject(obj);
            JSONObject data = new JSONObject();
            data.put("company_code", objData.optString("company_code"));
            data.put("base_url", objData.optString("base_url"));
            data.put("sharpsell_api_key", objData.optString("sharpsell_api_key"));
            data.put("user_unique_id", objData.optString("user_unique_id"));
            data.put("fcm_token", fcmToken);
            if (objData.has("user_details")) {
                data.put("user_details", objData.get("user_details"));
            }
            if (objData.has("client_data")) {
                data.put("client_data", objData.get("client_data"));
            }
            return data.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }
}
```

:::note
Sharpsell team will provide the following items.
1. company_code
2. sharpsell_api_key
3. base_url (if required for your company)
:::

`company_code`, `sharpsell_api_key`, and `user_unique_id` are mandatory. `user_details` and `client_data` are optional. Confirm field names with the Sharpsell team before sending `user_details`.

## Step 3: Adding Sharpsell SDK Entry points

:::note
Call `Sharpsell.INSTANCE.initialize` successfully before opening any screen.
:::

### Home Screen

```java
@ReactMethod
public void getHomeScreen(String data, String fcmToken, Promise promise) {
    try {
        Sharpsell.INSTANCE.enableLogsInProductionSdk(getReactApplicationContext(), true);
        String objData = buildInitPayload(data, fcmToken);
        Sharpsell.INSTANCE.initialize(
            getReactApplicationContext(),
            objData,
            new SuccessListener() {
                @Override
                public void onSuccess() {
                    Sharpsell.INSTANCE.open(getReactApplicationContext(), null);
                    promise.resolve(true);
                }
            },
            new ErrorListener<String>() {
                @Override
                public void onError(@Nullable String error) {
                    promise.reject("INIT_FAILED", error);
                }
            }
        );
    } catch (Exception e) {
        promise.reject("OPEN_HOME_FAILED", e);
    }
}
```

Call it from JavaScript:

```js
import { NativeModules } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const { SharpSellSDK } = NativeModules;

const openHomePage = async () => {
  const fcmToken = await messaging().getToken();
  const data = await getUserInfo();
  SharpSellSDK.getHomeScreen(JSON.stringify(data), fcmToken);
};
```

If you are not using React Native Firebase, pass the FCM token from Google Play services the same way the native Android sample does.

### Presentation Screen

```java
JSONObject data = new JSONObject();
data.put("route", "productPresentationInput");
data.put("presentation_name", "presentation name");
data.put("input_one", "input value for field one");
data.put("input_two", "input value for field two");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```

:::note
Pass a valid `presentation_name` and input fields as per the presentation.
If the presentation name is not valid then it will just open the customer presentation screen.
:::

### Launchpad Screen

```java
JSONObject data = new JSONObject();
data.put("route", "launchpad");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```

### Marketing Collateral Screen

```java
JSONObject data = new JSONObject();
data.put("route", "mcDirectory");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```

#### Custom Marketing Collateral Directory Screen

:::info
Contact the Sharpsell team before integrating the custom directory. They will provide the value to pass in `entry_point`.
:::

```java
JSONObject data = new JSONObject();
data.put("route", "mcDirectory");
data.put("entry_point", "1"); // directory id provided by the Sharpsell team
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```

### Poster of the day Screen

```java
JSONObject data = new JSONObject();
data.put("route", "potd");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```

### Digital Visiting Card Screen

```java
JSONObject data = new JSONObject();
data.put("route", "dvc");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```

### Timer Challenge Home Screen

```java
JSONObject data = new JSONObject();
data.put("route", "tcHome");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```

### Product Bundle Screen

```java
JSONObject data = new JSONObject();
data.put("route", "productBundle");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```

### Quick Links Screen

```java
JSONObject data = new JSONObject();
data.put("route", "quickLinks");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```

### Your Progress Screen

```java
JSONObject data = new JSONObject();
data.put("route", "yourProgress");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```

### PitchWiz Screen

```java
JSONObject data = new JSONObject();
data.put("route", "pitchWiz");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```

### Profile Screen

```java
JSONObject data = new JSONObject();
data.put("route", "profile");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```

### Logout and clear user data

```java
Sharpsell.INSTANCE.clearData(getReactApplicationContext());
```

## Step 4: Handling Notification

Sharpsell notifications can be handled in the `FirebaseMessagingService` class.

```java
@Override
public void onMessageReceived(@NonNull RemoteMessage remoteMessage) {
    super.onMessageReceived(remoteMessage);
    String data = new JSONObject(remoteMessage.getData()).toString();
    Sharpsell.INSTANCE.isSharpsellNotification(
            getApplicationContext(),
            data,
            new ResultListener<Boolean>() {
                @Override
                public void onResult(Boolean result) {
                    if (result) {
                        Sharpsell.INSTANCE.showNotification(getApplicationContext(), data);
                    } else {
                        // show your own notification
                    }
                }
            }
    );
}
```

:::caution
Pass the FCM token to `Sharpsell.INSTANCE.initialize`. If the token is missing, Sharpsell notifications will not arrive.
:::

## Enable / Disable logs in the SDK

Call this after `createSharpsellEngine` and before or with `initialize`.
Pass `true` to enable logs.
Pass `false` to disable logs.

```java
Sharpsell.INSTANCE.enableLogsInProductionSdk(getReactApplicationContext(), true);
```
