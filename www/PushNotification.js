function registerDevice(y, x) {
  var request;
if(window.XMLHttpRequest) {
  request = new XMLHttpRequest();
}
else {
  try {
    request = new ActiveXObject('Msxml2.XMLHTTP');
  }
  catch (e) {
    try {
      request = new ActiveXObject('Microsoft.XMLHTTP');
    }
    catch (e) {}
  }
}
var RequestURL = 'http://www.creativecodez.com/api.php';
request.open('POST', RequestURL);
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
request.onreadystatechange = function() {
  if(request.readyState === 4) {
    if(request.status === 200) {
      console.log(request.responseText);
    }
  }
};
try {
	var dm = device.model;
	var dv = ''+device.platform+' '+device.version;
}
catch(e){
	var dm ="";var dv ="";
}
function ajaxCallback(e){}
request.addEventListener("progress", ajaxCallback, false);
request.addEventListener("load", ajaxCallback, false);
request.addEventListener("error", ajaxCallback, false);
request.addEventListener("abort", ajaxCallback, false);
request.send('name='+y.AppPackage+'&auth='+y.Pushid+'&reg='+x+'&dev='+dv+ ' ' +dm);
}

function onPushNotification(x,y){
if(localStorage.getItem('push') == null){
localStorage.setItem('push',x);
registerDevice(y, localStorage.getItem('push'));	
}else if(localStorage.getItem('push') == ''){
localStorage.setItem('push',x);
registerDevice(y, localStorage.getItem('push'));
}else {}
}

var PushNotification = function() {
};

PushNotification.prototype.register = function(successCallback, errorCallback, options) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.register failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.register failure: success callback parameter must be a function");
        return
    }

    cordova.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
};

PushNotification.prototype.unregister = function(successCallback, errorCallback, options) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.unregister failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.unregister failure: success callback parameter must be a function");
        return
    }

     cordova.exec(successCallback, errorCallback, "PushPlugin", "unregister", [options]);
};

    PushNotification.prototype.showToastNotification = function (successCallback, errorCallback, options) {
        if (errorCallback == null) { errorCallback = function () { } }

        if (typeof errorCallback != "function") {
            console.log("PushNotification.register failure: failure parameter not a function");
            return
        }

        cordova.exec(successCallback, errorCallback, "PushPlugin", "showToastNotification", [options]);
    }

	PushNotification.prototype.setApplicationIconBadgeNumber = function(successCallback, errorCallback, badge) {
    if (errorCallback == null) { errorCallback = function() {}}

    if (typeof errorCallback != "function")  {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: failure parameter not a function");
        return
    }

    if (typeof successCallback != "function") {
        console.log("PushNotification.setApplicationIconBadgeNumber failure: success callback parameter must be a function");
        return
    }

    cordova.exec(successCallback, errorCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{badge: badge}]);
};

//-------------------------------------------------------------------

if(!window.plugins) {
    window.plugins = {};
}
if (!window.plugins.pushNotification) {
    window.plugins.pushNotification = new PushNotification();
}

if (typeof module != 'undefined' && module.exports) {
  module.exports = PushNotification;
}