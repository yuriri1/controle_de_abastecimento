const { connection } = require("../config/database/connection");

const query = async (sql, values = null) => {
  const client = await connection.connect();
  try {
    if (values) {
      return await client.query(sql, values);
    }
    return await client.query(sql);
  } catch (error) {
    console.log("query: ", error);
  } finally {
    client.release();
  }
};

module.exports = { query };
