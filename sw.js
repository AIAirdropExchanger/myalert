// sw.js
self.addEventListener('push', function(event) {
  // Check if there is data, otherwise use a default payload
  const payload = event.data ? event.data.json() : { title: "New Alert", body: "You have a new notification!" };

  const options = {
    body: payload.body,
    icon: 'logo.png',
    badge: 'logo.png', // Small icon for the status bar
    data: {
      url: payload.url || '/' // Where to navigate when clicked
    }
  };

  // Keep the service worker alive until the notification is shown
  event.waitUntil(
    self.registration.showNotification(payload.title, options)
  );
});

// Handle the user clicking the notification
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});