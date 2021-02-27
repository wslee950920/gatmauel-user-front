import { admin } from "./client";

export const notices = (page) => admin.get(`/notice/list?page=${page || 1}`);
