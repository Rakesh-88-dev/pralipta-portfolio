import api from "./api";

export const sendMessage = async (messageData) => {
  const response = await api.post("/messages", messageData);

  return response.data;
};