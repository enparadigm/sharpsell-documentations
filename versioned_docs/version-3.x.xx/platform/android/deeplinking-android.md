---
title: "Deeplinking in Android"
sidebar_position: 4
slug: 'deeplinking-android'
---

## Pre-Requisites
1. All the steps of Sharpsell sdk integrations has to be completed before adding deeplinking support.

2. For Android : Assetlinks.json with valid package name and signature has to be uploaded on deeplinking domain in following path (https://{base-domain}/.well-known/assetlinks.json)

3. For iOS : apple-app-site-association with valid app identifier and team Id has to be uploaded on deeplinking domain on following path ([https://{base-domain}/apple-app-site-association](https://enparadigmtech.com/apple-app-site-association))


## Step 1: Adding Deeplinking urls in Android Manifest file.

Create the Sharpsell Engine with the `Application Context` in the `Application Class`.

```
<activity
            android:name=".ACTIVITY NAME"
            android:launchMode="singleTop"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />

                <data android:scheme="http" />
                <data android:scheme="https" />
                <data android:host="sharpsell-demo-dev.enparadigmtech.com" />
//above is deeplinking the host url 
            
            </intent-filter>
        </activity>
```

## Step 2: need to implement onNewIntent method in first launcher activity ( mostly MainActivity). same handling must to be added inside onCreate method.

```java
public class MainActivity extends AppCompatActivity  {
    
    @Override
    onCreate(@Nullable Bundle savedInstanceState) {
        /***
         Existining code of onCreate
         ***/

        handleIntent(getIntent());
    }

    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        handleIntent(intent);
    }

    private void handleIntent(Intent intent) {
        String appLinkAction = intent.getAction();
        Uri appLinkData = intent.getData();
        if(PrefHelper.INSTANCE.isLoggedIn(this)) {
            if (appLinkData != null) {
                String url = appLinkData.toString();
                try {
                    Log.d("URL", url);
                    JSONObject data = new JSONObject();
                    data.put("route", url);
                    Sharpsell.INSTANCE.open(MainActivity.this, data.toString());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
        else {
            Log.d("URL","USER NOT LOGGED IN");
        }
    }
}
```
 