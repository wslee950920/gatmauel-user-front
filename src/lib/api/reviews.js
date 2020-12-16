import { user } from "./client";

export const reviews = () => user.get("/api/review/list");
