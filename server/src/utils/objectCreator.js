const { selectById: selectByIdVeiculo } = require("../services/veiculoScripts");
const { selectById: selectByIdModelo } = require("../services/modeloScripts");
const { Veiculo } = require("../models/Veiculo");
const { Modelo } = require("../models/Modelo");
const { Abastecimento } = require("../models/Abastecimento");

const createVeiculo = async (id) => {
  try {
    const result = await selectByIdVeiculo(id);
    const resultModelo = await selectByIdModelo(result.rows[0].id_modelo);
    const modelo = new Modelo(
      resultModelo.rows[0].descricao,
      resultModelo.rows[0].capactanque,
      resultModelo.rows[0].id
    );
    const veiculo = new Veiculo(
      result.rows[0].placa,
      modelo,
      result.rows[0].obs
    );
    return veiculo;
  } catch (err) {
    console.log(err);
  }
};

const createModelo = async (id) => {
  try {
    const result = await selectByIdModelo(id);
    const modelo = new Modelo(
      result.rows[0].descricao,
      result.rows[0].capactanque,
      result.rows[0].id
    );
    return modelo;
  } catch (err) {
    console.log(err);
  }
};

const createAbastecimento = async (id) => {
  try {
    const result = await selectById(id);
    const veiculo = await createVeiculo(result.rows[0].placa);
    const abastecimento = new Abastecimento(
      veiculo,
      result.rows[0].tipocombustivel,
      result.rows[0].abasttotal,
      result.rows[0].quantidade,
      result.rows[0].valortotal,
      result.rows[0].data,
      result.rows[0].kmatual,
      result.rows[0].id
    );
    return abastecimento;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createVeiculo, createModelo, createAbastecimento };
