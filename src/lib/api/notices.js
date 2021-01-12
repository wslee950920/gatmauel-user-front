import { admin } from "./client";

export const notices = (page) =>
  admin.get(`/api/notice/list?page=${page || 1}`);
