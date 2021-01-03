import { user } from "./client";

export const getInfo = () => user.get("/api/user/info");

export const userUpdate = ({ nickname: nick }) =>
  user.patch("/api/user/update", { nick });
