import axios from "axios";

export const api = axios.create({
  baseURL: (
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
  ).replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  config.headers = config.headers || {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.headers.Authorization) {
    delete config.headers.Authorization;
  }

  return config;
});
