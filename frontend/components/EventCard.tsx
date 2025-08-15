// components/EventCard.tsx
'use client';

import Link from 'next/link';
import { useAccount, useReadContract } from 'wagmi';
import { contractAbi } from '@/lib/contract';
import axios from 'axios';
import { useEffect, useState } from 'react';

const GATEWAY_URL = 'https://ipfs.io/ipfs/';

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{ trait_type: string; value: string | number | boolean }>;
}

interface ParsedEvent {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

export default function EventCard({ eventId }: { eventId: number }) {
  const { address } = useAccount();

      console.log ("smart contract address is ", process.env.NEXT_PUBLIC_CONTRACT_ADDRESS );
    console.log ("smart contract address is ",address );

  // ✅ Only enable if eventId is valid number
  const isValidEventId = typeof eventId === 'number' && !isNaN(eventId) && eventId >= 0;

  // ✅ Only run query if eventId is valid
const { data: hasMinted, isLoading: isCheckingMint } = useReadContract({
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
  abi: contractAbi,
  functionName: 'hasUserMinted',
  args: isValidEventId && address 
    ? [BigInt(eventId), address] 
    : [BigInt(0), '0x0000000000000000000000000000000000000000'],
  query: {
    enabled: !!address && isValidEventId,
  },
});
  const [metadata, setMetadata] = useState<ParsedEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  function ipfsToHttp(ipfsUrl: string): string {
  if (!ipfsUrl) return '';
  return ipfsUrl.startsWith('ipfs://')
    ? `${GATEWAY_URL}${ipfsUrl.slice(7)}`
    : ipfsUrl;
 }

  useEffect(() => {
    if (!isValidEventId) {
      setError(true);
      setLoading(false);
      return;
    }

    const fetchMetadata = async () => {
      try {
        const { readContract } = await import('@wagmi/core');
        const { wagmiConfig } = await import('@/lib/wagmi');

        const eventResult = await readContract(wagmiConfig, {
          address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
          abi: contractAbi,
          functionName: 'events',
          args: [BigInt(eventId)],
          chainId: 43113,
        });
      console.log("eventResult is", eventResult);
        const baseURI = (eventResult as { [key: string]: any })?.[1];
        if (!baseURI || typeof baseURI !== 'string') {
          throw new Error('Invalid baseURI');
        }

         console.log("baseURI is", baseURI);

        //let metadataUrl = baseURI;
        
        const  metadataUrl = ipfsToHttp( baseURI);
       console.log("metadataUrl is", metadataUrl);

        const { data: nftMetadata } = await axios.get<NFTMetadata>(metadataUrl, { timeout: 10000 });

      console.log("nftMetadata is", nftMetadata);
        const rawDate = nftMetadata.attributes?.find((a) => a.trait_type === 'Date')?.value;
        const rawLocation = nftMetadata.attributes?.find((a) => a.trait_type === 'Location')?.value;

        const date = rawDate ? String(rawDate) : 'TBA';
        const location = rawLocation ? String(rawLocation) : 'Global';

        let imageUrl = nftMetadata.image;
        if (imageUrl.startsWith('ipfs://')) {
          imageUrl = `${GATEWAY_URL}${imageUrl.slice(7)}`;
        }
      console.log(" imageUrl  is", imageUrl );

        setMetadata({
          id: eventId,
          name: nftMetadata.name,
          description: nftMetadata.description || 'No description.',
          date,
          location,
          image: imageUrl,
        });
      } catch (err) {
        console.error(`Failed to load metadata for event ${eventId}:`, err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [eventId]);

  if (loading || !isValidEventId) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </div>
    );
  }

  if (error || !metadata) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 text-center">
        <p className="text-red-500 text-sm">⚠️ Failed to load event data</p>
      </div>
    );
  }

  return (
    <Link href={`/events/${metadata.id}`} className="block">
      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 transform">
        <div className="absolute top-3 right-3 z-10">
          {isCheckingMint ? (
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

        <img
          src={metadata.image}
          alt={metadata.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-event.jpg';
          }}
        />

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{metadata.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{metadata.description}</p>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <span>📅 {metadata.date}</span>
            <span>📍 {metadata.location}</span>
          </div>
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full font-semibold">NFT Ticket</span>
            <span className="px-3 py-1 bg-orange-500 text-white text-xs rounded-full font-semibold">POAP</span>
          </div>
        </div>
      </div>
    </Link>
  );
}