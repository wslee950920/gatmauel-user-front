importScripts("/gatmauel-user-front/precache-manifest.7fd944fb1b553f417980eb93dd8c63a6.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

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
  new RegExp(`(.*?)\.(woff)$`, "i"),
  new workbox.strategies.CacheFirst({
    cacheName: "cdn-fonts",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 5,
        maxAgeSeconds: 365 * 24 * 60 * 60,
      }),
    ],
  })
);
