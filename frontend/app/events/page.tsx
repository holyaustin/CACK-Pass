// app/events/EventsClient.tsx
'use client';

import { useReadContract, useSwitchChain, useAccount } from 'wagmi';
import { contractAbi } from '../../lib/contract';
import EventCard from '../../components/EventCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// ✅ Define Fuji Chain
import { avalancheFuji } from 'wagmi/chains';

export default function EventsClient({ initialTotalEvents }: { initialTotalEvents: number }) {
  const { address, chain, isConnected } = useAccount();

  // 🔁 Switch to Fuji if not already
  const { switchChain } = useSwitchChain();

  const {
    data: totalEvents,
    isLoading,
    isError,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'totalEvents',
    chainId: avalancheFuji.id, // ✅ Read from Fuji
    query: {
      enabled: !!process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, // Only fetch if address is set
    },
  });

  // Use on-chain data if available, fallback to server-provided
  const finalTotal = totalEvents ? Number(totalEvents) : initialTotalEvents;

  // Generate mock event list
  const events = Array.from({ length: finalTotal }, (_, i) => ({
    id: i,
    name: `Event #${i + 1}`,
    date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
    location: 'Enugu, Nigeria',
  }));

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">🎟️ All Events</h1>

          {/* 🔗 Wallet Status */}
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
          {isLoading && (
            <div className="text-center py-10">
              <div className="inline-block animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"></div>
              <p className="mt-4 text-gray-600">Loading events from Avalanche Fuji...</p>
            </div>
          )}

          {/* Error */}
          {isError && (
            <div className="text-center py-10">
              <p className="text-red-600 font-semibold">❌ Failed to load events</p>
              <p className="text-gray-500 mt-2">Check contract address or network.</p>
            </div>
          )}

          {/* No Events */}
          {!isLoading && !isError && finalTotal === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎫</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">No Event Currently</h2>
              <p className="text-gray-500">Stay tuned! New events will be added soon.</p>
            </div>
          )}

          {/* Events Grid */}
          {!isLoading && !isError && finalTotal > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}