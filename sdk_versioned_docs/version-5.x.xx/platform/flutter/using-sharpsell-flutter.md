---
title: "Using Sharpsell SDK in Flutter"
sidebar_position: 3
slug: "flutter_implementation"
---

# Using Sharpsell SDK in Flutter

## Open Sharpsell

Create a widget that opens Sharpsell. The `Sharpsell().open(route: route)` method returns the widget that displays the Sharpsell SDK.

```dart
import 'package:flutter/material.dart';
import 'package:sharpsell/sharpsell.dart';

class SharpsellScreen extends StatelessWidget {
  String? route;

  SharpsellScreen({Key? key, this.route}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        // Handle back button press if needed
        return true;
      },
      child: FutureBuilder<Widget>(
        builder: (context, snapshot) {
          if (snapshot.hasData && snapshot.data != null) {
            return snapshot.data!;
          }
          return const Center(
            child: CircularProgressIndicator(),
          );
        },
        future: Sharpsell().open(route: route),
      ),
    );
  }
}
```

## Initialize Sharpsell

Initialize the SDK with the company, API key, user, and Firebase token values supplied for your integration.

```dart
Future<void> initSharpsell(String map, {String? route}) async {
  await Sharpsell().initialize(
    initData: jsonEncode({
      "company_code": "YOUR_COMPANY_CODE",
      "sharpsell_api_key": "YOUR_SHARPSELL_API_KEY",
      "user_unique_id": "USER_UNIQUE_ID",
      "fcm_token": "FCM_TOKEN",
    }),
    isFromSDK: true,
    sdkFunction: (path) {
      if (path == "back") {
        // Redirect back to the parent app
        runApp(const MyApp());
      }
    },
  );

  runApp(SharpsellScreen(route: route));
}
```

To return from Sharpsell to the parent app, handle the `"back"` path in `sdkFunction` and run the appropriate parent-app widget.

## Update User Details

You can pass user fields while initializing the SDK to update user details.

:::tip
Confirm the supported user fields with the Sharpsell team before passing them.
:::

```dart
Map<String, dynamic> metaData = {
  "designation": "",
  "branch": "",
  "is_reviewer": "", // "true" or "false"
  "date": "",
};

Map<String, dynamic> reportingToUserMetaData = {
  "designation": "",
  "branch": "",
  "is_reviewer": "",
  "date": "",
};

Map<String, dynamic> reportingData = {
  "identifier_type": "unique_id",
  "first_name": "",
  "last_name": "",
  "phone": "",
  "email": "",
  "external_unique_id": "",
  "profile_image_url": "",
  "user_meta_data": reportingToUserMetaData,
};

Map<String, dynamic> fields = {
  "first_name": "",
  "last_name": "",
  "identifier_type": "unique_id",
  "phone": "",
  "email": "",
  "external_unique_id": "",
  "profile_image_url": "",
  "user_meta_data": metaData,
  "reporting_to": reportingData, // Can be null when the user has no manager
};

Map<String, dynamic> clientData = {
  "type": "",
  // Other custom fields
};

Map<String, dynamic> initialData = {
  "company_code": "YOUR_COMPANY_CODE",
  "sharpsell_api_key": "YOUR_SHARPSELL_API_KEY",
  "user_unique_id": "USER_UNIQUE_ID",
  "fcm_token": "FCM_TOKEN",
  "user_details": fields,
  "client_data": clientData,
  "base_url": "BASE_URL",
};

await Sharpsell().initialize(
  initData: jsonEncode(initialData),
  isFromSDK: true,
  sdkFunction: (path) {
    if (path == "back") {
      // Redirect back to the parent app
      runApp(const MyApp());
    }
  },
);
```

## Open a Specific Route

Pass a deep link in the `route` parameter to open a specific screen in Sharpsell:

```dart
runApp(SharpsellScreen(route: "your_deep_link_here"));
```

Replace `"your_deep_link_here"` with the actual deep link for the screen.

The native host app must also support deep links. Follow the existing [Android deep linking](../android/deeplinking-android.md) and [iOS deep linking](../iOS/deeplinking-ios.md) guides.

## Complete Example

```dart
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:sharpsell/sharpsell.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sharpsell Integration'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            initSharpsell(
              jsonEncode({
                "company_code": "YOUR_COMPANY_CODE",
                "sharpsell_api_key": "YOUR_SHARPSELL_API_KEY",
                "user_unique_id": "USER_UNIQUE_ID",
                "fcm_token": "FCM_TOKEN",
              }),
              route: "your_deep_link_here",
            );
          },
          child: const Text('Open Sharpsell'),
        ),
      ),
    );
  }
}

class SharpsellScreen extends StatelessWidget {
  String? route;

  SharpsellScreen({Key? key, this.route}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        return false;
      },
      child: FutureBuilder<Widget>(
        builder: (context, snapshot) {
          if (snapshot.hasData && snapshot.data != null) {
            return snapshot.data!;
          }
          return const Center(
            child: CircularProgressIndicator(),
          );
        },
        future: Sharpsell().open(route: route),
      ),
    );
  }
}

Future<void> initSharpsell(String map, {String? route}) async {
  await Sharpsell().initialize(
    initData: map,
    isFromSDK: true,
    sdkFunction: (path) {
      if (path == "back" || path == "logout") {
        print("Redirecting back to Parent App");
        runApp(const MyApp());
      }
    },
  );

  runApp(SharpsellScreen(route: route));
}
```

## Initialization Payloads

### User With a Manager

```json
{
  "company_code": "YOUR_COMPANY_CODE",
  "sharpsell_api_key": "YOUR_SHARPSELL_API_KEY",
  "user_unique_id": "USER_UNIQUE_ID_123",
  "fcm_token": "FCM_TOKEN",
  "user_details": {
    "first_name": "John",
    "last_name": "Doe",
    "identifier_type": "unique_id",
    "phone": "1234567890",
    "email": "john.doe@example.com",
    "external_unique_id": "USER_UNIQUE_ID_123",
    "profile_image_url": "https://example.com/johndoe.jpg",
    "user_meta_data": {
      "designation": "Manager",
      "branch": "New York",
      "is_reviewer": "true",
      "date": "2024-08-27"
    },
    "reporting_to": {
      "identifier_type": "unique_id",
      "first_name": "Jane",
      "last_name": "Smith",
      "phone": "0987654321",
      "email": "jane.smith@example.com",
      "external_unique_id": "USER_UNIQUE_ID_456",
      "profile_image_url": "https://example.com/janesmith.jpg",
      "user_meta_data": {
        "designation": "Senior Manager",
        "branch": "New York",
        "is_reviewer": "false",
        "date": "2024-08-27"
      }
    }
  },
  "base_url": "https://yourinstance.sharpselltech.com"
}
```

### User Without a Manager

```json
{
  "company_code": "YOUR_COMPANY_CODE",
  "sharpsell_api_key": "YOUR_SHARPSELL_API_KEY",
  "user_unique_id": "USER_UNIQUE_ID_123",
  "fcm_token": "FCM_TOKEN",
  "user_details": {
    "first_name": "John",
    "last_name": "Doe",
    "identifier_type": "unique_id",
    "phone": "1234567890",
    "email": "john.doe@example.com",
    "external_unique_id": "USER_UNIQUE_ID_123",
    "profile_image_url": "https://example.com/johndoe.jpg",
    "user_meta_data": {
      "designation": "Manager",
      "branch": "New York",
      "is_reviewer": "true",
      "date": "2024-08-27"
    },
    "reporting_to": {}
  },
  "base_url": "https://yourinstance.sharpselltech.com"
}
```

:::note
Passing an empty `reporting_to` object also removes an existing manager mapping.
:::

## Notification Handling

### Initialize Firebase

Initialize Firebase before registering notification listeners:

```dart
Future<void> main() async {
  // Other initialization code
  await Firebase.initializeApp();
  FirebaseMessaging.onBackgroundMessage(_notificationHandler);
  FirebaseMessaging.onMessage.listen(_notificationHandler);
}
```

### Handle Notifications

The notification handler processes messages received while the app is in the foreground or background:

```dart
@pragma('vm:entry-point')
Future<void> _notificationHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
  Log.d('Notification => Received : ${message.data}');
  Sharpsell().showNotification(json.encode(message.data));
}
```

:::tip
Request and verify notification permission before handling notifications.
:::

For the native iOS host configuration, see [iOS Notification Setup](./flutter-ios-notification-setup.md).
