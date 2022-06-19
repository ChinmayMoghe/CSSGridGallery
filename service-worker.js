// install event fired - when service worker is installed
const STATIC_ASSET_CACHE = "grid-gallery-static-asset";
const STATIC_ASSETS = ["index.html", "app.js", "style.css"];
self.addEventListener("install", (event) => {
  console.log("Service worker installed");
  event.waitUntil(
    caches.open(STATIC_ASSET_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});
//
self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then((res) => {
        return res || fetch(fetchEvent.request);
      })
    )
  );
});
