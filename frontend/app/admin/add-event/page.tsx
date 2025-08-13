// Only visible to owner
'use client';
import { contractAbi } from '@/lib/contract';
import { useWriteContract } from 'wagmi';
import { useState } from 'react';

export default function AddEvent() {
  const { writeContract } = useWriteContract();
  const [name, setName] = useState('');
  const [uri, setUri] = useState('');

  const handleSubmit = () => {
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: contractAbi,
      functionName: 'createEvent',
      args: [name, uri],
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Event</h1>
      <input
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <input
        placeholder="Base URI"
        value={uri}
        onChange={(e) => setUri(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-6 py-2 rounded">
        Create Event
      </button>
    </div>
  );
}