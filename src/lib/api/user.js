import { user } from "./client";

export const getInfo = () => user.get("/user/info");

export const userUpdate = ({ nickname: nick, address, detail, phone }) =>
  user.patch("/user/update", { nick, address, detail, phone });

export const pwUpdate = (content) => user.patch("/user/password", content);

export const userWithdraw = (content) => user.put("/user/remove", content);
