import { user } from "./client";

export const getInfo = () => user.get("/api/user/info");
