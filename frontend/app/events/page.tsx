// app/events/page.tsx
'use client';

import { useReadContract, useSwitchChain, useAccount } from 'wagmi';
import { contractAbi } from '@/lib/contract';
import EventCard from '@/components/EventCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { avalancheFuji } from 'wagmi/chains';
import { useEffect, useState } from 'react';

export default function EventsPage() {
  const { address, chain, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();

  const [finalTotal, setFinalTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const { data: totalEventsData, isLoading: isTotalLoading } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'totalEvents',
    chainId: avalancheFuji.id,
  });




  useEffect(() => {
    if (totalEventsData !== undefined) {
      setFinalTotal(Number(totalEventsData));
      setLoading(false);
    }
  }, [totalEventsData]);

    console.log ("smart contract address is ", process.env.NEXT_PUBLIC_CONTRACT_ADDRESS );
    console.log ("smart contract address is ",address );

  const totalToShow = finalTotal > 0 ? finalTotal - 1 : 0; // Exclude ID 0

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">🎟️ Events</h1>

          {/* Wallet Status */}
          {isConnected ? (
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600">
                Connected: <strong>{address?.slice(0, 6)}...{address?.slice(-4)}</strong>{' '}
                on <strong>{chain?.name || 'Unknown Chain'}</strong>
              </p>
              {chain?.id !== avalancheFuji.id && (
                <button
                  onClick={() => switchChain({ chainId: avalancheFuji.id })}
                  className="mt-2 text-sm bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-1 rounded-full"
                >
                  🔁 Switch to Avalanche Fuji
                </button>
              )}
            </div>
          ) : (
            <div className="text-center mb-6">
              <p className="text-gray-500">Connect wallet to view events</p>
            </div>
          )}

          {/* Loading */}
          {(isTotalLoading || loading) && (
            <div className="text-center py-10">
              <div className="inline-block animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"></div>
              <p className="mt-4 text-gray-600">Loading events...</p>
            </div>
          )}

          {/* No Events */}
          {!isTotalLoading && !loading && totalToShow === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎫</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">No Events Yet</h2>
              <p className="text-gray-500">Stay tuned for upcoming events.</p>
            </div>
          )}

          {/* Events Grid */}
          {!isTotalLoading && !loading && totalToShow > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: finalTotal }, (_, i) => i)
                .filter(id => id !== 0) // ✅ Skip event ID 0
                .map(id => (
                  <EventCard key={id} eventId={id} />
                ))
              }
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}