// app/events/[id]/page.tsx
'use client';

import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { contractAbi } from '../../../lib/contract';
import { useEffect, useState } from 'react';
import { avalancheFuji } from 'wagmi/chains';
import { useSwitchChain } from 'wagmi';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function EventDetail({ params }: { params: { id: string } }) {
  const { address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { writeContract } = useWriteContract();

  const [event, setEvent] = useState<any>(null);
  const eventId = BigInt(params.id); // ✅ Convert to BigInt

  // 🔍 Check if user has already minted this event
  const {
    data: hasMinted,
    isLoading: checkingMint,
    refetch: refetchMintStatus,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'hasUserMinted',
    args: [eventId, address!],
    query: {
      enabled: !!address, // Only run if wallet is connected
    },
  });

  // Simulate fetching event data (replace with IPFS/metadata later)
  useEffect(() => {
    const fetchEvent = async () => {
      setEvent({
        name: `ETH Enugu Hackathon #${params.id}`,
        date: '2024-12-10',
        location: 'Enugu, Nigeria',
        description: 'Join us for an epic Web3 hackathon in Enugu! Mint your NFT ticket and earn POAP.',
        image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800',
      });
    };
    fetchEvent();
  }, [params.id]);

  // 🔁 Handle Mint
  const handleMint = () => {
    if (chain?.id !== avalancheFuji.id) {
      switchChain({ chainId: avalancheFuji.id });
      return;
    }

    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: contractAbi,
      functionName: 'mintEventNFT',
      args: [eventId], // ✅ Now BigInt
      onSuccess: () => {
        alert('🎉 Ticket minted successfully!');
        refetchMintStatus(); // Refresh mint status
      },
      onError: (error) => {
        console.error('Mint failed:', error);
        alert('❌ Mint failed: ' + error.message);
      },
    });
  };

  if (!event) return <div className="text-center py-20">Loading event...</div>;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Event Image */}
          <div className="relative h-64 md:h-80 w-full">
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{event.name}</h1>
            <p className="text-lg text-gray-600 mb-6">
              📅 {event.date} • 📍 {event.location}
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">{event.description}</p>

            {/* Mint Button */}
            <div className="space-y-4">
              {checkingMint ? (
                <div className="text-center py-4">
                  <div className="inline-block animate-spin w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full mr-2"></div>
                  <span className="text-gray-600">Checking mint status...</span>
                </div>
              ) : hasMinted ? (
                <button
                  disabled
                  className="w-full bg-blue-100 text-blue-800 font-bold py-3 px-8 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
                >
                  ✅ Already Minted
                </button>
              ) : !address ? (
                <button
                  onClick={() => {
                    // This will be handled by WalletConnectButton
                  }}
                  className="w-full bg-gray-400 text-white font-bold py-3 px-8 rounded-lg"
                >
                  Connect Wallet to Mint
                </button>
              ) : chain?.id !== avalancheFuji.id ? (
                <button
                  onClick={() => switchChain({ chainId: avalancheFuji.id })}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg"
                >
                  🔁 Switch to Avalanche Fuji
                </button>
              ) : (
                <button
                  onClick={handleMint}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition"
                >
                  🎟️ Mint Ticket
                </button>
              )}
            </div>

            {/* Network Info */}
            {address && chain && (
              <p className="text-xs text-gray-500 text-center mt-4">
                Connected on <strong>{chain.name}</strong>
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}