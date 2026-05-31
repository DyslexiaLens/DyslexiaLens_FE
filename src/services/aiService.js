import { api } from "../lib/api";

function buildImageFormData(file) {
  const formData = new FormData();
  formData.append("image", file);
  return formData;
}

export const detectDyslexia = async (file) => {
  const res = await api.post(
    "/api/v1/ai/detections",
    buildImageFormData(file),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data;
};

export const translateImageText = async (file) => {
  const res = await api.post(
    "/api/v1/ai/translations",
    buildImageFormData(file),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return res.data;
};
