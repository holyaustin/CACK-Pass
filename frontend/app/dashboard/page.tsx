// app/dashboard/page.tsx
'use client';

import { useAccount, useReadContract } from 'wagmi';
import { contractAbi } from '../../lib/contract';
import QRCodeGenerator from '../../components/QRCodeGenerator';

export default function Dashboard() {
  const { address } = useAccount();

  const { data: totalEvents } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'totalEvents',
  });

  const { data: userDiscount } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'getUserDiscount',
    account: address,
  });

  if (!address) {
    return <div className="text-center py-12">🔐 Connect Wallet to View Dashboard</div>;
  }

  return (
    <div className="min-h-screen bg-body py-12 px-4">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold text-center text-dark">🎫 Your Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-dark">Total Events</h2>
            <p className="text-3xl mt-2 text-primary">{totalEvents?.toString() || '0'}</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold text-dark">Discount</h2>
            <p className="text-3xl mt-2 text-secondary">{userDiscount?.toString() || '0'}%</p>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex justify-center">
          <QRCodeGenerator address={address} />
        </div>

        {/* Past Tickets (mock) */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">🎟️ Your NFT Tickets</h2>
          <p className="text-gray-600">You have minted tickets for 2 events.</p>
        </div>
      </div>
    </div>
  );
}