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

When the artifactory URL is down you will get this error. If so, please wait for some time. Usually, it will be up in a few mins. If you are facing the issue for a long time, please reach Sharpsell team if the above resolution is not fixing your issues.
</details>



<details>
<summary>I want to integrate Sharpsell SDK, what if my app’s target android version is different from that of Sharpsell?</summary>

There is something called `<uses-sdk/>` contained in `<manifest>` which lets you express an application's compatibility with one or more versions of the Android platform, using an API Level integer. The API Level expressed by an application will be compared to the API Level of a given Android system, which may vary among different Android devices.

</details>

### iOS

<details>
<summary>App is not running in the simulator, but running in real devices</summary>

In iOS, to run the Sharpsell SDK in the simulator then you have to use Debug version of the Sharpsell SDK XC frameworks which is provided by the Sharpsell team.

If you try to run the app using the `Release` Sharpsell SDK XC frameworks in the simulator then you will get errors.

Make sure you are adding `Release` version of the framework while pushing your app to the app store connect.
</details>


## Initialization issues 

<details>
<summary>Getting 'Something went wrong' error screen after calling open function !!</summary>

If the launch pad is enabled and if there is any error in the server then you will get the 'Something went wrong error'

We have to enable launchpad for the particular company to which we are trying to login. Please reach Sharpsell team for this issue.
</details>

<details>
<summary>Invalid - Specific mobile number or email already exist</summary>

This error will be shown if the passed email id or the mobile number is already assigned to any other user. Email id and mobile number should be unique to the particular user to which you are trying to log in.
</details>

<details>
<summary>Oh snap! Invalid email address</summary>

If you do not maintain a user email id or it is not mandatory for your platform then you should pass the email field as empty. 

If you pass null or "null" then the server will send an invalid email address
</details>

<details>
<summary>Notification not recived</summary>

As mentioned in the document, you have to pass the fcm token to Sharpsell SDK.

Even after passing the fcm key, you are not receiving any push notification which is triggered on the Sharpsell admin pannel then check your firebase integration on your app, and if it is integrated properly as mentioned in the firebase documentation. 

Please reach Sharpsell team if the above resolution is not fixing your issues.
</details>

## Data issues

<details>
<summary>Sync Failed</summary>
Usually, there are multiple reasons why sync will be failed

1. If there is no proper internet connection then if you try to download some content on sync, the sync process may get failed.

2. If the content which is added has some broken or not valid images (which is used in thumbnails or sales bundle etc) then the sync will be failed. In this case, enable Sharpsell log and sync then check the console to get what file is exactly failing to get downloaded. Once you got the failed source then connect with your content team to get it resolved.

Please reach Sharpsell team if any of the resolutions is not fixing your issues.
</details>

<details>
<summary>Data not reflecting which is updated in the admin panel</summary>

In the admin panel, once the data is added then the admin panel has to publish the changes using the publish button which is given on the admin website.

 In the mobile app, published data will be synced automatically when they open the app from the closed state. In the app foreground state, to get published data user has to sync the app by clicking the sync button
</details>
