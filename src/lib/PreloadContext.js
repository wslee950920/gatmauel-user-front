import { createContext, useContext } from "react";
import { useDispatch } from "react-redux";

const PreloadContext = createContext(null);
export default PreloadContext;

export const Preloader = ({ resolve, decoded }) => {
  const dispatch = useDispatch();

  const preloadContext = useContext(PreloadContext);
  if (!preloadContext) return null;
  if (preloadContext.done) return null;

  preloadContext.promises.push(
    Promise.resolve(dispatch(resolve({ id: decoded.id, nick: decoded.nick })))
  );
  return null;
};

export const usePreloader = (resolve) => {
  const preloadContext = useContext(PreloadContext);

  if (!preloadContext) return null;
  if (preloadContext.done) return null;

  preloadContext.promises.push(Promise.resolve(resolve()));
};
