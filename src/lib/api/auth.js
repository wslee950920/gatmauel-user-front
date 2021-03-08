import axios from "axios";
import { user } from "./client";

export const login = ({ email, password, checked }) =>
  user.post("/auth/login", { email, password, checked });

export const register = ({ nick, email, password }) =>
  user.post("/auth/register", { nick, email, password });

let source = null;
export const checkNick = ({ nick }) => {
  if (source) {
    source.cancel("consecutive requests");
  }
  const CancelToken = axios.CancelToken;
  source = CancelToken.source();

  return user.post(
    "/auth/check/nick",
    { nick },
    {
      cancelToken: source.token,
    }
  );
};

export const check = () => user.get("/auth/check");

export const logout = () => user.get("/auth/logout");
