import React from "react";

interface AuctionMessagesProps {
  messages: string[];
}

export default function AuctionMessages({ messages }: AuctionMessagesProps) {
  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-3">Messages</h3>
      <ul className="space-y-2">
        {messages.map((msg, index) => (
          <li
            key={index}
            className="bg-gray-100 px-3 py-2 rounded text-gray-700 border border-gray-300"
          >
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
}
