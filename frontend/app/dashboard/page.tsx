// app/dashboard/page.tsx
'use client';

import { useAccount, useReadContract } from 'wagmi';
import { contractAbi } from '../../lib/contract';
import QRCodeGenerator from '../../components/QRCodeGenerator';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Dashboard() {
  const { address, isConnected } = useAccount();

  const {
    data: totalEvents,
    isLoading: loadingTotalEvents,
    error: errorTotalEvents,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'totalEvents',
  });

  const {
    data: userDiscount,
    isLoading: loadingDiscount,
    error: errorDiscount,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'getUserDiscount',
  });

  const {
    data: userNFTBalance,
    isLoading: loadingNFTs,
    error: errorNFTs,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'balanceOf',
    args: [address as `0x${string}`],
    query: {
      enabled: !!address,
    },
  });

  if (!isConnected) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-green-200 py-12 px-4 flex items-center justify-center">
          <div className="text-center py-12">
            <p className="text-2xl font-semibold text-gray-700">🔐 Connect Wallet to View Dashboard</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-green-200 py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Page Title */}
          <h1 className="text-3xl font-bold text-center text-gray-800">🎫 Your Dashboard</h1>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <a
              href="/"
              className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition"
            >
              ← Return Home
            </a>
            <a
              href="/events"
              className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
            >
              🎉 Go to All Events
            </a>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <h2 className="text-lg font-semibold text-gray-800">Total Events</h2>
              <p className="text-3xl mt-2 text-green-600">
                {loadingTotalEvents ? '...' : totalEvents?.toString() || '0'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <h2 className="text-lg font-semibold text-gray-800">Your Discount</h2>
              <p className="text-3xl mt-2 text-blue-600">
                {loadingDiscount ? '...' : userDiscount?.toString() || '0'}%
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <h2 className="text-lg font-semibold text-gray-800">Your Tickets</h2>
              <p className="text-3xl mt-2 text-purple-600">
                {loadingNFTs ? '...' : userNFTBalance?.toString() || '0'}
              </p>
            </div>
          </div>

{/* QR Code */}
{address && (
  <div className="flex justify-center">
    <QRCodeGenerator address={address} />
  </div>
)}

          {/* Past Tickets Section */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4" style={{ color: 'orange' }}>
              🎟️ Your NFT Tickets
            </h2>
            <p className="text-gray-600">
              You have collected tickets for{' '}
              <span className="font-semibold text-purple-600">
                {loadingNFTs ? '...' : userNFTBalance?.toString() || '0'}
              </span>{' '}
              event{Number(userNFTBalance) !== 1 ? 's' : ''}.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}