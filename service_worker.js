// Files to cache
const cacheName = "goal-tracker-v1";
const contentToCache = [
    "./index.html",
    "./app.css",
    "./bundle.css",
    "./icon.png",
    "./favicon.png",
    "./bundle.js",
];

// Installing Service Worker
self.addEventListener("install", (e) => {
    console.log(`[Service Worker] Install - Cache: ${cacheName}`);
    e.waitUntil(
        (async () => {
            const cache = await caches.open(cacheName);
            await cache.addAll(contentToCache);
        })()
    );
    self.skipWaiting();
});

// Fetching content using Service Worker
self.addEventListener("fetch", (e) => {
    // Cache http and https only, skip unsupported chrome-extension:// and file://...
    if (
        !(
            e.request.url.startsWith("http:") ||
            e.request.url.startsWith("https:")
        )
    ) {
        return;
    }

    e.respondWith(
        (async () => {
            const r = await caches.match(e.request);
            console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
            if (r) return r;
            const response = await fetch(e.request);
            const cache = await caches.open(cacheName);
            console.log(
                `[Service Worker] Caching new resource: ${e.request.url}`
            );
            cache.put(e.request, response.clone());
            return response;
        })()
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key === cacheName) {
                        return;
                    }
                    console.log(`Deleting ${key}`);
                    return caches.delete(key);
                })
            );
        })
    );
});
