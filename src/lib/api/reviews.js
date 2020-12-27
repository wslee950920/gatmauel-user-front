import { user } from "./client";

export const reviews = (page) => {
  return user.get(`/api/review/list?page=${page || 1}`);
};
