// app/dashboard/page.tsx
import { useAccount, useReadContract } from 'wagmi';
import { contractAbi } from '../../lib/contract';

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

  if (!address) return <div>Connect Wallet</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Total NFTs Owned</h2>
          <p className="text-3xl">{userDiscount ? "1+" : "0"}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Discount Eligibility</h2>
          <p className="text-2xl text-green-600">{userDiscount?.toString()}% off</p>
        </div>
      </div>
    </div>
  );
}