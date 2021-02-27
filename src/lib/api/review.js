import { user } from "./client";

export const write = ({ formData, setProgress }) =>
  user.post("/review/write", formData, {
    onUploadProgress: (e) => {
      setProgress(parseInt(Math.round((e.loaded * 100) / e.total)));
    },
  });

export const update = ({ id, content }) =>
  user.patch(`/review/update/${id}`, { content });

export const remove = (id) => user.delete(`/review/remove/${id}`);
