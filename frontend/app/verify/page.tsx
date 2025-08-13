// app/verify/page.tsx
'use client';
import { useReadContract } from 'wagmi';
import { useState } from 'react';

export default function Verify() {
  const [eventId, setEventId] = useState('');
  const [address, setAddress] = useState('');
  const { data: admitted } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'verifyAdmission',
    args: [Number(eventId), address as `0x${string}`],
    query: {
      enabled: !!eventId && !!address,
    },
  });

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Verify Admission</h1>
      <input
        placeholder="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <input
        placeholder="Wallet Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      {admitted !== undefined && (
        <div className={`p-4 rounded ${admitted ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {admitted ? '✅ Admitted' : '❌ Not Admitted'}
        </div>
      )}
    </div>
  );
}