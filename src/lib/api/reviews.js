import { user } from "./client";

export const reviews = (page) => {
  return user.get(`/review/list?page=${page || 1}`);
};
