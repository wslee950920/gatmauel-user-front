import { useMemo } from "react";

const useTime = (time) => {
  const result = useMemo(() => {
    const temp = new Date(time);
    const year = temp.getFullYear().toString().substr(2, 2);
    const month = temp.getMonth() + 1;
    const date = temp.getDate();

    return `${year}/${month}/${date}`;
  }, [time]);

  return result;
};

export default useTime;
