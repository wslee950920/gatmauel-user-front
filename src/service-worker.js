workbox.setConfig({
  debug: false,
});

workbox.precaching.precacheAndRoute(self.__precacheManifest);

workbox.routing.registerRoute(
  // prettier-ignore
  new RegExp("/images/.*\.(jpg|jpeg|png|gif)$", "i"),
  new workbox.strategies.CacheFirst({
    cacheName: "public-images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10,
        maxAgeSeconds: 365 * 24 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  // prettier-ignore
  new RegExp("https://d1epr7eytlws04\.cloudfront\.net/view/.*\.(jpg|jpeg|png|gif)$", "i"),
  new workbox.strategies.CacheFirst({
    cacheName: "cf-view-images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10,
        maxAgeSeconds: 365 * 24 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  // prettier-ignore
  new RegExp("https://d1epr7eytlws04\.cloudfront\.net/menu/.*\.(jpg|jpeg|png|gif)$", "i"),
  new workbox.strategies.CacheFirst({
    cacheName: "cf-food-images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
        maxAgeSeconds: 365 * 24 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  // prettier-ignore
  new RegExp("https://d1epr7eytlws04\.cloudfront\.net/resized/.*\.(jpg|jpeg|png|gif)$", "i"),
  new workbox.strategies.CacheFirst({
    cacheName: "cf-review-images",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  // prettier-ignore
  new RegExp(`(.*?)\.(woff|eot|woff2|ttf|svg)$`, "i"),
  new workbox.strategies.CacheFirst({
    cacheName: "cdn-fonts",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 10,
        maxAgeSeconds: 365 * 24 * 60 * 60,
      }),
    ],
  })
);
