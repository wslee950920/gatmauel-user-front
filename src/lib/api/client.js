import axios from "axios";

export const user = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://user.gatmauel.com/@user"
      : "https://localhost/@user",
  withCredentials: true,
});

export const admin = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://admin.gatmauel.com/@admin"
      : "https://localhost/@admin",
});
