---
title: "Using Sharpsell SDK in Android"
sidebar_position: 3
slug: 'android_implementation'
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Step 1: Create the SharpSell Engine

Create the Sharpsell Engine with the `Application Context` in the `Application Class`.


```mdx-code-block
<Tabs>
<TabItem value="Java">
```

```java
public class MyApp extends Application  {
    @Override
    public void onCreate() {
        super.onCreate();
        Sharpsell.INSTANCE.createSharpsellEngine(this);
    }
}
```

```mdx-code-block
</TabItem>
<TabItem value="Kotlin">
```

```kotlin
class MyApp : Application() {
    override fun onCreate() {
        super.onCreate()
        Sharpsell.createSharpsellEngine(this);
    }
}
```

```mdx-code-block
</TabItem>
</Tabs>
```


## Step 2: Initializing the SDK

The SDK has to be initialized before calling any other methods of the SDK. On calling the `Sharpsell.initialize` method, a success or failure status will be returned via a callback.
A sample code on how to initialize the SDK is given below.


```mdx-code-block
<Tabs>
<TabItem value="Java">
```


```java
// sample user meta data
// this data can be used to update or create user meta details, if you don't have user meta then pass it as empty string


JSONObject data = new JSONObject();
data.put("company_code", "company Code"); // Company code given to you by sharpsell team
data.put("sharpsell_api_key", "sharpsell api key"); // API Key given by the sharpsell team
data.put("user_unique_id", "");  // User unique id or user external id which is the id of the user which you are trying to login
//Pass the below key to enable push notification to be recived on your device
data.put("fcm_token", fcmToken);

Sharpsell.INSTANCE.initialize(
        MainActivity.this,
        data.toString(),
        new SuccessListener() {
            @Override
            public void onSuccess() {
                // Successfully Initialized
                // Other SDK methods can be called now
            }
        },
        new ErrorListener<String>() {
            @Override
            public void onError(@Nullable String error) {
                Toast.makeText(MainActivity.this, "Initialization Failed : " + error, Toast.LENGTH_LONG).show();
            }
        }
);
```

```mdx-code-block
</TabItem>
<TabItem value="Kotlin">
```

```java
// sample user meta data
// this data can be used to update or create user meta details, if you don't have user meta then pass it as empty string


val data = JSONObject()
data.put("company_code", "company Code"); // Company code given to you by sharpsell team
data.put("sharpsell_api_key", "sharpsell api key"); // API Key given by the sharpsell team
data.put("user_unique_id", "");  // User unique id or user external id which is the id of the user which you are trying to login
//Pass the below key to enable push notification to be recived on your device
data.put("fcm_token", fcmToken);

Sharpsell.initialize(
            this@MainActivity,
            data,
            object : SuccessListener {
                override fun onSuccess() {
                    // Successfully Initialized
                    // Other SDK methods can be called now
                }
            },
            object : ErrorListener<String> {
                override fun onError(error: String?) {
                    Toast.makeText(
                        this@MainActivity,
                        "Initialization Failed : $error",
                        Toast.LENGTH_LONG
                    ).show()
                }
            }
        )
```

```mdx-code-block
</TabItem>
</Tabs>
```

:::note
Sharpsell team will provide the following items.
1. company_code
2. sharpsell_api_key
:::

## Step 3: Handling Notification
Sharpsell notifications can be handled in the `FirebaseMessagingService` class.



```mdx-code-block
<Tabs>
<TabItem value="Java">
```

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


```mdx-code-block
</TabItem>
<TabItem value="Kotlin">
```

```kotlin
override fun onMessageReceived(remoteMessage: RemoteMessage) {
        super.onMessageReceived(remoteMessage)
        
        val data = JSONObject(remoteMessage.data as Map<*, *>).toString()
        Sharpsell.isSharpsellNotification(
            applicationContext,
            data,
            object : ResultListener<Boolean> {
                override fun onResult(result: Boolean) {
                    if (result) {
                        Sharpsell.showNotification(applicationContext, data)
                    } else {
                        // show your own notification
                    }
                }
            })
    }
```

```mdx-code-block
</TabItem>
</Tabs>
```


## Step 4: Adding Sharpsell SDK Entry points

:::note
Make sure to call ` Sharpsell.INSTANCE.initialize` function before calling any other below-mentioned entry points.
:::


### Home Screen

To open Sharpsell home screen from your app use the below function

```mdx-code-block
<Tabs>
<TabItem value="Java">
```

```java
Sharpsell.INSTANCE.open(MainActivity.this, null);
```

```mdx-code-block
</TabItem>
<TabItem value="Kotlin">
```

```
Sharpsell.open(this@MainActivity)
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Presentation Screen

To open Sharpsell customer presentation screen from your app use the below function


```mdx-code-block
<Tabs>
<TabItem value="Java">
```

```java
JSONObject data = new JSONObject();
data.put("route", "productPresentationInput");
data.put("presentation_name", "presentation name");
data.put("input_one", "input value for field one");
data.put("input_two", "input value for field two");
Sharpsell.INSTANCE.open(MainActivity.this, data.toString());
```


```mdx-code-block
</TabItem>
<TabItem value="Kotlin">
```

```kotlin
val data = JSONObject()
data.put("route", "productPresentationInput")
data.put("presentation_name", "presentation name")
data.put("input_one", "input value for field one")
data.put("input_two", "input value for field two")
Sharpsell.open(this@MainActivity, data.toString())
```

```mdx-code-block
</TabItem>
</Tabs>
```

:::note
We need to pass proper `presentationInputName` and input fields as per the presentation. 
If the presentation input name is not valid then it will just open the customer presentation screen.
:::

### Launchpad Screen

To open Sharpsell launchpad screen from your app use the below function

```mdx-code-block
<Tabs>
<TabItem value="Java">
```

```java
JSONObject data = new JSONObject();
data.put("route", "launchpad");
Sharpsell.INSTANCE.open(MainActivity.this, data.toString());
```

```mdx-code-block
</TabItem>
<TabItem value="Kotlin">
```

```kotlin
val data = JSONObject()
data.put("route", "launchpad")
Sharpsell.open(this@MainActivity, data.toString())
```

```mdx-code-block
</TabItem>
</Tabs>
```



### Marketing Collateral Screen

To open Sharpsell marketing collateral directory screen from your app use the below function

```mdx-code-block
<Tabs>
<TabItem value="Java">
```

```java
JSONObject data = new JSONObject();
data.put("route", "mcDirectory");

Sharpsell.INSTANCE.open(MainActivity.this, data.toString());
```

```mdx-code-block
</TabItem>
<TabItem value="Kotlin">
```

```kotlin
val data = JSONObject()
data.put("route", "mcDirectory")

Sharpsell.open(this@MainActivity, data.toString())
```

```mdx-code-block
</TabItem>
</Tabs>
```

#### Custom Marketing Collateral Directory Screen
Sharpsell also has the ability to open a specific marketing collateral directory directly without going through the marketing collateral screen.
To open the custom mappped directory screen from your app use the below function (all we need to do is add an entry point along with the 'mcDirectory' route)

:::info

Contact sharpsell team before integrating the custom directory as it has to be mapped first by them. They will provide you the value to pass in ``app_url``.

:::

```mdx-code-block
<Tabs>
<TabItem value="Java">
```

```java
JSONObject data = new JSONObject();
data.put("route", "mcDirectory");
data.put("app_url", ""); // value added here is for sample and sharpsell team can you help you getting the custom url 

Sharpsell.INSTANCE.open(MainActivity.this, data.toString());
```

```mdx-code-block
</TabItem>
<TabItem value="Kotlin">
```

```kotlin
val data = JSONObject()
data.put("route", "mcDirectory")
data.put("app_url", "") // value added here is for sample

Sharpsell.open(this@MainActivity, data.toString())
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Poster of the day Screen

To open Sharpsell poster of the day screen from your app use the below function

```mdx-code-block
<Tabs>
<TabItem value="Java">
```

```java
JSONObject data = new JSONObject();
data.put("route", "potd");
Sharpsell.INSTANCE.open(MainActivity.this, data.toString());
```

```mdx-code-block
</TabItem>
<TabItem value="Kotlin">
```

```kotlin
val data = JSONObject()
data.put("route", "potd")
Sharpsell.open(this@MainActivity, data.toString())
```

```mdx-code-block
</TabItem>
</Tabs>
```



### Digital Visiting Card Screen

To open Sharpsell digital visiting card screen from your app use the below function

```mdx-code-block
<Tabs>
<TabItem value="Java">
```

```java
JSONObject data = new JSONObject();
data.put("route", "dvc");
Sharpsell.INSTANCE.open(MainActivity.this, data.toString());
```

```mdx-code-block
</TabItem>
<TabItem value="Kotlin">
```

```kotlin
val data = JSONObject()
data.put("route", "dvc")
Sharpsell.open(this@MainActivity, data.toString())
```

```mdx-code-block
</TabItem>
</Tabs>
```



### Timer Challenge Home Screen

To open Sharpsell timer challenge screen from your app use the below function

```mdx-code-block
<Tabs>
<TabItem value="Java">
```

```java
JSONObject data = new JSONObject();
data.put("route", "tcHome");
Sharpsell.INSTANCE.open(MainActivity.this, data.toString());
```

```mdx-code-block
</TabItem>
<TabItem value="Kotlin">
```

```kotlin
val data = JSONObject()
data.put("route", "tcHome")
Sharpsell.open(this@MainActivity, data.toString())
```

```mdx-code-block
</TabItem>
</Tabs>
```



### Product Bundle Screen

To open the Sharpsell product bundle screen from your app use the below function

```mdx-code-block
<Tabs>
<TabItem value="Java">
```

```java
JSONObject data = new JSONObject();
data.put("route", "productBundle");
Sharpsell.INSTANCE.open(MainActivity.this, data.toString());
```

```mdx-code-block
</TabItem>
<TabItem value="Kotlin">
```

```kotlin
val data = JSONObject()
data.put("route", "productBundle")
Sharpsell.open(this@MainActivity, data.toString())
```

```mdx-code-block
</TabItem>
</Tabs>
```



### Quick Links Screen

To open Sharpsell quick links screen from your app use the below function

```mdx-code-block
<Tabs>
<TabItem value="Java">
```

```java
JSONObject data = new JSONObject();
data.put("route", "quickLinks");
Sharpsell.INSTANCE.open(MainActivity.this, data.toString());
```

```mdx-code-block
</TabItem>
<TabItem value="Kotlin">
```

```kotlin
val data = JSONObject()
data.put("route", "quickLinks")
Sharpsell.open(this@MainActivity, data.toString())
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Logout and clear user data
Call the Sharpsell clear data function while the user is logged out form 

```mdx-code-block
<Tabs>
<TabItem value="Java">
```

```java
Sharpsell.INSTANCE.clearData(MainActivity.this);
```

```mdx-code-block
</TabItem>
<TabItem value="Kotlin">
```

```
Sharpsell.clearData(this@MainActivity)
```

```mdx-code-block
</TabItem>
</Tabs>
```



:::caution
Make sure you are sending fcm token to Sharpsell SDK via `Sharpsell.INSTANCE.initialize` function as one of the arguments. If fcm token is not sent then, you won't be receiving any Sharpsell notifications
:::

## Enable / Disable logs in the SDK
This method can be called just before `Sharpsell.INSTANCE.initialize`.
Pass `true` to enable logs.
Pass `false` to disable logs.

```mdx-code-block
<Tabs>
<TabItem value="Java">
```

```java
Sharpsell.INSTANCE.enableLogsInProductionSdk(MainActivity.this, true);
```

```mdx-code-block
</TabItem>
<TabItem value="Kotlin">
```

```
Sharpsell.INSTANCE.enableLogsInProductionSdk(MainActivity.this, true)
```

```mdx-code-block
</TabItem>
</Tabs>
```

