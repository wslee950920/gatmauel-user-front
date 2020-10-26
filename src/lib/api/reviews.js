import client from "./client";

export const reviews = () => client.get("/api/review/list");
