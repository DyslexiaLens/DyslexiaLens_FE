import { api } from "../lib/api";

export const getProfile = async () => {
  const res = await api.get("/api/v1/profile");
  return res.data;
};

export const updateProfile = async ({
  fullName,
  phone,
  birthDate,
  avatarUrl,
}) => {
  const res = await api.patch("/api/v1/profile", {
    fullName,
    phone,
    birthDate,
    avatarUrl,
  });

  return res.data;
};

export const updateAddress = async ({ city, postalCode, country }) => {
  const res = await api.patch("/api/v1/profile/address", {
    city,
    postalCode,
    country,
  });

  return res.data;
};
