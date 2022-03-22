/* eslint-disable no-restricted-globals */

/* global self, caches, fetch */

const CACHE = 'cache-6a85a5b';

self.addEventListener('install', e => {
  e.waitUntil(precache()).then(() => self.skipWaiting());
});

self.addEventListener('activate', event => {
  self.clients
    .matchAll({
      includeUncontrolled: true,
    })
    .then(clientList => {
      const urls = clientList.map(client => client.url);
      console.log('[ServiceWorker] Matching clients:', urls.join(', '));
    });

  event.waitUntil(
    caches
      .keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE) {
              console.log('[ServiceWorker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
            return null;
          })
        )
      )
      .then(() => {
        console.log('[ServiceWorker] Claiming clients for version', CACHE);
        return self.clients.claim();
      })
  );
});

function precache() {
  return caches.open(CACHE).then(cache => cache.addAll(["./","./colophon.html","./favicon.png","./index.html","./manifest.json","./marketa_lazarova_001.html","./marketa_lazarova_002.html","./marketa_lazarova_003.html","./marketa_lazarova_004.html","./marketa_lazarova_005.html","./marketa_lazarova_006.html","./marketa_lazarova_007.html","./marketa_lazarova_008.html","./marketa_lazarova_009.html","./marketa_lazarova_010.html","./marketa_lazarova_011.html","./marketa_lazarova_012.html","./marketa_lazarova_013.html","./marketa_lazarova_014.html","./marketa_lazarova_015.html","./marketa_lazarova_016.html","./marketa_lazarova_017.html","./fonts/Literata-Italic-var.woff2","./fonts/Literata-var.woff2","./fonts/LiterataTT-TextItalic.woff2","./fonts/LiterataTT-TextRegular.woff2","./fonts/LiterataTT-TextSemibold.woff2","./fonts/LiterataTT_LICENSE.txt","./fonts/SpaceGroteskVF.woff2","./fonts/SpaceGroteskVF_LICENSE.txt","./resources/image001.png","./resources/image003.png","./resources/image004.jpg","./resources/obalka_marketa_lazarova2.png","./resources/upoutavka_eknihy.png","./scripts/bundle.js","./style/style.min.css","./template-images/circles.png"]));
}

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open(CACHE).then(cache => {
      return cache.match(e.request).then(matching => {
        if (matching) {
          console.log('[ServiceWorker] Serving file from cache.');
          console.log(e.request);
          return matching;
        }

        return fetch(e.request);
      });
    })
  );
});
