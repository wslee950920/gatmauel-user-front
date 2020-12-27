import axios from "axios";

//이거 안 해주면 클라에서 자기 자신한테 요청을 하더라...
export const user = axios.create({
  baseURL: "http://localhost:9090",
  withCredentials: true,
});

export const admin = axios.create({
  baseURL: "http://localhost:9091",
});
