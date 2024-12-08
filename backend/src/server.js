const { WebSocketServer } = require("ws");
const { handleAuctionSocket } = require("./websockets/auctionSocket");
const { runSchema } = require("./utils/schemaRunner");
const path = require("path");

async function initializeSchema() {
  const schemaFilePath = path.resolve(__dirname, "./db/schema.sql");
  try {
    console.log("Initializing database schema...");
    await runSchema(schemaFilePath);
    console.log("Database schema initialized successfully.");
  } catch (err) {
    console.error("Error initializing schema:", err.message);
    process.exit(1);
  }
}

(async () => {
  await initializeSchema();

  const wss = new WebSocketServer({ port: 8080 });

  wss.on("connection", (ws, req) => {
    handleAuctionSocket(ws, req);
  });

  console.log("WebSocket server is running on ws://localhost:8080");
})();
