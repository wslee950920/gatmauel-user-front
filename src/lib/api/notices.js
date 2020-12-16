import { admin } from "./client";

export const notices = () => admin.get("/api/notice/list");
