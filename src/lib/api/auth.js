import { user } from "./client";

export const login = ({ email, password, checked }) =>
  user.post("/auth/login", { email, password, checked });

export const register = ({ nick, email, password }) =>
  user.post("/auth/register", { nick, email, password });
export const checkNick = ({ nick }) => user.post("/auth/check/nick", { nick });

export const check = () => user.get("/auth/check");

export const logout = () => user.get("/auth/logout");
