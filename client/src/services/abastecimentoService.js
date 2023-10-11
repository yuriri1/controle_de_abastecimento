import axios from "axios";
import { getAllVeiculo, getVeiculoById } from "./veiculoService";
import { getAllCombustivel, getCombutivelById } from "./combustivelService";

const baseUrl = "http://localhost:3000/abastecimento";

const getAllAbastecimento = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getAbastecimentoById = async (id) => {
  const response = await axios.get(`${baseUrl}/id/${id}`);
  return response.data;
};

const getAbastecimentoByPage = async (page) => {
  const response = await axios.get(`${baseUrl}/page?page=${page}`);
  return response.data;
};

const storeAbastecimento = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const getVeiculos = async () => {
  const veiculos = await getAllVeiculo();
  return veiculos;
};

const getVeiculosById = async (id) => {
  const veiculo = await getVeiculoById(id);
  return veiculo;
};

const getCombustiveis = async () => {
  const combustiveis = await getAllCombustivel();
  return combustiveis;
};

const getCombustiveisById = async (id) => {
  const combustivel = await getCombutivelById(id);
  return combustivel;
};

const deleteAbastecimentoById = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

const updateAbastecimento = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response.data;
};

export {
  getAllAbastecimento,
  getAbastecimentoById,
  getAbastecimentoByPage,
  storeAbastecimento,
  getVeiculos,
  getVeiculosById,
  getCombustiveis,
  getCombustiveisById,
  deleteAbastecimentoById,
  updateAbastecimento,
};
