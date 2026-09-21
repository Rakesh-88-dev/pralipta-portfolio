import api from "./api";

export const getCertifications = async () => {
  const response = await api.get("/certifications");

  return response.data?.data || response.data;
};

export const createCertification = async (certificationData) => {
  const response = await api.post(
    "/certifications",
    certificationData
  );

  return response.data?.data || response.data;
};

export const updateCertification = async (
  id,
  certificationData
) => {
  const response = await api.put(
    `/certifications/${id}`,
    certificationData
  );

  return response.data?.data || response.data;
};

export const deleteCertification = async (id) => {
  const response = await api.delete(`/certifications/${id}`);

  return response.data?.data || response.data;
};