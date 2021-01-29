import { useMemo } from "react";

const useTimer = (sse, end) => {
  const result = useMemo(() => {
    if (sse && end) {
      if (sse >= end) {
        return "00:00";
      } else {
        const temp = end - sse;
        const seconds = ("0" + Math.floor((temp / 1000) % 60)).slice(-2);
        const minutes = ("0" + Math.floor((temp / 1000 / 60) % 60)).slice(-2);

        return minutes + ":" + seconds;
      }
    } else {
      return "";
    }
  }, [sse, end]);

  return result;
};

export default useTimer;
