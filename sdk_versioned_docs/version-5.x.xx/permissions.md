---
title: 'Permissions'
sidebar_position: 2
sidebar_label: Permissions
slug: permissions
---

# SDK permissions

The Sharpsell SDK requests a permission only when a feature needs it. Declare the permissions below in the host app. React Native and Flutter use the same Android and iOS declarations.

## Android

Add these permissions to the host app `AndroidManifest.xml`.

| Declared permission | Modules | Purpose |
| --- | --- | --- |
| `android.permission.CAMERA` | Core, Launchpad, Pitchwiz, Insights, LMS | Profile picture, presentation images, course image, roleplay video, insight video, activity-form photos |
| `android.permission.READ_CONTACTS` | Core | Autofill a contact when sharing or building a presentation |
| `android.permission.RECORD_AUDIO` | Pitchwiz, Insights, Co-Pilot, LMS | Roleplay audio, insight video audio, voice assistant, LMS voice bot |
| `android.permission.ACCESS_FINE_LOCATION` | LMS | Precise location for meetings, visits, and field activities |
| `android.permission.ACCESS_COARSE_LOCATION` | LMS | Approximate location for meetings, visits, and field activities |
| `android.permission.POST_NOTIFICATIONS` | Core, Pitchwiz | Push and local notifications |
| `android.permission.READ_EXTERNAL_STORAGE` | Insights, LMS | Attach an existing file (Android 12 and below) |
| `android.permission.MODIFY_AUDIO_SETTINGS` | Pitchwiz, Insights, Co-Pilot, LMS | Speaker / mic routing during recording |
| `android.permission.FOREGROUND_SERVICE` | Pitchwiz | Keep a roleplay recording or its notification running |

## iOS

Add these keys to the host app `Info.plist`. Missing usage descriptions can cause an App Store rejection.

| Declared permission | Modules | Purpose |
| --- | --- | --- |
| `NSCameraUsageDescription` | Core, Launchpad, Pitchwiz, Insights, LMS | Profile picture, presentation images, course image, roleplay video, insight video, activity-form photos |
| `NSContactsUsageDescription` | Core | Autofill a contact when sharing or building a presentation |
| `NSMicrophoneUsageDescription` | Pitchwiz, Insights, Co-Pilot, LMS | Roleplay audio, insight video audio, voice assistant, LMS voice bot |
| `NSLocationWhenInUseUsageDescription` | LMS | Location while the app is in use for meetings, visits, and field activities |
| `NSLocationTemporaryUsageDescriptionDictionary.PreciseLocationCapture` | LMS | One-time precise location for meetings, visits, and field activities |
| `UIBackgroundModes` (`remote-notification`, `fetch`) | Core, Pitchwiz | Push and local notifications |
| `NSPhotoLibraryUsageDescription` | Core, Launchpad, Insights, LMS | Pick a photo or video from the gallery |
| `NSUserTrackingUsageDescription` | Core | Crash and usage analytics |

## Related documentation

Platform setup that uses these permissions:

- [Android integration](/category/android)
- [iOS integration](/category/ios)
- [React Native integration](/category/react)
- [Flutter integration](/category/flutter)
