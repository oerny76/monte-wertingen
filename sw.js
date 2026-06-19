// Service Worker — Familienarbeitsstunden Montessori-Campus Wertingen
// Sorgt dafür, dass die App auch ohne Internetverbindung zuverlässig startet.
// WICHTIG: Dieser Service Worker cached nur die App-Hülle (HTML/CSS/Fonts),
// NICHT die eingegebenen Daten. Die Daten liegen separat in localStorage
// und sind davon unabhängig — siehe README.md, Abschnitt "Backup".

const CACHE_NAME = 'faw-cache-v1';
const FILES_TO_CACHE = [
  './arbeitsstunden.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Mono:wght@400;500&display=swap'
];

// ── INSTALL: App-Hülle in den Cache legen ──
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE).catch(() => {
        // Falls ein einzelner Font-Request fehlschlägt (z.B. offline beim ersten Aufruf),
        // soll die Installation trotzdem nicht komplett abbrechen.
        return cache.addAll(FILES_TO_CACHE.filter(f => !f.startsWith('http')));
      });
    })
  );
  self.skipWaiting();
});

// ── ACTIVATE: alte Cache-Versionen aufräumen ──
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ── FETCH: Cache-First-Strategie für die App-Hülle ──
// Bei Anfragen wird zuerst der Cache geprüft, erst danach das Netz.
// Das macht die App offline-fähig. Eingegebene Daten betrifft das nicht —
// die laufen ausschließlich über localStorage im Browser-Tab selbst.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        // Erfolgreiche Antworten zusätzlich cachen, für künftige Offline-Aufrufe
        if (response.ok && event.request.url.startsWith('http')) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached); // offline & nicht im Cache: nichts liefern
    })
  );
});
