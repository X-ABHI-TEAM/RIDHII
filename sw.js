// Cache name with version
const CACHE_NAME = 'Ridhi-nutrition-v2';
const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes

// Files to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/data/products.json',
  'https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Roboto:wght@300;400;500&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - implement cache strategies
self.addEventListener('fetch', event => {
  // Only cache GET requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // For same-origin requests, use cache-first strategy
  if (new URL(event.request.url).origin === location.origin) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          // If we have a cached response, return it
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Otherwise, fetch from network
          return fetch(event.request)
            .then(networkResponse => {
              // If the response is valid, cache it
              if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME)
                  .then(cache => {
                    cache.put(event.request, responseToCache);
                  });
              }
              return networkResponse;
            })
            .catch(error => {
              console.error('Fetch failed:', error);
              // Return a fallback page for HTML requests
              if (event.request.headers.get('accept').includes('text/html')) {
                return caches.match('/index.html');
              }
            });
        })
    );
  }
  // For cross-origin requests (CDNs, APIs), use network-first strategy with timeout
  else {
    event.respondWith(
      // Try network first with timeout
      Promise.race([
        fetch(event.request),
        new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error('Request timeout'));
          }, CACHE_TIMEOUT);
        })
      ])
        .then(response => {
          // If successful, cache the response
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          // If network fails, try cache
          return caches.match(event.request);
        })
    );
  }
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});