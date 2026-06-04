import axios from "axios";

export const api = axios.create({
  baseURL: (
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"
  ).replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () =>
  localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");

const isAuthRoute = (config) => {
  const url = config?.url || "";
  return url.includes("/auth/login") || url.includes("/auth/register") || url.includes("/auth/forgot-password");
};

api.interceptors.request.use((config) => {
  const token = getToken();

  config.headers = config.headers || {};

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.headers.Authorization) {
    delete config.headers.Authorization;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    if (status === 401 && !isAuthRoute(originalRequest)) {
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      localStorage.removeItem("dyslexialens-user");
      localStorage.setItem("dyslexialens-logged-in", "false");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
