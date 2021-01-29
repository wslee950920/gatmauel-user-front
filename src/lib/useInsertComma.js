import { useMemo } from "react";

const useInsertComma = (total) => {
  const result = useMemo(() => {
    if (total === 0) {
      return "0원";
    } else {
      const result = String(total).split("");
      result.push("원");
      result.splice(-4, 0, ",");

      return result.join("");
    }
  }, [total]);

  return result;
};

export default useInsertComma;
