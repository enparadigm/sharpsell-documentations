---
title: 'Data flow'
sidebar_position: 2
sidebar_label: Data flow
slug: data-flow
---

# SDK data flow

Sharpsell SDK integration involves three components:

- **Parent app** — your application that embeds the SDK
- **Sharpsell SDK** — handles authentication, UI, and API calls on the device
- **Sharpsell backend** — validates users, serves features, and manages sessions

The sequence below shows the typical lifecycle from initialization through feature usage to logout.

<img src="/img/sdk-data-flow.png" alt="Sequence diagram: Parent App, Sharpsell SDK, and Sharpsell Backend" width="900" />

## Initialization and login

| Step | From | To | Action |
| --- | --- | --- | --- |
| 1 | Parent app | Sharpsell SDK | Call `initialise(api_key, user_unique_id, base_url, fcm_token)` |
| 2 | Sharpsell SDK | Sharpsell backend | `POST /login` |
| 3 | Sharpsell backend | Sharpsell SDK | Returns auth tokens and user details |

Initialize the SDK before calling any other SDK APIs. The login call establishes the session used for later feature requests.

## Open features and usage

| Step | From | To | Action |
| --- | --- | --- | --- |
| 4 | Parent app | Sharpsell SDK | Call `open(deeplink_url)` to launch a Sharpsell screen or feature |
| 5 | Sharpsell SDK | Sharpsell backend | Feature requests while the user is in the SDK |
| 6 | Sharpsell backend | Sharpsell SDK | Feature responses |

Steps 5 and 6 repeat while the user interacts with Sharpsell features inside your app.

## Logout

| Step | From | To | Action |
| --- | --- | --- | --- |
| 7 | Parent app | Sharpsell SDK | Call `logout()` |
| 8 | Sharpsell SDK | Sharpsell backend | Call the logout API |
| 9 | Sharpsell backend | Sharpsell SDK | Returns success |

On logout, the backend **deletes auth tokens and removes the user session**.

| Step | From | To | Action |
| --- | --- | --- | --- |
| 10 | Sharpsell SDK | Parent app | `sdk_redirect()` — return control to the host app |

Implement handling for `sdk_redirect()` in the parent app so users land in the right place after Sharpsell closes or logs out.

## Related documentation

Platform-specific setup and API usage:

- [Android integration](/category/android)
- [iOS integration](/category/ios)
- [React Native integration](/category/react)
