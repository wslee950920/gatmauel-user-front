import { admin } from "./client";

export const category = () => {
  return admin.get(`/api/category/list`);
};
export const food = () => {
  return admin.get("/api/food/list");
};
