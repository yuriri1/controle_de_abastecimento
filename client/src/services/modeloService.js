import axios from "axios";

const baseUrl = "http://localhost:3000/modelo";

const getAllModelo = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getModeloById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const storeModelo = async (modelo) => {
  const response = await axios.post(baseUrl, modelo);
  return response.data;
};

const updateModelo = async (id, modelo) => {
  const response = await axios.put(`${baseUrl}/${id}`, modelo);
  return response.data;
};

const deleteModeloById = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export {
  getAllModelo,
  getModeloById,
  storeModelo,
  deleteModeloById,
  updateModelo,
};
