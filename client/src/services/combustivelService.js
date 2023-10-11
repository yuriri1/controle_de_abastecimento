import axios from "axios";

const baseUrl = "http://localhost:3000/combustivel";

const getAllCombustivel = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const getCombutivelById = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};

export { getAllCombustivel, getCombutivelById };
