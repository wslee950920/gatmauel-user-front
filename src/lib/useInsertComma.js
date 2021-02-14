import { useMemo } from "react";

const useInsertComma = (total) => {
  const result = useMemo(() => {
    if (total === 0) {
      return "0원";
    } else {
      const result = String(total).split("");
      if (result.length > 3) {
        result.push("원");
        result.splice(-4, 0, ",");
      } else {
        result.push("원");
      }

      return result.join("");
    }
  }, [total]);

  return result;
};

export default useInsertComma;
