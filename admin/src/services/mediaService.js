import api from "./api";

export const getMedia = async () => {
  const response = await api.get("/media");

  return response.data?.data || response.data;
};

export const uploadMedia = async (formData) => {
  const response = await api.post("/media/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data?.data || response.data;
};

export const deleteMedia = async (id) => {
  const response = await api.delete(`/media/${id}`);

  return response.data?.data || response.data;
};