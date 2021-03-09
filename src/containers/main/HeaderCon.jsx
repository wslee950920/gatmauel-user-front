import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import { admin as adminAPI } from "../../lib/api/client";
import urlBase64ToUint8Array from "../../lib/useUrlBase64ToUint8Array";

import Header from "../../components/header";

const HeaderCon = () => {
  const { user, push } = useSelector((state) => ({
    user: state.user.user,
    push: state.push.push,
  }));
  const [granted, setGranted] = useState(false);
  const converted = urlBase64ToUint8Array(
    process.env.REACT_APP_PUSH_PUBLIC_KEY
  );

  const onClick = useCallback(() => {
    try {
      if (Notification) {
        if (Notification.permission !== "granted") {
          Notification.requestPermission((result) => {
            if (result !== "granted") {
              alert("푸시 알림 기능이 허용되지 않았습니다.");
            } else {
              if (navigator && navigator.serviceWorker) {
                navigator.serviceWorker.ready
                  .then((swreg) => {
                    return swreg.pushManager.getSubscription();
                  })
                  .then((sub) => {
                    if (sub === null) {
                      navigator.serviceWorker.ready.then((swreg) => {
                        return swreg.pushManager
                          .subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: converted,
                          })
                          .then((newSub) => {
                            const filteredSub = JSON.parse(
                              JSON.stringify(newSub)
                            );
                            const pushConfig = {
                              endpoint: filteredSub.endpoint,
                              keys: {
                                p256dh: filteredSub.keys.p256dh,
                                auth: filteredSub.keys.auth,
                              },
                            };

                            return adminAPI.post("/notice/push", pushConfig);
                          });
                      });
                    } else {
                      alert("이미 구독 중 입니다.");
                    }
                  })
                  .catch((err) => {
                    alert(err.message);
                  });
              } else {
                alert("푸시 알림을 지원하지 않습니다.");
                return;
              }
            }
          });
        } else {
          return;
        }
      } else {
        alert("푸시 알림을 지원하지 않습니다.");
      }
    } catch (error) {
      alert(error.message);
    }
  }, [converted]);

  useEffect(() => {
    try {
      if (Notification) {
        setGranted(Notification.permission === "granted");
      } else {
        setGranted(true);
      }
    } catch (e) {
      alert(e);
    }
  }, []);

  return <Header user={user} granted={granted} onClick={onClick} push={push} />;
};

export default HeaderCon;
