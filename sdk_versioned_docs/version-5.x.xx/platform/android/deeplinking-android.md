---
title: "Deeplinking in Android"
sidebar_position: 4
slug: 'deeplinking-android'
---

## Pre-Requisites
1. All the steps of Sharpsell SDK integration have to be completed before adding deeplinking support.

2. For Android: `assetlinks.json` with a valid package name and signature has to be uploaded on the deeplinking domain at `https://{base-domain}/.well-known/assetlinks.json`.

3. Disable Flutter's default deep linking on the host activity so Sharpsell can handle the URL.

## Step 1: Adding deeplinking URLs in the Android Manifest file.

Add the intent filters on the launcher activity (`singleTop`). Replace the hosts with the domains given by the Sharpsell team.

```xml
<activity
    android:name=".MainActivity"
    android:launchMode="singleTop"
    android:exported="true">
    <meta-data android:name="flutter_deeplinking_enabled" android:value="false" />
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
        <data android:host="*.enparadigmtech.com" android:pathPrefix="/app" />
        <data android:host="*.enparadigmtech.com" android:pathPrefix="/core/v1/verify" />
        <data android:host="*.enparadigmtech.com" android:pathPrefix="/static/authenticate" />
        <data android:host="*.sharpselltech.com" android:pathPrefix="/app" />
        <data android:host="*.sharpselltech.com" android:pathPrefix="/core/v1/verify" />
        <data android:host="*.sharpselltech.com" android:pathPrefix="/static/authenticate" />
    </intent-filter>
</activity>
```

:::note
Sharpsell team will confirm the exact hosts and path prefixes for your company. Do not copy a demo host unless they give you that domain.
:::

## Step 2: Handle the incoming URL in the launcher activity.

Implement `onNewIntent` and call the same handler from `onCreate`. Open Sharpsell only after the user is logged in to your app (use your own login state, not an SDK helper).

```java
public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // Existing onCreate code
        handleIntent(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        handleIntent(intent);
    }

    private void handleIntent(Intent intent) {
        Uri appLinkData = intent.getData();
        if (!isUserLoggedIn()) {
            return;
        }
        if (appLinkData != null) {
            try {
                JSONObject data = new JSONObject();
                data.put("route", appLinkData.toString());
                Sharpsell.INSTANCE.open(MainActivity.this, data.toString());
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
    }
}
```

`isUserLoggedIn()` should check your host app session. Pass the full URL as `route` so Sharpsell can stash an `https` deep link and open the matching screen after SDK login.
