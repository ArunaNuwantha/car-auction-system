"use client";

import React, { useEffect, useState } from "react";
import CarCard from "@/app/components/CarCard";
import { useRouter } from "next/navigation";

interface Auction {
  auction_id: number;
  car_id: number;
  start_time: string;
  end_time: string;
}

export default function AuctionListPage() {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const router = useRouter();

  useEffect(() => {
    let ws: WebSocket;
    let retryTimeout: NodeJS.Timeout;

    const connectWebSocket = () => {
      ws = new WebSocket("ws://localhost:8080");
      setSocket(ws);

      ws.onopen = () => {
        console.log("Connected to WebSocket for auction updates.");
        ws.send(JSON.stringify({ event: "getAllAuctions" }));
      };

      ws.onmessage = (message) => {
        const { event, data } = JSON.parse(message.data);

        if (event === "allAuctions") {
          setAuctions(data);
        }

        if (event === "newAuction") {
          setAuctions((prev) => [...prev, data]);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("Disconnected from WebSocket. Retrying in 5 seconds...");
        retryTimeout = setTimeout(connectWebSocket, 5000);
      };
    };

    connectWebSocket();

    return () => {
      if (ws) ws.close();
      clearTimeout(retryTimeout);
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-xl ">Available Auctions</h1>
      <div className=" flex gap-3">
        {auctions.map((auction) => (
          <CarCard
            key={auction.auction_id}
            car={{
              id: auction.car_id.toString(),
              name: `Car ${auction.car_id}`,
              description: `Auction starts at ${new Date(
                auction.start_time
              ).toLocaleString()} and ends at ${new Date(
                auction.end_time
              ).toLocaleString()}`,
            }}
            onBidClick={() => router.push(`/auction/${auction.auction_id}`)}
          />
        ))}
      </div>
    </div>
  );
}
