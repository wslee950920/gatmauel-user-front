import { useMemo } from "react";

const useGetTotal = (order) => {
  const result = useMemo(() => {
    return order.reduce(
      (prev, value) => prev + value.price * (value.num === "" ? 0 : value.num),
      0
    );
  }, [order]);

  return result;
};

export default useGetTotal;
