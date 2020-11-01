import client from "./client";

export const getInfo = () =>
  client.get("/api/user/info", { withCredentials: true });
