const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
  console.log("Connected to WebSocket server.");

  ws.send(
    JSON.stringify({
      event: "getAllAuctions",
    })
  );
});

ws.on("message", (message) => {
  try {
    const { event, data } = JSON.parse(message);

    if (event === "allAuctions") {
      console.log("Auctions received from server:", data);
    } else if (event === "error") {
      console.error("Error received from server:", data.message);
    } else {
      console.log("Unexpected event received:", event, data);
    }
  } catch (err) {
    console.error("Error parsing message:", err.message);
  }
});

ws.on("error", (error) => {
  console.error("WebSocket error:", error.message);
});

ws.on("close", () => {
  console.log("Disconnected from WebSocket server.");
});
