const redis = require("../config/redis");
const pool = require("../config/db");

async function getCurrentHighestBid(auctionId) {
  const cachedBid = await redis.get(`auction:${auctionId}:highestBid`);
  return cachedBid ? parseFloat(cachedBid) : 0;
}

async function updateHighestBid(auctionId, bidAmount) {
  await redis.set(`auction:${auctionId}:highestBid`, bidAmount);
}

async function saveBid(auctionId, userId, bidAmount) {
  const query =
    "INSERT INTO bids (auction_id, user_id, bid_amount) VALUES (?, ?, ?)";
  await pool.execute(query, [auctionId, userId, bidAmount]);
}

async function addUser(username) {
  try {
    const query = "INSERT INTO users (username) VALUES (?)";
    await pool.execute(query, [username]);
    console.log(`User ${username} added to the database.`);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      console.log(`User ${username} already exists.`);
    } else {
      console.error("Error adding user to the database:", error.message);
      throw error;
    }
  }
}

async function getAllAuctions() {
  try {
    console.log("Executing database query...");
    const [rows] = await pool.execute("SELECT * FROM auctions");
    // console.log("Query Result:", rows);
    return rows;
  } catch (error) {
    console.error("Database Query Error:", error.message);
    throw error;
  }
}

module.exports = {
  getCurrentHighestBid,
  updateHighestBid,
  saveBid,
  getAllAuctions,
  addUser,
};
