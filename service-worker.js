const CACHE_NAME = 'precision-hydraulic-details-parts-v1';
const BASE = 'https://justintbarca-dev.github.io/Precision-Hydraulic-Web-Application/';
const APP_SHELL = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.webmanifest',
  BASE + 'ph-app-icon-20260720.png',
  BASE + 'apple-touch-icon.png',
  BASE + 'apple-touch-icon-precomposed.png',
  BASE + 'icon-192.png',
  BASE + 'icon-512.png',
  BASE + 'icon-1024.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
  )));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match(event.request).then(cached => cached || caches.match(BASE)))
  );
});
