import React, { useState } from "react";

interface BidFormProps {
  socket: WebSocket | null;
  auctionId: string;
  username: string;
  setMessages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function BidForm({
  socket,
  auctionId,
  username,
  setMessages,
}: BidFormProps) {
  const [newBid, setNewBid] = useState<string>("");

  const placeBid = () => {
    if (!socket) {
      setMessages((prev) => [...prev, "Not connected to server."]);
      return;
    }

    socket.send(
      JSON.stringify({
        event: "placeBid",
        data: { auctionId, bidAmount: parseFloat(newBid) },
      })
    );
    setMessages((prev) => [...prev, `${username} placed a bid: $${newBid}`]);
    setNewBid("");
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Place Your Bid</h2>
      <div className="flex flex-col gap-4">
        <input
          type="number"
          value={newBid}
          onChange={(e) => setNewBid(e.target.value)}
          placeholder="Enter your bid"
          className="px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={placeBid}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Place Bid
        </button>
      </div>
    </div>
  );
}
