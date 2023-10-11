const { query } = require("../utils/query");

const selectByPlaca = async (placa) => {
  const sql = `SELECT * FROM abastecimento WHERE placa = $1 order by data`;
  try {
    const result = await query(sql, [placa]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const selectByModelo = async (modelo) => {
  const sql = `
    SELECT abastecimento.* FROM abastecimento 
    JOIN veiculo ON abastecimento.placa = veiculo.placa
    JOIN modelo ON veiculo.id_modelo = modelo.id 
    WHERE modelo.id = $1 order by data`;
  try {
    const result = await query(sql, [modelo]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const selectByPeriodo = async (data_inicial, data_final) => {
  const sql = `
    SELECT abastecimento.* FROM abastecimento 
    WHERE data BETWEEN $1 AND $2 order by data`;
  try {
    const result = await query(sql, [data_inicial, data_final]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const selectByPeriodoAndModelo = async (data_inicial, data_final, modelo) => {
  const sql = `
    SELECT abastecimento.* FROM abastecimento 
    JOIN veiculo ON abastecimento.placa = veiculo.placa
    JOIN modelo ON veiculo.id_modelo = modelo.id 
    WHERE data BETWEEN $1 AND $2 AND modelo.id = $3 order by data`;
  try {
    const result = await query(sql, [data_inicial, data_final, modelo]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const selectByPeriodoAndPlaca = async (data_inicial, data_final, placa) => {
  const sql = `
    SELECT abastecimento.* FROM abastecimento 
    JOIN veiculo ON abastecimento.placa = veiculo.placa
    WHERE data BETWEEN $1 AND $2 AND veiculo.placa = $3 order by data`;
  try {
    const result = await query(sql, [data_inicial, data_final, placa]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const selectByData = async (data, tipo) => {
  let sql;
  if (tipo == "inicio") {
    sql = `
      SELECT abastecimento.* FROM abastecimento 
      WHERE data >= $1 order by data`;
  } else if (tipo == "fim") {
    sql = `
      SELECT abastecimento.* FROM abastecimento 
      WHERE data <= $1 order by data`;
  }
  try {
    const result = await query(sql, [data]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const selectByDataAndModelo = async (data, modelo, tipo) => {
  let sql;
  if (tipo === "inicio") {
    sql = `
      SELECT abastecimento.* FROM abastecimento 
      JOIN veiculo ON abastecimento.placa = veiculo.placa
      JOIN modelo ON veiculo.id_modelo = modelo.id 
      WHERE data >= $1 AND modelo.id = $2 order by data`;
  } else if (tipo === "fim") {
    sql = `
      SELECT abastecimento.* FROM abastecimento 
      JOIN veiculo ON abastecimento.placa = veiculo.placa
      JOIN modelo ON veiculo.id_modelo = modelo.id 
      WHERE data <= $1 AND modelo.id = $2 order by data`;
  }
  try {
    const result = await query(sql, [data, modelo]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const selectByDataAndPlaca = async (data, placa, tipo) => {
  let sql;
  if (tipo === "inicio") {
    sql = `
      SELECT abastecimento.* FROM abastecimento 
      JOIN veiculo ON abastecimento.placa = veiculo.placa
      WHERE data >= $1 AND veiculo.placa = $2 order by data`;
  } else if (tipo === "fim") {
    sql = `
      SELECT abastecimento.* FROM abastecimento 
      JOIN veiculo ON abastecimento.placa = veiculo.placa
      WHERE data <= $1 AND veiculo.placa = $2 order by data`;
  }
  try {
    const result = await query(sql, [data, placa]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  selectByPlaca,
  selectByModelo,
  selectByPeriodo,
  selectByPeriodoAndModelo,
  selectByPeriodoAndPlaca,
  selectByData,
  selectByDataAndModelo,
  selectByDataAndPlaca,
};
