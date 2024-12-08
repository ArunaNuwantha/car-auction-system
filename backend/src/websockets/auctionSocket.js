const WebSocket = require("ws");
const redis = require("../config/redis");
const {
  getAllAuctions,
  addUser,
  getCurrentHighestBid,
} = require("../services/auctionService");
const { placeBid } = require("../services/bidService");

const auctionRooms = new Map();

function handleAuctionSocket(ws, req) {
  ws.on("message", async (message) => {
    try {
      const { event, data } = JSON.parse(message);

      if (event === "joinAuction") {
        const { id, username } = data;
        await addUser(username);
        if (!auctionRooms.has(id)) auctionRooms.set(id, new Set());
        auctionRooms.get(id).add(ws);
        ws.send(JSON.stringify({ event: "joinedAuction", id }));
      }

      if (event === "placeBid") {
        const { auctionId, userId, bidAmount } = data;
        console.log("placeBid:data:", data);
        const result = await placeBid(auctionId, userId, bidAmount);

        if (result.success) {
          broadcastToRoom(auctionId, {
            event: "newHighestBid",
            data: { bidAmount },
          });
        } else {
          ws.send(
            JSON.stringify({ event: "bidRejected", message: result.message })
          );
        }
      }

      if (event === "getAllAuctions") {
        console.log("hit the getAllAuctions");
        const auctions = await getAllAuctions();
        console.log("Fetched auctions size:", auctions.length);

        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ event: "allAuctions", data: auctions }));
        } else {
          console.error("WebSocket is not open. Cannot send data.");
        }
      }

      if (event === "getHighestBit") {
        const { id } = data;
        const highestBit = await getCurrentHighestBid(id);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(
            JSON.stringify({ event: "setHighestBit", data: { highestBit } })
          );
        } else {
          console.error("WebSocket is not open. Cannot send data.");
        }
      }

      if (event === "auctionEnd") {
        const { auctionId } = data;
        const highestBid = await redis.get(`auction:${auctionId}:highestBid`);
        broadcastToRoom(auctionId, { event: "auctionEnded", highestBid });
        auctionRooms.delete(auctionId);
      }
    } catch (error) {
      console.error("Error handling WebSocket message:", error.message);
      ws.send(
        JSON.stringify({
          event: "error",
          message: "An error occurred while processing your request.",
        })
      );
    }
  });

  ws.on("close", () => {
    for (const room of auctionRooms.values()) {
      room.delete(ws);
    }
  });
}

function broadcastToRoom(auctionId, message) {
  const room = auctionRooms.get(auctionId);
  console.log(room);
  if (room) {
    for (const client of room) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    }
  }
}

module.exports = { handleAuctionSocket };
