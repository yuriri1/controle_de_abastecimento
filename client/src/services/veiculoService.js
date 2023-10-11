import axios from "axios";
import { getAllModelo } from "./modeloService";

const baseUrl = "http://localhost:3000/veiculo";

const getAllVeiculo = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getVeiculoById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const storeVeiculo = async (veiculo) => {
  const response = await axios.post(baseUrl, veiculo);
  return response.data;
};

const getModelos = async () => {
  const modelos = await getAllModelo();
  return modelos;
};

const deleteVeiculoById = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const updateVeiculo = async (veiculo) => {
  const response = await axios.put(`${baseUrl}`, veiculo);
  return response.data;
};

export {
  getAllVeiculo,
  getVeiculoById,
  storeVeiculo,
  getModelos,
  deleteVeiculoById,
  updateVeiculo,
};
