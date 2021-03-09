import { useMemo } from "react";

const usePlatform = () => {
  const platform = useMemo(() => {
    const filter = "win16|win32|win64|macintel|mac";

    return filter.indexOf(navigator.platform.toLowerCase()) < 0;
  }, []);

  return platform;
};

export default usePlatform;
