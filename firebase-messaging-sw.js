// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAxFWJ_HNLCvYmYfaWLb1wnmls62KNw2Yw",
  authDomain: "collectiontracker-577f5.firebaseapp.com",
  projectId: "collectiontracker-577f5",
  storageBucket: "collectiontracker-577f5.firebasestorage.app",
  messagingSenderId: "97120480523",
  appId: "1:97120480523:web:7b7f4729cfb4b77e2e860e"
});

var messaging = firebase.messaging();

// Handle background notifications (when app is closed)
messaging.onBackgroundMessage(function(payload) {
  var title = payload.notification ? payload.notification.title : 'ODU Collector';
  var body = payload.notification ? payload.notification.body : 'You have a new request';
  var icon = 'https://z-cdn-media.chatglm.cn/files/8f34f09f-bbc3-4ccc-82f5-23ce945592fa.png?auth_key=1883896355-c0247abc05e24d15bd46155b11d12055-0-d0987e2c420b192127d59bc546fe6e8a';

  self.registration.showNotification(title, {
    body: body,
    icon: icon,
    badge: icon,
    vibrate: [200, 100, 200, 100, 200],
    tag: 'odu-install-request',
    requireInteraction: true,
    data: { url: '/' }
  });
});

// Open app when notification is clicked
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({type: 'window', includeUncontrolled: true}).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        if ('focus' in clientList[i]) return clientList[i].focus();
      }
      if (clientList.length > 0) return clientList[0].focus();
      return self.clients.openWindow('/');
    })
  );
});