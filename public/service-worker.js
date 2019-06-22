// Set this to true for production
var doCache = true;

// Name our cache
var CACHE_NAME = 'my-pwa-cache-v1';

// Static URLs
const STATIC_URLS = [
  "/",
  "/manifest.json",
  "/js/bundle.js",
];

// Delete old caches that are not our current one!
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(keyList =>
        Promise.all(keyList.map(key => {
          if (!cacheWhitelist.includes(key)) {
            console.log('[Service Worker] deleting cache: ' + key)
            return caches.delete(key);
          }
        }))
      )
  );
});

// The first time the user starts up the PWA, 'install' is triggered.
self.addEventListener('install', function(event) {
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(function(cache) {
          return cache.addAll(STATIC_URLS);
        })
        .then(() => self.skipWaiting())
    );
  }
});

// When the webpage goes to fetch files, we intercept that request and serve up the matching files
// if we have them
self.addEventListener('fetch', function(event) {
    if (doCache) {
      event.respondWith(
          caches.match(event.request).then(function(response) {
              return response || fetch(event.request);
          })
      );
    }
});


// Push notification handler
self.addEventListener('push', function(event) {

  const pushMessage = event.data.text();
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${pushMessage}"`);

  const title = 'React PWA Example';
  const options = {
    body: pushMessage,
    icon: 'public/icon-192x192.png',
    badge: 'public/icon-192x192.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});


// Push notifications dlick event handler
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://react-pwa-example.herokuapp.com/')
  );
});