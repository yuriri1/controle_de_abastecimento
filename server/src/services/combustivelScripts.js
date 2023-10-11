const { query } = require("../utils/query");

const select = async () => {
  const sql = `SELECT * FROM combustivel`;

  try {
    const result = await query(sql);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const selectById = async (id) => {
  const sql = `SELECT * FROM combustivel WHERE id = $1`;
  try {
    const result = await query(sql, [id]);
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { select, selectById };
