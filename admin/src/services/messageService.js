import api from "./api";

export const getMessages = async () => {
  const response = await api.get("/messages");

  return response.data?.data || response.data;
};

export const getMessage = async (id) => {
  const response = await api.get(`/messages/${id}`);

  return response.data?.data || response.data;
};

export const updateMessage = async (id, messageData) => {
  const response = await api.put(`/messages/${id}`, messageData);

  return response.data?.data || response.data;
};

export const deleteMessage = async (id) => {
  const response = await api.delete(`/messages/${id}`);

  return response.data?.data || response.data;
};