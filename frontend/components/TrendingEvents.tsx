// components/TrendingEvents.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

// ✅ Mock events with image paths
const mockEvents = [
  {
    id: 0,
    name: "ETH Enugu Meetup",
    date: "2024-12-10",
    location: "Enugu, Nigeria",
    image: "/ethenugu.webp",
  },
  {
    id: 1,
    name: "Avalanche Hackathon",
    date: "2024-11-15",
    location: "Virtual",
    image: "/avalanche.png",
  },
  {
    id: 2,
    name: "Web3 DevCon",
    date: "2025-01-20",
    location: "Lagos, Nigeria",
    image: "/web3devcon.webp",
  },
];

// ✅ Mock EventCard with real images
function MockEventCard({ event }: { event: typeof mockEvents[number] }) {
  const [hasMinted] = useState(false);

  return (
    <Link href={`/events/${event.id}`} className="block">
      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 transform">
        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          {hasMinted ? (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
              ✅ Minted
            </span>
          ) : (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
              Live
            </span>
          )}
        </div>

        {/* ✅ Real Image from Public Folder */}
        <div className="w-full h-48 overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            onError={(e) => {
              // Fallback if image fails to load
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200/6366f1/ffffff?text=Event+Image';
            }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{event.name}</h3>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <span>📅 {event.date}</span>
            <span>📍 {event.location}</span>
          </div>
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full font-semibold">
              NFT Ticket
            </span>
            <span className="px-3 py-1 bg-orange-500 text-white text-xs rounded-full font-semibold">
              POAP
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function TrendingEvents() {
  return (
    <section className="py-16 px-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">🔥 Trending Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {mockEvents.map((event) => (
          <MockEventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}