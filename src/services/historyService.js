import { api } from "../lib/api";

export const getHistories = async () => {
  const res = await api.get("/api/v1/history");
  return res.data;
};

export const deleteHistory = async (id) => {
  const res = await api.delete(`/api/v1/history/${id}`);
  return res.data;
};
