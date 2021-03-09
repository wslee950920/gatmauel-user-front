import { useMemo } from "react";

const useUrlBase64ToUint8Array = (base64String) => {
  const result = useMemo(() => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      /* eslint-disable */
      .replace(/\-/g, "+")
      /* eslint-enable */
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
  }, [base64String]);

  return result;
};

export default useUrlBase64ToUint8Array;
