import axios from "axios";

export const user = axios.create({
  baseURL: "http://localhost:9090",
  withCredentials: true,
});

export const admin = axios.create({
  baseURL: "http://localhost:9091",
});
