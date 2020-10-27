import client from "./client";

export const notices = () => client.get("/api/notice/list");
