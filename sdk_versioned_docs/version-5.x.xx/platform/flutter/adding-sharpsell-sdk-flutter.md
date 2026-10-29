---
title: "Setup"
sidebar_position: 2
slug: "flutter_setup"
---

# Sharpsell Flutter Plugin Integration

## Pre-Requisites

### Flutter Version

```yaml
environment:
  sdk: ">=3.1.2 <4.0.0"
  flutter: ">=3.32.8"
```

### Firebase Setup

:::info
Firebase must be configured in the Flutter app before integrating Sharpsell.

Follow the official [Add Firebase to your Flutter app](https://firebase.google.com/docs/flutter/setup) guide.
:::

## Add the Sharpsell Package

Add the Sharpsell package to your `pubspec.yaml` file using the Sharpsell Flutter plugin GitHub repository:

```yaml
dependencies:
  sharpsell:
    git:
      url: https://github.com/enparadigm/sharpsell-flutter-package.git
      path: sharpsell
      ref: v3.24.1
```

Install the dependency:

```bash
flutter pub get
```
