// Nirbhik Bangla Web Push Notification Service Worker
self.addEventListener('push', function(event) {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const title = data.title || 'নির্ভীক বাংলা - ব্রেকিং নিউজ';
    const options = {
      body: data.body || 'গুরুত্বপূর্ণ সংবাদের তাত্ক্ষণিক আপডেট জানুন।',
      icon: data.icon || '/favicon.ico',
      badge: '/favicon.ico',
      image: data.image || null,
      data: {
        url: data.url || '/',
        timestamp: data.timestamp || Date.now()
      },
      vibrate: [200, 100, 200],
      tag: 'nirbhik-news-alert',
      renotify: true,
      actions: [
        { action: 'open', title: 'পড়ুন 📖' },
        { action: 'close', title: 'বন্ধ করুন' }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  } catch (err) {
    console.error('Error handling push event:', err);
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'close') return;

  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});
