const { query } = require("../utils/query");

const insert = async (obj) => {
  const {
    placa,
    tipocombustivel,
    abasttotal,
    quantidade,
    valortotal,
    data,
    kmatual,
  } = obj;

  const values = [
    placa,
    tipocombustivel,
    abasttotal,
    quantidade,
    valortotal,
    data,
    kmatual,
  ];

  const sql = `
    INSERT INTO abastecimento
    (placa, tipocombustivel, abasttotal, quantidade, valortotal, data, kmatual)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
  `;

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const select = async () => {
  const sql = `SELECT * FROM abastecimento order by data`;

  try {
    const result = await query(sql);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const selectById = async (id) => {
  const sql = `SELECT * FROM abastecimento WHERE id = $1 order by data`;
  try {
    const result = await query(sql, [id]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const selectByPage = async (page) => {
  const sql = `SELECT * FROM abastecimento order by placa, data LIMIT 10 OFFSET $1`;
  try {
    const result = await query(sql, [page]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const deleteById = async (id) => {
  const sql = `DELETE FROM abastecimento WHERE id = $1`;
  try {
    const result = await query(sql, [id]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const updateById = async (id, obj) => {
  const {
    placa,
    tipocombustivel,
    abasttotal,
    quantidade,
    valortotal,
    data,
    kmatual,
  } = obj;

  const values = [
    placa,
    tipocombustivel,
    abasttotal,
    quantidade,
    valortotal,
    data,
    kmatual,
    id,
  ];

  const sql = `
    UPDATE abastecimento
    SET placa = $1,
    tipocombustivel = $2,
    abasttotal = $3,
    quantidade = $4,
    valortotal = $5,
    data = $6,
    kmatual = $7
    WHERE id = $8
  `;
  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const selectByPlaca = async (placa) => {
  const sql = `SELECT * FROM abastecimento WHERE placa = $1 order by data`;
  try {
    const result = await query(sql, [placa]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const countEntrys = async () => {
  const sql = `SELECT COUNT(*) as totalItems FROM abastecimento`;
  try {
    const result = await query(sql);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  insert,
  select,
  selectById,
  deleteById,
  updateById,
  selectByPage,
  countEntrys,
  selectByPlaca,
};
