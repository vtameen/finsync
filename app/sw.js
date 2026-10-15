// FinSync web: cache the app shell so it opens offline. Firebase handles data caching itself.
const CACHE = 'finsync-web-1.2.0-1';
const SHELL = ['./', 'index.html', 'app.css', 'web.css', 'app.js', 'parser.js', 'firebase.js', 'manifest.webmanifest',
  'fonts/dm-sans-latin-400-normal.woff2', 'fonts/dm-sans-latin-500-normal.woff2', 'fonts/dm-sans-latin-600-normal.woff2',
  'fonts/dm-sans-latin-700-normal.woff2', 'fonts/symbols.woff2', 'icons/icon-192.png', 'icons/apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  // Network first (so updates arrive), cache as the offline fallback.
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return r;
  }).catch(() => caches.match(e.request).then(m => m || caches.match('index.html'))));
});
