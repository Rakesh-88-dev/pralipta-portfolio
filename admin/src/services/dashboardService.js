import api from "./api";

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats", {
    data: undefined,
  });

  return response.data?.data || response.data;
};