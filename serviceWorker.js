const staticCacheName = "vw-static-v1";
const staticCacheAssets = [
    "/",
    "/index.html",
    "/offline.html",
    "/src/styles.css",
    "/src/sidenav.css",
    "/src/index.js",
    "/src/sidenav.js",
    "/images/storm.png",
    "/images/icons/favicon.ico",
    "https://kit.fontawesome.com/60bdf815fa.js",
    "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
    "https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@400;700&family=Indie+Flower&display=swap",
]

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(staticCacheName)
        .then( cache => cache.addAll(staticCacheAssets))
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
        .then( cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => cache != staticCacheName)
                .map(cache => caches.delete(cache))
            );
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
        .then( response => response || fetch(event.request))
        .catch( err => caches.match("/offline.html"))
    );
});