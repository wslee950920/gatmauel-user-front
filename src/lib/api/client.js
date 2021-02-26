import axios from "axios";

export const user = axios.create({
  baseURL: "https://www.gatmauel.com/@user",
  withCredentials: true,
});

export const admin = axios.create({
  baseURL: "https://www.gatmauel.com/@admin",
});
