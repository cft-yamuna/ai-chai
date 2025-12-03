const CACHE_NAME = "vite-pwa-cache-v1";

// Pre-cache homepage
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/"]);
    })
  );
});

// Cache all files dynamically
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(event.request)
          .then((networkRes) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkRes.clone());
              return networkRes;
            });
          })
          .catch(() => {
            return caches.match("/");
          })
      );
    })
  );
});
