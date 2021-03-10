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

self.addEventListener("push", (event) => {
  let data = null;

  if (event.data) {
    data = JSON.parse(event.data.text());
  } else {
    return;
  }

  const options = {
    body: data.content,
    icon: "favicons/favicon-32x32.png",
    vibrate: [500, 100, 500],
    actions: [
      {
        action: "notice",
        title: "공지사항 페이지로 이동합니다.",
      },
    ],
  };
  event.waitUntil(
    new Promise(async (resolve, reject) => {
      try {
        const clientList = await clients.matchAll();
        if (clientList[0].url.includes("https://www.gatmauel.com")) {
          clientList[0].postMessage(data);
        }

        await self.registration.showNotification(data.title, options);

        resolve();
      } catch (err) {
        alert(err.message);

        reject();
      }
    })
  );
});
self.addEventListener(
  "notificationclick",
  (event) => {
    event.notification.close();

    if (event.action === "notice") {
      event.waitUntil(
        clients.matchAll().then((clientList) => {
          const focus = clientList.some((windowClient) =>
            windowClient.url.includes("https://www.gatmauel.com")
              ? (windowClient.focus(), true)
              : false
          );
          if (!focus) {
            clients
              .openWindow("https://www.gatmauel.com/notice")
              .then((windowClient) =>
                windowClient ? windowClient.focus() : null
              );
          }
        })
      );
    }
  },
  false
);
