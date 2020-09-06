workbox.setConfig({
  debug: true,
});

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
  new RegExp("images/*"),
  new workbox.strategies.CacheFirst({
    cacheName: "public-images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 365 * 24 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp("fonts/*"),
  new workbox.strategies.CacheFirst({
    cacheName: "public-fonts",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10,
        maxAgeSeconds: 365 * 24 * 60 * 60,
      }),
    ],
  })
);
