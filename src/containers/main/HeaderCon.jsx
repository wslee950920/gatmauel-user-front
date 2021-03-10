import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { admin as adminAPI } from "../../lib/api/client";
import urlBase64ToUint8Array from "../../lib/useUrlBase64ToUint8Array";

import { getPush, readPush } from "../../modules/push";

import Header from "../../components/header";

const HeaderCon = () => {
  const { user, push } = useSelector((state) => ({
    user: state.user.user,
    push: state.push.push,
  }));
  const [granted, setGranted] = useState(null);
  const converted = urlBase64ToUint8Array(
    process.env.REACT_APP_PUSH_PUBLIC_KEY
  );
  const dispatch = useDispatch();

  const onClick = useCallback(() => {
    if ("Notification" in window) {
      if (Notification.permission !== "granted") {
        Notification.requestPermission(async (result) => {
          //한번 물어보고는 안 물어본다. 이전에 설정한 값이 result로 그대로 넘어가는 듯.
          if (result !== "granted") {
            alert("푸시 알림이 허용되지 않았습니다.");
          } else {
            if (navigator && navigator.serviceWorker) {
              const swreg = await navigator.serviceWorker.getRegistration();
              const sub = await swreg.pushManager.getSubscription();
              if (!sub) {
                const newSub = await swreg.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: converted,
                });
                const filteredSub = JSON.parse(JSON.stringify(newSub));
                const pushConfig = {
                  endpoint: filteredSub.endpoint,
                  keys: {
                    p256dh: filteredSub.keys.p256dh,
                    auth: filteredSub.keys.auth,
                  },
                };

                adminAPI
                  .post("/notice/push", pushConfig)
                  .then(async () => {
                    const title = "공지사항 알림 서비스";
                    const options = {
                      body: "공지사항 알림을 구독해주셔서 감사합니다!!!",
                      icon: "favicons/favicon-32x32.png",
                      vibrate: [500, 100, 500],
                    };
                    await swreg.showNotification(title, options);

                    setGranted(Notification.permission);
                  })
                  .catch((e) => {
                    alert(e.message);
                  });
              } else {
                alert("이미 구독 중 입니다.");
              }
            } else {
              alert("푸시 알림을 지원하지 않습니다.");
              return;
            }
          }
        });
      } else {
        dispatch(readPush());
      }
    } else {
      alert("푸시 알림을 지원하지 않습니다.");
    }
  }, [converted, dispatch]);

  useEffect(() => {
    if ("Notification" in window) {
      setGranted(Notification.permission);
    } else {
      setGranted("unSupport");
    }
  }, []);
  useEffect(() => {
    if (navigator && navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        dispatch(getPush(event.data));
      });
    }
  }, [dispatch]);

  return <Header user={user} granted={granted} onClick={onClick} push={push} />;
};

export default HeaderCon;
