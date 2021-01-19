import { user } from "./client";

export const getInfo = () => user.get("/api/user/info");

export const userUpdate = ({ nickname: nick, address, detail }) =>
  user.patch("/api/user/update", { nick, address, detail });

export const pwUpdate = (content) => user.patch("/api/user/password", content);

export const userWithdraw = (content) => user.put("/api/user/remove", content);
