---
title: "Using Sharpsell SDK in React Native"
sidebar_position: 2
slug: 'react_native_implementation'
---
import ReactPlayer from 'react-player';


<br></br>
<ReactPlayer playing controls url='/videos/React_android_usage.mp4'/>
<br></br>

**[Open React sample app](https://github.com/enparadigm/sharpsell_android_sample)**

:::info
Please [enable logs](#enable--disable-logs-in-the-sdk) to debug in case you face any issue in executing the below steps.
:::

## Step 1: Create the SharpSell Engine

Create the Sharpsell Engine with the `Application Context` in the `Application Class`, and also have to add the `getPackages()` method
as shown below to add SharpSellSDKPackage to your application React native packages, below is the code pattern for reference.

```
import com.enparadigm.sharpsell.sdk.Sharpsell;

public class MainApplication extends Application implements ReactApplication {

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
        packages.add(new SharpSellSDKPackage());
      return packages;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        ApplicationLifecycleDispatcher.onApplicationCreate(this);
        Sharpsell.INSTANCE.createSharpsellEngine(this);
    }
}
```


## Step 2: Initializing the SDK

The SDK has to be initialized before calling any other methods of the SDK. On calling the `Sharpsell.initialize` method, a success or failure status will be returned via a callback.
A sample code on how to initialize the SDK is given below.

```
Sharpsell.INSTANCE.initialize()
```


## Step 3: Adding Sharpsell SDK Entry points

:::note
Make sure to call ` Sharpsell.INSTANCE.initialize` function before calling any other below-mentioned entry points.
:::

To make Sharpsell SDK entry points, the user should create another .java file where we call the package `SharpSellSDKPackage` which we made earlier.

```
package com.myreactnative;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.annotation.SuppressLint;
import android.util.Log;
import android.widget.Toast;
import com.enparadigm.sharpsell.sdk.ErrorListener;
import com.enparadigm.sharpsell.sdk.Sharpsell;
import com.enparadigm.sharpsell.sdk.SuccessListener;
import org.jetbrains.annotations.Nullable;
import org.json.JSONObject;

public class SharpSellSDK extends ReactContextBaseJavaModule {
    
    //constructor
    public SharpSellSDK(ReactApplicationContext reactContext) {
        super(reactContext);
    }
    //Mandatory function getName that specifies the module name
    @Override
    public String getName() {
        return "SharpSellSDK";
    };

    public String getData(String obj){
    try{
        JSONObject objData = new JSONObject(obj);
        JSONObject data = new JSONObject();
        data.put("company_code", "company_code");
        data.put("user_unique_id", "unique ser identifier);
        data.put("user_group_id", 1);
        data.put("country_code", ""); 
        data.put("name", "Test User");
        data.put("mobile_number", '8888888888');
        data.put("email", "test@test.com"));
        data.put("fcm_token", fcmToken);

        return data.toString();
    } catch(Exception e){
        e.printStackTrace();
    };
    return "";
    };
}
```

:::note
Sharpsell team will provide the following items.
1. company_code
2. user_group_id
:::

In the above file, you have to add the below entry points.


### Home Screen

To open Sharpsell home screen from your app, user have to create a reactmethod in `SharpSellSDK` class like below from.

```
//Custom function that we are going to export to JS
// Home Screen
@ReactMethod
public void getHomeScreen(String data) {
    try{
        Sharpsell.INSTANCE.enableLogsInProductionSdk(getReactApplicationContext(),true);
        String objData = getData(data);
        Sharpsell.INSTANCE.initialize(
            getReactApplicationContext(),
            objData,
            new SuccessListener() {
                @Override
                public void onSuccess() {
                    Sharpsell.INSTANCE.open(getReactApplicationContext(), null);
                }
            },
            new ErrorListener<String>() {
                @Override
                public void onError(@Nullable String error) {
                }
            }
        );
    } catch (Exception e){
        e.printStackTrace();
    }
    
};
```

And to call the above method from your app.js, here is a below example of our app.js file, `openHomePage` is a simple button
which will give access to call `getHomeScreen(object)` method.

```
import messaging from '@react-native-firebase/messaging';

<Button title='Open Home Page' onPress={openHomePage}></Button>

const openHomePage = async () => {
    const fcmToken = await messaging().getToken();
    const data = await getUserInfo();
    SharpSellSDK.getHomeScreen(data)
  };
```

### Presentation Screen
To open the Sharpsell customer presentation screen from your app use the below function


```
JSONObject data = new JSONObject();
data.put("route", "product_presentation_input");
Sharpsell.INSTANCE.open(getReactApplicationContext(), dataPS.toString());
```

:::note
We need to pass proper `presentationInputName` and input fields as per the presentation. 
If the presentation input name is not valid then it will just open the customer presentation screen.
:::


### Launchpad Screen
To open the Sharpsell launchpad screen from your app use the below function

```
JSONObject data = new JSONObject();
data.put("route", "launchpad");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```


### Marketing Collateral Screen
To open the Sharpsell marketing collateral directory screen from your app use the below function


```
JSONObject data = new JSONObject();
data.put("route", "mc_directory");

Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```

#### Custom Marketing Collateral Directory Screen
Sharpsell also has the ability to open a specific directory directly without going through the marketing collateral.
To open the custom mappped directory screen from your app use the below function

:::info

Contact sharpsell team before integrating the custom directory as it has to be mapped first by them. They will provide you the value to pass in ``entry_point``.

:::

```
JSONObject data = new JSONObject();
data.put("route", "mc_directory");

data.put("entry_point", 1); //sample

Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```

### Poster of the day Screen
To open the Sharpsell poster of the day screen from your app use the below function

```
JSONObject data = new JSONObject();
data.put("route", "potd");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```


### Digital Visiting Card Screen
To open the Sharpsell digital visiting card screen from your app use the below function

```
JSONObject data = new JSONObject();
data.put("route", "dvc");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```


### Timer Challenge Home Screen
To open the Sharpsell timer challenge screen from your app use the below function

```
JSONObject data = new JSONObject();
data.put("route", "tc_home");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```


### Product Bundle Screen
To open the Sharpsell product bundle screen from your app use the below function

```
JSONObject data = new JSONObject();
data.put("route", "product_bundle");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```


### Quick Links Screen

To open Sharpsell quick links screen from your app use the below function

```
JSONObject data = new JSONObject();
data.put("route", "quick_links");
Sharpsell.INSTANCE.open(getReactApplicationContext(), data.toString());
```


### Logout and clear user data
Call the sharp sell clear data function while the user is logged out form 

```
Sharpsell.INSTANCE.clearData(getReactApplicationContext());
```


## Step 4: Handling Notification
Sharpsell notifications can be handled in the `FirebaseMessagingService` class.

```
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
Make sure you are sending fcm token to Sharpsell SDK via `Sharpsell.INSTANCE.initialize` function as one of the arguments. If fcm token is not sent then, you won't be receiving any Sharpsell notifications
:::

## Enable / Disable logs in the SDK
This method can be called just before `Sharpsell.INSTANCE.initialize`.
Pass `true` to enable logs.
Pass `false` to disable logs.

```
Sharpsell.INSTANCE.enableLogsInProductionSdk(getReactApplicationContext(), true);
```

