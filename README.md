# CreativePush Plugin for Android and iOS

## DESCRIPTION

This plugin is for Phonegap/Cordova and allows your application to receive push notifications on Android and iOS devices only.

**Important** - Push notifications are intended for real devices.
The registration process will fail on the iOS simulator.
Notifications can be made to work on the Android Emulator, however doing so requires installation of some helper libraries.

### Contents

- [Automatic Installation](#automatic_installation)
- [Plugin API](#plugin_api)
- [Testing](#testing)
- [LICENSE](#license)

##<a name="automatic_installation"></a>Automatic Installation

This requires phonegap/cordova 3.5+

### Supported Platforms

- Android
- iOS

### Platforms Under Development

- WP8
- Blackberry 10

### Cordova and PhoneGap CLI

The plugin can be installed via the Cordova command line interface:

1) Navigate to the root folder for your phonegap project. 2) Run the command.

```sh
cordova plugin add https://github.com/Whebcraft/CreativePush.git
```

##<a name="plugin_api"></a> Plugin API
#### Whitelist
Add *.creativecodez.com domain in the config.xml file:
```xml
<access origin="*.creativecodez.com" />
<allow-navigation href="*.creativecodez.com" />
```

#### To register a new device
When the device is ready, you must call the register function.
```js
var pushNotification;

document.addEventListener("deviceready", function(){
    pushNotification = window.plugins.pushNotification;
});
```

#### register
To be called as soon as the device becomes ready for Android and iOS

```js
if (device.platform == 'android' || device.platform == 'Android'){
    pushNotification.register(
    successHandler(result){
    // result contains any message sent from the plugin call	
	},
    errorHandler(error){
	// error contains any error description text returned from the plugin call
	},
    {
        "senderID":"ENTER_YOUR_GCM_SENDER_ID",
     /* GCM_SENDER_ID is the Google project ID you need to obtain by 
	 [registering your application](http://push.creativecodez.com) for GCM */
        "ecb":"onNotification"
    });
} else if (device.platform == 'iOS'){ 
    pushNotification.register(
    tokenHandler(result) {  
   // Called when the device has registered with a unique device.
   // Add App Package Name, PushId and your App Version.

	   // Register This.
		onPushNotification(result, {
        AppPackage: 'YOUR_APP_PACKAGE_NAME',
	    Pushid: 'YOUR_CREATIVEPUSH_ID'
        });
},
    errorHandler(error){
	// error contains any error description text returned from the plugin call
	},
    {
        "badge":"true",
        "sound":"true",
        "alert":"true",
        "ecb":"onNotificationAPN"
    });
}else{}
```

#### ecb (iOS Only)
Event callback that gets called when your device receives a notification

```js
// iOS
function onNotificationAPN (event) {
	if ( event.alert ) {
		navigator.notification.alert(event.alert);
	}

	if ( event.sound ) {
		var snd = new Media(event.sound);
		snd.play();
	}

	if ( event.badge ) {
	    // Set the badge count visible when the app is not running (Only iOS)
		// The `badgeCount` is an integer indicating what number should show up in the badge. Passing 0 will clear the badge.
		pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
	}
}
```

#### ecb (Android Only)
// Event callback that gets called when your device receives a notification

```js
function onNotification(e) {
	switch( e.event ) {
	case 'registered':
		if (e.regid.length > 0) {
         // This is for registration of the app
		// Add App Package Name, PushId and your App Version.
		
		// Register This.
		onPushNotification(e.regid, {
        AppPackage: 'YOUR_APP_PACKAGE_NAME',
	    Pushid: 'YOUR_CREATIVEPUSH_ID'
        });
		}
	break;

	case 'message':
		// e.message = Push message sent from the server.
	    
		// foreground ,meaning the app is being used by the user..
		if ( e.foreground ) {		
          alert(e.message);
		}
		else { 
	
		    // otherwise the user switched to another app but your app is still opened
		   // The user touched the notification in the notification tray.
			if (e.coldstart) {
             // do something....
             alert(e.message);
			 }
			
	      // otherwise we were launched because the user touched a notification when the app wasn't open.
			else {
             // do something....
			 alert(e.message);
			}
		}
		
	   break;

	case 'error':
	alert(e.msg);
	break;

	default:
	alert('EVENT -> Unknown, an event was received and we do not know what it is');
	break;
  }
}
```
##<a name="testing"></a> Testing
The notification system consists of several interdependent components.

##<a name="license"></a> LICENSE

	The MIT License

	Copyright (c) 2015 Creaivecodez.
	portions Copyright (c) 2015 Creaivecodez

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
