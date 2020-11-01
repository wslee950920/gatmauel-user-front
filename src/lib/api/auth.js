import client from "./client";

export const login = ({ email, password }) =>
  client.post(
    "/api/auth/login",
    { email, password },
    { withCredentials: true }
  );

export const register = ({ nick, email, password }) =>
  client.post("/api/auth/register", { nick, email, password });
export const checkNick = ({ nick }) =>
  client.post("/api/auth/check/nick", { nick });

export const check = () =>
  client.get("/api/auth/check", { withCredentials: true });

export const logout = () =>
  client.get("/api/auth/logout", { withCredentials: true });
