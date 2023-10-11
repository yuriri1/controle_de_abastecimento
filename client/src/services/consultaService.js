import axios from "axios";

import { getAllModelo } from "./modeloService";
import { getVeiculoById } from "./veiculoService";
import { getCombutivelById } from "./combustivelService";

const baseUrl = "http://localhost:3000/consulta";

const getAbastecimentoByPlaca = async (placa) => {
  const response = await axios.get(`${baseUrl}/placa/${placa}`);
  return response.data;
};

const getAbastecimentoByPlacaAndData = async (placa, data, periodo) => {
  const response = await axios.get(
    `${baseUrl}/placa/periodo/${periodo}/${data}/${placa}`
  );
  return response.data;
};

const getAbastecimentoByPlacaAndPeriodo = async (
  placa,
  dataInicio,
  dataFim
) => {
  const response = await axios.get(
    `${baseUrl}/placa/periodo/${placa}/${dataInicio}/${dataFim}`
  );
  return response.data;
};

const getAbastecimentoByPeriodo = async (dataInicio, dataFim) => {
  const response = await axios.get(
    `${baseUrl}/periodo/${dataInicio}/${dataFim}`
  );
  return response.data;
};

const getAbastecimentoByData = async (data, periodo) => {
  const response = await axios.get(`${baseUrl}/data/${periodo}/${data}`);
  return response.data;
};

const getAbastecimentoByModelo = async (modelo) => {
  const response = await axios.get(`${baseUrl}/modelo/${modelo}`);
  return response.data;
};

const getAbastecimentoByModeloAndData = async (modelo, data, periodo) => {
  const response = await axios.get(
    `${baseUrl}/modelo/periodo/${periodo}/${data}/${modelo}`
  );
  return response.data;
};

const getAbastecimentoByModeloAndPeriodo = async (
  modelo,
  dataInicio,
  dataFim
) => {
  const response = await axios.get(
    `${baseUrl}/${modelo}/${dataInicio}/${dataFim}`
  );
  return response.data;
};

const getModelos = async () => {
  const modelos = await getAllModelo();
  return modelos;
};

const getVeiculosById = async (id) => {
  const veiculo = await getVeiculoById(id);
  return veiculo;
};

const getCombustiveisById = async (id) => {
  const combustiveis = await getCombutivelById(id);
  return combustiveis;
};

export {
  getAbastecimentoByPlaca,
  getAbastecimentoByPlacaAndData,
  getAbastecimentoByPlacaAndPeriodo,
  getAbastecimentoByPeriodo,
  getAbastecimentoByData,
  getAbastecimentoByModelo,
  getAbastecimentoByModeloAndData,
  getAbastecimentoByModeloAndPeriodo,
  getModelos,
  getVeiculosById,
  getCombustiveisById,
};
