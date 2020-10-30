import client from "./client";

export const login = ({ email, password }) =>
  client.post(
    "/api/auth/login",
    { email, password },
    { withCredentials: true }
  );

export const check = () =>
  client.get("/api/auth/check", { withCredentials: true });
