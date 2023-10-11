const { query } = require("../utils/query");

const insert = async (obj) => {
  const { placa, modelo, obs } = obj;
  const values = [placa, modelo.id, obs];

  const sql = `
  INSERT INTO 
  veiculo (placa, id_modelo, obs)
  VALUES ($1, $2, $3)
  `;

  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.log("insert: ", error);
  }
};

const select = async () => {
  const sql = `SELECT * FROM veiculo order by placa`;

  try {
    const result = await query(sql);
    return result;
  } catch (error) {
    console.log("select: ", error);
  }
};

const selectById = async (id) => {
  const sql = `SELECT * FROM veiculo WHERE placa = $1`;
  try {
    const result = await query(sql, [id]);
    return result;
  } catch (error) {
    console.log("selectById: ", error);
  }
};

const deleteById = async (id) => {
  const sql = `DELETE FROM veiculo WHERE placa = $1`;
  try {
    const result = await query(sql, [id]);
    return result;
  } catch (error) {
    console.log("deleteById: ", error);
  }
};

const updateById = async (obj) => {
  const { placa, modelo, obs } = obj;
  const values = [modelo, obs, placa];

  console.log(values);

  const sql = `
  UPDATE veiculo
  SET id_modelo = $1, obs = $2
  WHERE placa = $3
  `;
  try {
    const result = await query(sql, values);
    return result;
  } catch (error) {
    console.log("updateById: ", error);
  }
};

module.exports = { insert, select, selectById, deleteById, updateById };
