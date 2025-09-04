// service-worker.js
const CACHE_NAME = 'ferotrap-cache-v1';
const urlsToCache = [
  '/',                 // index.html
  '/index.html',
  '/manifest.json',
  '/service-worker.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // Add your CSS, JS, images, etc. here:
  // '/styles.css',
  // '/app.js'
];

// Install event – cache all core files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate event – clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});

// Fetch event – serve from cache first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
