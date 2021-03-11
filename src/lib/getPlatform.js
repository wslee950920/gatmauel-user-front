const getPlatform = () => {
  const filter = "win16|win32|win64|macintel|mac";
  return filter.indexOf(navigator.platform.toLowerCase()) < 0;
};

export default getPlatform;
