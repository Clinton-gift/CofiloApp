/* eslint-disable no-undef */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
// The manifest will be injected here at build time:
self.__WB_MANIFEST; // leave as-is; used by Workbox

// Take control of existing clients as soon as SW activates
self.skipWaiting();
clientsClaim();

// Precache build assets
precacheAndRoute(self.__WB_MANIFEST || []);
cleanupOutdatedCaches();

// Runtime caching examples:
// API calls: network-first or stale-while-revalidate
registerRoute(
  ({ request }) => request.destination === 'document' || request.destination === 'script' || request.destination === 'style',
  new StaleWhileRevalidate()
);

// Images: cache-first with a cap
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images-v1',
    matchOptions: { ignoreSearch: true }
  })
);
