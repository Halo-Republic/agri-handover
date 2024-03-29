
importScripts(
  'https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyDasJZDwGeFlc2m26MwXyUvTeOdPUg1Wig","authDomain":"test-halo-projects.firebaseapp.com","databaseURL":"https:\u002F\u002Ftest-halo-projects.firebaseio.com","projectId":"test-halo-projects","storageBucket":"test-halo-projects.appspot.com","messagingSenderId":"874056508972","appId":"1:874056508972:web:92eacac0dc860a1f735389","measurementId":"G-VM98TWRDL9"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler(function(payload) {
  console.info("SW received the message: ", payload);
  const notification = payload.notification;

  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: notification.image,
    vibrate: notification.vibrate || [200, 100, 200, 100, 200, 100, 200],
    actions: [
      // First item is always taken as click action (see comment below)
      {
        title: "Visit",
        action: notification.clickPath
      }
    ]
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
})

self.addEventListener('notificationclick', function(e) {
  const notification = e.notification
  // MARK 1 -> always takes first item
  const clickAction = notification.actions[0].action
  const action = e.action
  if (action === 'close') {
    notification.close()
  } else {
    clients.openWindow(clickAction)
    notification.close()
  }
})
