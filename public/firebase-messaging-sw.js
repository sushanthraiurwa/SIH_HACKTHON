self.addEventListener('push', event => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/alert.png',
    vibrate: [500, 200, 500],
    data: { 
      url: `/alert.html?disaster=${encodeURIComponent(data.disaster)}&message=${encodeURIComponent(data.message)}`
    }
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});