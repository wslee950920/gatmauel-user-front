import client from "./client";

export const writeReview = (formData) =>
  client.post("/api/review/write", formData, { withCredentials: true });
