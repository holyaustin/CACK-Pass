// components/EventCard.tsx
'use client';

import Link from 'next/link';
import { useAccount, useReadContract } from 'wagmi';
import { contractAbi } from '@/lib/contract';

export default function EventCard({ event }: { event: { id: number; name: string; date: string; location: string } }) {
  const { address } = useAccount();

  // Check if user has already minted this event NFT
  const { data: hasMinted, isLoading } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'hasUserMinted',
    args: [BigInt(event.id), address!],
    query: {
      enabled: !!address, // Only run if wallet is connected
    },
  });

  return (
    <Link href={`/events/${event.id}`} className="block">
      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 transform">
        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          {isLoading ? (
            <span className="text-xs font-medium text-gray-500 animate-pulse">Checking...</span>
          ) : hasMinted ? (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
              ✅ Minted
            </span>
          ) : (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
              Live
            </span>
          )}
        </div>

        {/* Card Content */}
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