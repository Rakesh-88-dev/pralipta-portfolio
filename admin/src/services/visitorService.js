import api from "./api";

export const getVisitStats = async () => {
  const response = await api.get("/visits/stats");

  return response.data?.data || response.data;
};