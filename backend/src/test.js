const pool = require("./config/db");

async function testDatabaseConnection() {
  try {
    const [rows] = await pool.execute("SELECT * FROM auctions");
    console.log("Query Result:", rows);
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

testDatabaseConnection();
console.log("end");
