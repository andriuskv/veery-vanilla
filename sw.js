const cacheName = "veery-20";
const toCache = [
    "./index.html",
    "./main.css",
    "./main.js",
    "./vendor.js",
    "./ww.js",
    "./assets/images/album-art-placeholder.png",
    "./assets/images/main-icon.png",
    "./assets/images/ring-alt.svg",
    "./libs/dexie.min.js",
    "./libs/metadata-audio-parser.min.js"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(toCache))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim());
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys.map(key => {
                if (key.startsWith("veery") && key !== cacheName) {
                    return caches.delete(key);
                }
                return key;
            }));
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
            .catch(() => caches.match("index.html"))
    );
});