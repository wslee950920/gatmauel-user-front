import { user } from "./client";

export const writeReview = (formData) =>
  user.post("/api/review/write", formData);
