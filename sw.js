const PREFIX = 'pocket-tech:' + self.location.pathname + ':';
const CACHE = PREFIX + 'v1';
const FILES = ['./', './index.html', './style.css', './register.js', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key.startsWith(PREFIX) && key !== CACHE)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const base = new URL('./', self.location.href);
  if (event.request.method !== 'GET' || url.origin !== base.origin || !url.pathname.startsWith(base.pathname)) return;
  event.respondWith(
    caches.open(CACHE).then(async cache => {
      const saved = await cache.match(event.request);
      return saved || fetch(event.request);
    })
  );
});