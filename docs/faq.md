---
title: ''
sidebar_position: 4
slug: "faq"
sidebar_label: 'FAQ'
---

## Integration issues

### Android

<details>
<summary>Caused by: org.gradle.api.resources.ResourceException: Could not get resource</summary>

When the artifactory URL is down you will get this error. If so, please wait for sometime. Usally it will be up in few mins. If you are facing the issue in long time, please reach sharpsell team if the above resolution is not fixing your issues.
</details>



<details>
<summary>I want to integrate Sharpsell SDK, what if my app’s target android version is different from that of Sharpsell?</summary>

There is something called `<uses-sdk/>` contained in `<manifest>` which lets you express an application's compatibility with one or more versions of the Android platform, by means of an API Level integer. The API Level expressed by an application will be compared to the API Level of a given Android system, which may vary among different Android devices.

</details>

### iOS

<details>
<summary>App is not running in simulator, but running in real devices</summary>

In iOS, in order to run the sharpsell SDK in simulator then you have to use Debug version of the Sharpsell SDK XC frameworks which is provided by the sharpsell team.

If you try to run the app usinf release Sharpsell SDK XC frameworks in simulator then you will get errors.

Make sure you are added release version of framework while pushing your app to app store connect.
</details>


## Initialization issues 

<details>
<summary>Getting 'Something went wrong' error screen after calling open function !!</summary>

If the launch pad is enabled and if there is any error in server then you will get 'Something went wroing error'

We have to enable launchpad for the particular company which we are trying to login.Please reach sharpsell team for this issue.
</details>

<details>
<summary>Invalid - Specific mobile number or email already exist</summary>

This error will be shown if the passed email id or the mobile number is already assigned to any other user. Email id and mobile number should be unique to the particular user which you are trying to login.
</details>

<details>
<summary>Oh snap! Invalid email address</summary>

If you not mainting user email id or it is not mandatory for your platform then you should pass the email field as empty. 

If you pass null or "null" then server will send invalid email address
</details>

<details>
<summary>Notification not recived</summary>

As mentioned in the document, you have to pass the fcm token to sharpsell sdk.

Even after passing the fcm key you are not reciving any push notification which is triggred on shrpsell admin pannel then check your firebase integration on your app, if it integrated properly as mentioned in firebase docuementation. 

Please reach sharpsell team if the above resolution is not fixing your issues.
</details>

## Data issues

<details>
<summary>Sync Failed</summary>
Usally there is multiple reasons why sync will be failed

1. If there is no proper internet connection then if you try to download some content on sync then sync may get failed.

2. If the content which is added have some broken or not a vaild images (which is used in thumbnails or sales bundle etc) then sync will be failed. In this case, enable sharpsell log and sync then check console to get what file is exactly failing to get downloaded. Once you got the fail source then connect with your content team to get it resolved.

Please reach sharpsell team if any of the resolution is not fixing your issues.
</details>

<details>
<summary>Data not reflecting which is updated in the admin pannel</summary>

In admin pannel, once the data is added then admin have to publish the changes using the publish button which is given on the admin website. 

In mobile app, published data will be synced automatically when they open the app from the closed state. In the app foreground state, to get published data user have to sync the app by clicking the sync button
</details>
