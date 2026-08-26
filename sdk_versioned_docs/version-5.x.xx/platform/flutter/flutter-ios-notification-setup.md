---
title: "iOS Notification Setup"
sidebar_position: 4
slug: "flutter_ios_notification_setup"
---

# iOS Notification setup

```swift

import UIKit
import AppTrackingTransparency
import Flutter
import moengage_flutter_ios
import MoEngageSDK
import UserNotifications
import os

@UIApplicationMain
@objc class AppDelegate: FlutterAppDelegate {
    
    private var textField = UITextField()
    var pushToken : Data?
    
    override func application(
        _ application: UIApplication,
        didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
       
        let flutterViewController : FlutterViewController = self.window?.rootViewController as! FlutterViewController
    
        setMoEngageMethodChannel(with: flutterViewController)
        
        
        GeneratedPluginRegistrant.register(with: self)

        if let notificationInfo = launchOptions?[.remoteNotification] as?  [AnyHashable : Any] {

            if let app_extra = notificationInfo["app_extra"] as? [AnyHashable : Any],
               let moe_deeplink = app_extra["moe_deeplink"] as? String{
                NSLog("Sharpsell:  Deeplink key from notification payload -  \(moe_deeplink)")
                let updatedMoLink = moe_deeplink.replacingOccurrences(of: "https", with: "sharpsell")

                NSLog("Sharpsell:  Deeplink url https to shrpsell updated -  \(updatedMoLink)")

                if let moeDeepLinkURL = URL(string: updatedMoLink) {

                    NSLog("Sharpsell:  Deeplink url opening to -  \(moeDeepLinkURL)")

                    UIApplication.shared.open(moeDeepLinkURL) { success in
                        if success {
                            NSLog("Sharpsell: URL from notification opened successfully - \(moeDeepLinkURL)")
                        } else {
                            NSLog("Sharpsell: Failed to open URL from notification - \(moeDeepLinkURL)")
                        }
                    }

                }
                else
                {
                    NSLog("Sharpsell:  Not able to convert the moe deeplink string to URL - \(moe_deeplink)")
                }

            }
          }
        
        return super.application(application, didFinishLaunchingWithOptions: launchOptions)
        
    }
    
    override func applicationDidBecomeActive(_ application: UIApplication) {
        if #available(iOS 14, *) {
            // Display permission to track
            DispatchQueue.main.asyncAfter(deadline: .now() + 1.0, execute: {
                ATTrackingManager.requestTrackingAuthorization(completionHandler: { status in
                    switch status {
                    case .notDetermined:
                        NSLog("Sharpsell - ATT NotDetermined - unknown error ❌")
                    case .restricted:
                        NSLog("Sharpsell - ATT Resetricted - Device has an MDM solution applied ❌")
                    case .denied:
                        NSLog("Sharpsell - ATT consent denied by user ❌")
                    case .authorized:
                        NSLog("Sharpsell - ATT authirized ✅ ")
                    default:
                        NSLog("Sharpsell - ATT unknown error ❌")
                    }
                    
                    self.registerForPushNotifications()
                })
            })
        
        } else{
            self.registerForPushNotifications()
        }
    }
    
    
    //MARK: Method Channel(s)
    
    private func setMoEngageMethodChannel(with controller: FlutterViewController){
        let moengageChannel = FlutterMethodChannel(name: "enableMoEngageChannel", binaryMessenger: controller.binaryMessenger)
        
        moengageChannel.setMethodCallHandler({
            (call: FlutterMethodCall, result: @escaping FlutterResult) -> Void in
            NSLog("Sharpsell: Initializing MoEngage from on native - value \(call.method) ")
            NSLog("Sharpsell: Initializing MoEngage from on native Args- value \(call.arguments) ")
            if call.method == "initializeMoengage" {
                if let args = call.arguments as? Dictionary<String, Any>,
                   let moengageAppId = args["moEngageAppId"] as? String{
                    NSLog("Sharpsell: Got App Id - \(moengageAppId)")
                    let sdkConfig = MoEngageSDKConfig(appId: moengageAppId, dataCenter: .data_center_01);
                    
//                     sdkConfig.enableLogs = true
                    //FIXME: While publishin the app to test flight or appstore we should use commented code.
                    //Surya - Write macros which will call proper method on debug and release mode
                    MoEngageInitializer.sharedInstance.initializeDefaultInstance(sdkConfig)
//                    MoEngage.sharedInstance.enableSDK()
                    if let pushToken = (UIApplication.shared.delegate as? AppDelegate)?.pushToken{
                        MoEngageSDKMessaging.sharedInstance.setPushToken(pushToken)
                        NSLog("Sharpsell:  After login shared the same with mo engage ✅")
                        let token = pushToken.reduce("") { $0 + String(format: "%02x", $1) }
                        NSLog("Sharpsell: Device Token after sent to mo - \(token)")
                    }
                    
                    NSLog("Sharpsell: Initialized MoEngage ✅")
                } else {
                    NSLog("Sharpsell: Failed to Initialize MoEngage from on native ❌ - \n \(call.arguments) ")
                }
                
            }
        })
    }
    

}

//MARK: - Notification Handlers
extension AppDelegate{
    
    func registerForPushNotifications() {
        UNUserNotificationCenter.current().delegate = self
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) {
            (granted, error) in
            // 1. Check to see if permission is granted
            guard granted else { return }
            // 2. Attempt registration for remote notifications on the main thread
            DispatchQueue.main.async {
                UIApplication.shared.registerForRemoteNotifications()
            }
        }
    }
    
    
    
    //Remote notification Registration callback methods
    override func application(_ application: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) {
        
        let token = deviceToken.reduce("") { $0 + String(format: "%02x", $1) }
        NSLog("Sharpsell: Device Token - \(token)")
        pushToken = deviceToken
        super.application(application, didRegisterForRemoteNotificationsWithDeviceToken: deviceToken);
        //Call only if MoEngageAppDelegateProxyEnabled is NO
        MoEngageSDKMessaging.sharedInstance.setPushToken(deviceToken)
        NSLog("Sharpsell:  Recived Device Token ✅ and shared the same with mo engage")
        
    }
    
    override func application(_ application: UIApplication, didFailToRegisterForRemoteNotificationsWithError error: Error) {
        //Call only if MoEngageAppDelegateProxyEnabled is NO
        MoEngageSDKMessaging.sharedInstance.didFailToRegisterForPush()
    }
    
   // MARK:- UserNotifications Framework callback method
    @available(iOS 10.0, *)
    override func userNotificationCenter(_ center: UNUserNotificationCenter, didReceive response: UNNotificationResponse,
                                         withCompletionHandler completionHandler: @escaping () -> Void) {
        
        NSLog("Sharpsell : did recived notfivations on userNotificationCenter - didReceive")
        
        
        //Call only if MoEngageAppDelegateProxyEnabled is NO
   //     MoEngageSDKMessaging.sharedInstance.userNotificationCenter(center, didReceive: response)
        
        //Custom Handling of notification from mo enagage deeplink
        let notificationInfo = response.notification.request.content.userInfo
        NSLog("Sharpsell:  Recived Notfication and the dict is \(notificationInfo)")
      
        if let app_extra = notificationInfo["app_extra"] as? [AnyHashable : Any],
           let moe_deeplink = app_extra["moe_deeplink"] as? String{
            NSLog("Sharpsell:  Deeplink key from notification payload -  \(moe_deeplink)")
            let updatedMoLink = moe_deeplink.replacingOccurrences(of: "https", with: "sharpsell")

            NSLog("Sharpsell:  Deeplink url https to shrpsell updated -  \(updatedMoLink)")

            guard let moeDeepLinkURL = URL(string: updatedMoLink) else {
                NSLog("Sharpsell:  Not able to convert the moe deeplink string to URL - \(moe_deeplink)")
                return
            }
            
            NSLog("Sharpsell:  Deeplink url opening to -  \(moeDeepLinkURL)")

            UIApplication.shared.open(moeDeepLinkURL) { success in
                if success {
                    NSLog("Sharpsell: URL from notification opened successfully - \(moeDeepLinkURL)")
                } else {
                    NSLog("Sharpsell: Failed to open URL from notification - \(moeDeepLinkURL)")
                }
            }
        }
        completionHandler();
    }
    
    override func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable : Any]) {
        //Call only if MoEngageAppDelegateProxyEnabled is NO
        MoEngageSDKMessaging.sharedInstance.didReceieveNotification(inApplication: application, withInfo: userInfo)
        
    }
    
    
    @available(iOS 10.0, *)
    override func userNotificationCenter(_ center: UNUserNotificationCenter, willPresent notification: UNNotification,
                                         withCompletionHandler completionHandler: @escaping (UNNotificationPresentationOptions) -> Void) {
        
        //This is to only to display Alert and enable notification sound
        if #available(iOS 14.0, *) {
            completionHandler([.sound,.alert,.banner])
        } else {
            // Fallback on earlier versions
            completionHandler([.sound,.alert])
        }
        
    }
    
    
}

```