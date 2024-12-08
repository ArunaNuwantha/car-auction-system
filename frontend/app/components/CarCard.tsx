import React from "react";

interface Car {
  id: string;
  name: string;
  description: string;
}

interface CarCardProps {
  car: Car;
  onBidClick: () => void;
}

export default function CarCard({ car, onBidClick }: CarCardProps) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{car.name}</h3>
        <p className="text-gray-600 mb-4">{car.description}</p>
        <button
          onClick={onBidClick}
          className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Bid Now
        </button>
      </div>
    </div>
  );
}
