import { admin } from "./client";

export const category = () => {
  return admin.get(`/category/list`);
};
export const food = () => {
  return admin.get("/food/list");
};
