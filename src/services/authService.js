import { api } from "../lib/api";

export const register = async ({ fullName, email, password }) => {
  const res = await api.post("/api/v1/auth/register", {
    fullName,
    email,
    password,
  });

  return res.data;
};

export const login = async ({ email, password }) => {
  const res = await api.post("/api/v1/auth/login", {
    email,
    password,
  });

  return res.data;
};

export const forgotPassword = async ({ email }) => {
  const res = await api.post("/api/v1/auth/forgot-password", {
    email,
  });

  return res.data;
};

export const verifyOtp = async ({ email, otpCode }) => {
  const res = await api.post("/api/v1/auth/verify-otp", {
    email,
    otpCode,
  });

  return res.data;
};

export const resetPassword = async ({ email, otpCode, newPassword }) => {
  const res = await api.post("/api/v1/auth/reset-password", {
    email,
    otpCode,
    newPassword,
  });

  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/api/v1/auth/me");
  return res.data;
};

export const changePassword = async ({ currentPassword, newPassword, otpCode }) => {
  const res = await api.patch("/api/v1/auth/change-password", {
    currentPassword,
    newPassword,
    otpCode,
  });

  return res.data;
};

export const logout = async () => {
  const res = await api.post("/api/v1/auth/logout");
  return res.data;
};
