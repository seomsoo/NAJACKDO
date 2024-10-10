/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

declare const self: ServiceWorkerGlobalScope;

clientsClaim();
precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
const URL_WHITE_LIST = ["/api", "/oauth2", "/login", "/docs", "/ws", "/python"];

registerRoute(
  ({ request, url }: { request: Request; url: URL }) => {
    if (URL_WHITE_LIST.some((path) => url.pathname.startsWith(path))) {
      return false;
    }
    if (request.mode !== "navigate") {
      return false;
    }
    if (url.pathname.startsWith("/_")) {
      return false;
    }
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);

registerRoute(
  ({ url }) =>
    url.origin === self.location.origin && url.pathname.endsWith(".png"),
  new StaleWhileRevalidate({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Add push event listener for push notifications
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const notificationTitle = data.title || "New Notification";
    const notificationOptions = {
      body: data.body || "메세지가 도착했어요",
      icon: data.icon || "images/icons/favicon-128.png",
      badge: data.badge || "images/icons/favicon-96x96.png",
      tag: data.tag || "chat",
      data: data.url || "/chat/:roomId"
    };

    event.waitUntil(
      self.registration.showNotification(notificationTitle, notificationOptions)
    );
  }
});

// Handle notification click event
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data || "/";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === urlToOpen  && "focus" in client) {
          return client.focus();
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow("/");
      }
    })
  );
});


// Customize fetch event for handling cache
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (URL_WHITE_LIST.some((path) => url.pathname.startsWith(path))) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
