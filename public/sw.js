const CACHE_NAME = "habit-tracker-v1";
const urlsToCache = [
    "/",
    "/login",
    "/signup",
    "/dashboard",
    "/manifest.json",
]

// Install event: cache core files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlIsToCache);
        })
    )
})

// Fetch event: serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Cache hit - return response
            if (response) {
                return response;
            }
            // Clone request because it's a one-time use stream
            const fetchRequest = event.request.clone();

            return fetch(fetchRequest).then((response) => {
                // Check if valid response 
                if (!response || response.status !== 200 || response.type !== "basic") {
                    return response;
                }

                // Clone response because it is a one time use stream
                const responseToCache = response.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache)
                });

                return response;
            })
        })
    )
});

// Activate events: clean up old caches
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})