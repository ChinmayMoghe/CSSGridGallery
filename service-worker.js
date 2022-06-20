// install event fired - when service worker is installed
const STATIC_ASSET_CACHE = "grid-gallery-static-asset";
const STATIC_ASSETS = ["index.html", "app.js", "style.css"];

// Install the SW
self.addEventListener("install", (event) => {
  console.log("Service worker installed");
  event.waitUntil(
    caches.open(STATIC_ASSET_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

//Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(STATIC_ASSET_CACHE);
  // only keep the latest cache
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  console.log("Service worker activated");
});

// Listen for all requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).then((res) => res);
    })
  );
});
