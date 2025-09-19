/* eslint-disable no-undef */

// Service Worker implementation

self.addEventListener("install", (event) => {
  console.log("[Service Worker] Installing... - service-worker.js:6")
  self.skipWaiting() // Force activation
})

self.addEventListener("activate", (event) => {
  console.log("[Service Worker] Activated - service-worker.js:11")
  event.waitUntil(self.clients.claim()) // Take control immediately
})
