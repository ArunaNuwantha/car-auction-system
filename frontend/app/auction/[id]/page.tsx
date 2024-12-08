"use client";

import React, { useEffect, useState } from "react";
import AuctionDisplay from "@/app/components/AuctionDisplay";
import BidForm from "@/app/components/BidForm";
import AuctionMessages from "@/app/components/AuctionMessages";
import { use } from "react";

interface AuctionPageProps {
  params: Promise<{ id: string }>;
}

function generateRandomUsername() {
  const randomId = Math.floor(Math.random() * 100000);
  return `User${randomId}`;
}

function getOrCreateUsername() {
  let username = localStorage.getItem("username");
  if (!username) {
    username = generateRandomUsername();
    localStorage.setItem("username", username);
  }
  return username;
}

export default function AuctionPage({ params }: AuctionPageProps) {
  const { id } = use(params);
  const [highestBid, setHighestBid] = useState<number>(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const username = getOrCreateUsername();

  useEffect(() => {
    let ws: WebSocket;
    let retryTimeout: NodeJS.Timeout;
    const connectWebSocket = () => {
      ws = new WebSocket("ws://localhost:8080");
      setSocket(ws);
      const username = getOrCreateUsername();
      ws.onopen = () => {
        ws.send(
          JSON.stringify({ event: "joinAuction", data: { id, username } })
        );
        ws.send(JSON.stringify({ event: "getHighestBit", data: { id } }));
        setMessages((prev) => [...prev, "Connected to auction."]);
      };

      ws.onmessage = (message) => {
        const { event, data } = JSON.parse(message.data);

        if (event === "newHighestBid") {
          setHighestBid(data.bidAmount);
          setMessages((prev) => [
            ...prev,
            `New highest bid: $${data.bidAmount}`,
          ]);
        }

        if (event === "setHighestBit") {
          console.log("Get current highest bit ");
          setHighestBid(data.highestBit);
        }

        if (event === "auctionEnded") {
          setMessages((prev) => [
            ...prev,
            `Auction ended with highest bid: $${data.highestBid}`,
          ]);
        }
      };

      ws.onerror = (error) => {
        console.log("WebSocket error:", error);
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
  }, [id]);

  return (
    <div style={{ padding: "20px" }}>
      <AuctionDisplay auctionId={id} highestBid={highestBid} />
      <BidForm
        socket={socket}
        auctionId={id}
        username={username}
        setMessages={setMessages}
      />
      <AuctionMessages messages={messages} />
    </div>
  );
}
