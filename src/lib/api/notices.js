import axios from "axios";
import { admin } from "./client";

export const notices = (page) => admin.get(`/notice/list?page=${page || 1}`);

let source = null;
export const search = ({ query, page }) => {
  if (source) {
    source.cancel("consecutive requests");
  }
  const CancelToken = axios.CancelToken;
  source = CancelToken.source();

  return admin.get(`/notice/search?query=${query}&page=${page || 1}`, {
    cancelToken: source.token,
  });
};
