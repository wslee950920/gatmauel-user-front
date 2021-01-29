import { useMemo, useRef } from "react";

export const getPlatform = () => {
  const filter = "win16|win32|win64|macintel|mac";

  return (
    navigator.platform && filter.indexOf(navigator.platform.toLowerCase()) < 0
  );
};

const usePlatform = () => {
  const filter = useRef("win16|win32|win64|macintel|mac");

  const platform = useMemo(() => {
    return (
      navigator.platform &&
      filter.current.indexOf(navigator.platform.toLowerCase()) < 0
    );
  }, []);

  return platform;
};

export default usePlatform;
