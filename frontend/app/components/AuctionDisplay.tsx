import React from "react";

interface AuctionDisplayProps {
  auctionId: string;
  highestBid: number;
}

export default function AuctionDisplay({
  auctionId,
  highestBid,
}: AuctionDisplayProps) {
  return (
    <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-gray-800">Auction #{auctionId}</h2>
      <p className="text-lg text-gray-600 mt-2">
        Highest Bid:{" "}
        <span className="font-semibold text-green-600">${highestBid}</span>
      </p>
    </div>
  );
}
