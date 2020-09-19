const appName = "voice-weather-site-v1"
const assets = [
  "/",
  "/index.html",
  "/src/styles.css",
  "/src/index.js",
  "/src/storm.png"
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(appName).then(cache => {
      cache.addAll(assets)
    })
  )
});

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
});