import { user } from "./client";

export const write = (formData) => user.post("/api/review/write", formData);

export const update = ({ id, content }) =>
  user.patch(`/api/review/update/${id}`, { content });
