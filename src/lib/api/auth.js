import { user } from "./client";

export const login = ({ email, password, checked }) =>
  user.post("/api/auth/login", { email, password, checked });

export const register = ({ nick, email, password }) =>
  user.post("/api/auth/register", { nick, email, password });
export const checkNick = ({ nick }) =>
  user.post("/api/auth/check/nick", { nick });

export const check = () => user.get("/api/auth/check");

export const logout = () => user.get("/api/auth/logout");
