import client from "./client";

export const notices = () => client.get("/api/notices/list");
