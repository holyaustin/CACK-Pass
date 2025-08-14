// app/admin/create-event/page.tsx
'use client';

import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { contractAbi } from '../../../lib/contract';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function CreateEventPage() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const [eventName, setEventName] = useState('');
  const [baseURI, setBaseURI] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!eventName.trim()) {
      setError('Event name is required');
      return;
    }

    if (!baseURI.trim()) {
      setError('Base URI is required');
      return;
    }

    if (!baseURI.startsWith('ipfs://')) {
      setError('Base URI must start with ipfs://');
      return;
    }

    setCreating(true);

    writeContract(
      {
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: contractAbi,
        functionName: 'createEvent',
        args: [eventName.trim(), baseURI.trim()],
      },
      {
        onSuccess: () => {
          setSuccess(`🎉 Successfully created event: "${eventName}"`);
          setEventName('');
          setBaseURI('');
        },
        onError: (err) => {
          console.error('Create event failed:', err);
          // Check if it's a permission error
          const message = err.message?.toLowerCase();
          if (message.includes('admin') || message.includes('owner') || message.includes('permission')) {
            setError('❌ Only the admin can create events. Transaction rejected.');
          } else {
            setError(`❌ Failed: ${err.message || 'Transaction rejected'}`);
          }
        },
      }
    );

    setCreating(false);
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">➕ Create New Event</h1>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
            {/* Event Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Name
              </label>
              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g., ETH Enugu Hackathon 2025"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Base URI */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Base URI
              </label>
              <input
                type="text"
                value={baseURI}
                onChange={(e) => setBaseURI(e.target.value)}
                placeholder="ipfs://QmXyYourCidHere/"
                className="w-full border border-gray-300 rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Must start with <code>ipfs://</code> and end with <code>/</code>
              </p>
            </div>

            {/* Error */}
            {error && <div className="p-3 bg-red-100 text-red-800 rounded-lg text-sm">{error}</div>}

            {/* Success */}
            {success && (
              <div className="p-3 bg-green-100 text-green-800 rounded-lg text-sm">{success}</div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={creating || !address}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              {creating
                ? '⏳ Creating...'
                : !address
                ? '🔐 Connect Wallet to Create Event'
                : '✅ Create Event'}
            </button>
          </form>

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 p-6 rounded-xl">
            <h3 className="font-bold text-blue-800 mb-3">📌 How It Works</h3>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Enter the event name and IPFS base URI (e.g., <code>ipfs://QmCID/</code>)</li>
              <li>Only the admin can successfully create an event</li>
              <li>Others can submit but will see a permission error</li>
            </ul>
            <p className="text-xs text-gray-600 mt-3">
              🔐 The contract enforces access control — this page is open for UX flexibility.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}