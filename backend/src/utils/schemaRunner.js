const fs = require("fs/promises");
const pool = require("../config/db");

async function runSchema(filePath) {
  const schema = await fs.readFile(filePath, "utf-8");
  const connection = await pool.getConnection();

  try {
    await connection.query(schema);
    console.log("Schema executed successfully.");
  } catch (err) {
    console.error("Error executing schema:", err.message);
  } finally {
    connection.release();
  }
}

module.exports = {
  runSchema,
};
