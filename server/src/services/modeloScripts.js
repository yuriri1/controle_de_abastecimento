const { query } = require("../utils/query");

const insert = async (obj) => {
  const { descricao, capactanque } = obj;

  const values = [descricao, capactanque];

  const sql = `INSERT INTO modelo (descricao, capactanque) VALUES ($1, $2)`;

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.log("modelo: ", error);
  }
};

const select = async () => {
  const sql = `SELECT * FROM modelo order by capactanque`;

  try {
    const result = await query(sql);
    return result;
  } catch (error) {
    console.log("modelo: ", error);
  }
};

const selectById = async (id) => {
  const sql = `SELECT * FROM modelo WHERE id = $1`;
  try {
    const result = await query(sql, [id]);
    return result;
  } catch (error) {
    console.log("modelo: ", error);
  }
};

const deleteById = async (id) => {
  const sql = `DELETE FROM modelo WHERE id = $1`;
  try {
    const result = await query(sql, [id]);
    return result;
  } catch (error) {
    console.log("modelo: ", error);
  }
};

const updateById = async (obj) => {
  const { id, descricao, capactanque } = obj;
  const sql = `UPDATE modelo SET descricao = $1, capactanque = $2 WHERE id = $3`;
  try {
    const result = await query(sql, [descricao, capactanque, id]);
    return result;
  } catch (error) {
    console.log("modelo: ", error);
  }
};

module.exports = { insert, select, selectById, deleteById, updateById };
