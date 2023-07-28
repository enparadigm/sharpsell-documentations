---
title: "Deeplinking in iOS"
sidebar_position: 3
slug: 'deeplinking-ios'
---

## Pre-Requisites
1. Make sure app identifier and provisional profile have associative Domain Support.

2. on Notification Click handle deeplinking.  Add following code in userNotificationCenter method of AppDelegate file.

```
func userNotificationCenter(_ center: UNUserNotificationCenter,
                                didReceive response: UNNotificationResponse) async {
        let notificationInfo = response.notification.request.content.userInfo
        
        //For Sharpsell this function will be called on click of the notifications
        
        NSLog("Sharpsell Parent App: did recived notfivations on userNotificationCenter - didReceive")
        NSLog("Sharpsell Parent App: - \(notificationInfo)")
        print(notificationInfo)
        if let app_extra = notificationInfo["app_extra"] as? [AnyHashable : Any],let moe_deeplink = app_extra["moe_deeplink"] as? String{
            print(moe_deeplink)
            let args = ["route" : moe_deeplink]
            var sharpsellOpenDataInString = Sharpsell.services.convertJsonToString(dict: args) ?? ""
            
            Sharpsell.services.open(arguments: sharpsellOpenDataInString) { flutterViewController in
                flutterViewController.navigationController?.navigationBar.isHidden = true
                flutterViewController.modalPresentationStyle = .fullScreen

                Sharpsell.services.getTopMostViewController { topMostViewController in
                    if topMostViewController is UINavigationController{
                        let topVC = topMostViewController as! UINavigationController
                        topVC.pushViewController(flutterViewController, animated: true)
                    } else {
                        topMostViewController.present(flutterViewController, animated: true, completion: nil)
                    }
                } onFailure: {
                    NSLog("Sharpsell Parent App - Failed to get top most view controller")
                }

            } onFailure: { message, errorType in
                NSLog("Sharpsell Parent App - Failed to open sharpsell from notification ❌")
            }
        }
```

3. Add deeplinking support using following code in AppDelegate file.

```
func application(_ application: UIApplication, continue userActivity: NSUserActivity, restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool{
        if let url = userActivity.webpageURL {
            NSLog(url.absoluteString)
            var link = url.absoluteString
            var view = url.lastPathComponent
            var parameters: [String: String] = [:]
            
        
            let dvcArgs = ["route" : link]
            var sharpsellOpenDataInString = Sharpsell.services.convertJsonToString(dict: dvcArgs) ?? ""
            if defaults.bool(forKey: "isUserLoggedIn"){
                Sharpsell.services.open(arguments: sharpsellOpenDataInString) { flutterViewController in
                    flutterViewController.navigationController?.navigationBar.isHidden = true
                    flutterViewController.modalPresentationStyle = .fullScreen
                    
                    Sharpsell.services.getTopMostViewController { topMostViewController in
                        if topMostViewController is UINavigationController{
                            let topVC = topMostViewController as! UINavigationController
                            topVC.popViewController(animated: false);
                            topVC.pushViewController(flutterViewController, animated: true)
                        } else {
                            topMostViewController.present(flutterViewController, animated: true, completion: nil)
                        }
                    } onFailure: {
                        NSLog("Sharpsell Parent App - Failed to get top most view controller")
                    }
                    
                    
                } onFailure: { message, errorType in
                    NSLog("Sharpsell Parent App - Failed to open sharpsell from notification ❌")
                }
            }
        }
        return true
    }
```