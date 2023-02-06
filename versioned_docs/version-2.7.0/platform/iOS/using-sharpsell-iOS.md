---
title: "Using Sharpsell SDK in iOS"
sidebar_position: 2
slug: 'iOS_implementation'
---
import ReactPlayer from 'react-player';

<br></br>
<ReactPlayer playing controls url='/videos/iOS_usage.mp4'/>
<br></br><br></br>

:::note
`Import SharpsellCore` in the class or struct where ever you are trying to access Sharpsell.
:::

## Step 1:  Create Sharpsell Flutter Engine
This function is used to initialize the object required by the SDK - so it's better to call this
function on app start preferably in `didFinishLaunchingWithOptions` function in `AppDelegate` class.

```swift
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplicationLaunchOptionsKey: Any]?) -> Bool {

    //Calling Sharpsell flutter engine
    Sharpsell.services.createFlutterEngine()

    return true
}
```

:::info 
It's better to call this function on app start preferably in `didFinishLaunchingWithOptions` function in `AppDelegate` class
:::

## Step 2: Initializing the Sharpsell SDK

The SDK has to be initialized before calling any other methods of the SDK.
On calling the `Sharpsell.services.initialize` method, a success or failure status will be returned via a callback.
A sample code on how to initialize the SDK is given below.

```swift
       // Note - If you don't have any of the below data then don't pass null, just pass empty strings
        let initSharpsellData: [String:Any] = [
            "company_code": "sample_sdk", // Company code given to you by sharpsell team
            "user_unique_id": "unique_id_of_the_user", // Pass the unique id which is releated to the particular user
            "user_group_id": "1", // User Group ID given to you by sharpsell team
            "country_code": "",
            "user_meta": "", // If you have user meta, pass those as a string. If not pass empty string
            "name": "Surya", // Pass the user name who is trying to login
            "mobile_number": "888888888", // Pass the user mobile number who is trying to login
            "email": "surya@sharpsell.ai",// Pass the user email id whoc is trying to login, if you were not maintaing then pass it as empty string
             "fcm_token": firebaseToken] // Pass the firebase token 

        Sharpsell.services.initialize(smartsellParameters: initSharpsellData) {
            //Flutter initialized succecfully
        } onFailure: { (errorMessage, smartsellError) in
            switch smartsellError {
            case .flutterError:
                debugPrint("Error Message: \(errorMessage)")
            case .flutterMethodNotImplemented:
                debugPrint("Error Message: Flutter Method Not Implemented")
            default:
                debugPrint("Error Message: UnKnown Error in \(#function)")
            }
        }
```

:::info
Sharpsell team will provide the following items.
1. company_code
2. user_group_id
:::

## Step 3: Handling Notification

:::caution
Firebase setup has to be done to enable push notification on Sharpsell SDK.
To set up iOS firebase setup follow this - https://firebase.google.com/docs/ios/setup
:::

Call the `isSharpsellNotification` function in the `didReceiveRemoteNotification` delegate method to verify the received notification is a Sharpsell notification or not. If it is a Sharpsell notification then the notification will be shown as per the Sharpsell configurations. 

```swift title="AppDelegate.swift"
    func application(_ application: UIApplication,
                     didReceiveRemoteNotification userInfo: [AnyHashable : Any],
                     fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) {
      
        Sharpsell.services.isSharpsellNotification(notificationPayLoad: userInfo) { isSharpsellNotification in
            if isSharpsellNotification{
                Sharpsell.services.showNotification(notificationPayLoad: userInfo) {
                    NSLog("Sharpsell Parent App - Notification showed successfully 🥳")
                } onFailure: { message, errorType in
                    NSLog("Sharpsell Parent App: showNotification Failed - \(errorType) and  \(message)")
                }
            }
            
        } onFailure: { message, errorType in
            NSLog("Sharpsell Parent App - error in validation sharpsell notifccation - \(message)")
        }
    }
```

Call the below method in the `didReceive` notification delegate method which will be called whenever the user clicks on the received notification. This function is responsible for opening and redirecting to the Sharpsell screen based on the notification input.

```swift title="AppDelegate.swift"
     Sharpsell.services.handleNotificationRedirection(notificationData: notificationInfo) { notificationData in
          
        Sharpsell.services.open(arguments: notificationData) { flutterViewController in
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
                 NSLog("Sharpsell - Failed to get top most view controller")
            }    
         } onFailure: { message, errorType in
             NSLog("Sharpsell - Failed to open sharpsell from notification ❌")
        }  
        } onFailure: { message, errorType in
            NSLog("Sharpsell - Failed to handle notfication ❌")
        }
```

:::note
Make sure you are sending the firebase fcm token as a parameter to Sharpsell SDK using  `Sharpsell.services.initialize` function. If you are not passing the proper token then you won't be receiving the notification which is triggered from the Sharpsell portals
:::

## Step 4: Sharpsell SDK Entry points

:::note
Make sure to call ` Sharpsell.services.initialize` function before calling any other below mentioned entry points.
:::

### Home Screen
To open the Sharpsell home screen from your app use the below function

```swift
       Sharpsell.services.open(arguments: [:]){ (flutterViewController) in
            self.navigationController?.pushViewController(flutterViewController, animated: true)
        } onFailure: { (errorMessage, smartSellError) in
            switch smartSellError {
            case .flutterError:
                debugPrint("Error Message: \(errorMessage)")
            case .flutterMethodNotImplemented:
                debugPrint("")
            default:
                debugPrint("")
            }
        }
```

### Presentation Screen
To open the Sharpsell customer presentation screen from your app use the below function

```swift
let presentationArgs = ["route" : "productPresentationInput",
                        "presentation_name" : presentationInputName,
                        "input_one" : presentationInputOne,
                        "input_two" : presentationInputTwo]

    Sharpsell.services.open(arguments: presentationArgs){ (flutterViewController) in
         self.navigationController?.pushViewController(flutterViewController, animated: true)
    } onFailure: { (errorMessage, smartSellError) in
         switch smartSellError {
        case .flutterError:
            debugPrint("Sharpsell Error Message: \(errorMessage)")
        case .flutterMethodNotImplemented:
            debugPrint("Sharpsell Flutter method not implemented - \(presentationArgs)")
        default:
            debugPrint("")
            }
    }
```
:::note
We need to pass proper `presentationInputName` and input fields as per the presentation. 
If the presentation input name is not valid then it will just open the customer presentation screen.
:::

### Launchpad Screen
To open the Sharpsell launchpad screen from your app use the below function

```swift
     let launchpadArgs = ["route" : "launchpad"]

       Sharpsell.services.open(arguments: launchpadArgs){ (flutterViewController) in
            self.navigationController?.pushViewController(flutterViewController, animated: true)
        } onFailure: { (errorMessage, smartSellError) in
            switch smartSellError {
            case .flutterError:
                debugPrint("Error Message: \(errorMessage)")
            case .flutterMethodNotImplemented:
                debugPrint("")
            default:
                debugPrint("")
            }
        }
```

### Marketing Collateral Screen
To open the Sharpsell marketing collateral or a custom mapped directory screen from your app use the below function

```swift
     let mcDirArgs = ["route" : "mcDirectory"]
     mcDirArgs["entry_point"] = "1"; // For custom mapped directory only

       Sharpsell.services.open(arguments: mcDirArgs){ (flutterViewController) in
            self.navigationController?.pushViewController(flutterViewController, animated: true)
        } onFailure: { (errorMessage, smartSellError) in
            switch smartSellError {
            case .flutterError:
                debugPrint("Error Message: \(errorMessage)")
            case .flutterMethodNotImplemented:
                debugPrint("")
            default:
                debugPrint("")
            }
        }
```

### Poster of the day Screen
To open the Sharpsell poster of the day screen from your app use the below function

```swift
     let potdArgs = ["route" : "potd"]

       Sharpsell.services.open(arguments: potdArgs){ (flutterViewController) in
            self.navigationController?.pushViewController(flutterViewController, animated: true)
        } onFailure: { (errorMessage, smartSellError) in
            switch smartSellError {
            case .flutterError:
                debugPrint("Error Message: \(errorMessage)")
            case .flutterMethodNotImplemented:
                debugPrint("")
            default:
                debugPrint("")
            }

```

### Digital Visiting Card Screen
To open the Sharpsell digital visiting card screen from your app use the below function

```swift
     let dvcArgs = ["route" : "dvc"]

       Sharpsell.services.open(arguments: dvcArgs){ (flutterViewController) in
            self.navigationController?.pushViewController(flutterViewController, animated: true)
        } onFailure: { (errorMessage, smartSellError) in
            switch smartSellError {
            case .flutterError:
                debugPrint("Error Message: \(errorMessage)")
            case .flutterMethodNotImplemented:
                debugPrint("")
            default:
                debugPrint("")
            }

```

### Timer Challenge Home Screen
To open the Sharpsell timer challenge screen from your app use the below function

```swift
     let tcHomeArgs = ["route" : "tcHome"]

       Sharpsell.services.open(arguments: tcHomeArgs){ (flutterViewController) in
            self.navigationController?.pushViewController(flutterViewController, animated: true)
        } onFailure: { (errorMessage, smartSellError) in
            switch smartSellError {
            case .flutterError:
                debugPrint("Error Message: \(errorMessage)")
            case .flutterMethodNotImplemented:
                debugPrint("")
            default:
                debugPrint("")
            }
```

### Product Bundle Screen
To open the Sharpsell product bundle screen from your app use the below function

```swift
     let productBundleArgs = ["route" : "productBundle"]

       Sharpsell.services.open(arguments: productBundleArgs){ (flutterViewController) in
            self.navigationController?.pushViewController(flutterViewController, animated: true)
        } onFailure: { (errorMessage, smartSellError) in
            switch smartSellError {
            case .flutterError:
                debugPrint("Error Message: \(errorMessage)")
            case .flutterMethodNotImplemented:
                debugPrint("")
            default:
                debugPrint("")
            }
```

### Quick Links Screen

To open Sharpsell quick links screen from your app use the below function

```swift
     let quickLinksArgs = ["route" : "quickLinks"]

       Sharpsell.services.open(arguments: quickLinksArgs){ (flutterViewController) in
            self.navigationController?.pushViewController(flutterViewController, animated: true)
        } onFailure: { (errorMessage, smartSellError) in
            switch smartSellError {
            case .flutterError:
                debugPrint("Error Message: \(errorMessage)")
            case .flutterMethodNotImplemented:
                debugPrint("")
            default:
                debugPrint("")
            }
```

### Logout and clear user data
Call the Sharpsell clear data function while the user is logged out from the app.

```swift
      Sharpsell.services.clearData {
                //Handle logut success
            } onFailure: { message, errorType in
                //Logut Failed
            }
```

:::caution
Make sure the `Sharpsell.services.clearData` is called when the user is logged out of your application. If not, you will be getting some data mismatch in sharp sell screens if you have logged in with a different user compared to the previous instance.
:::



