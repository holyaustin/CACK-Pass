// app/events/[id]/page.tsx
import { useAccount, useWriteContract } from 'wagmi';
import { contractAbi } from '../../../lib/contract';
import { useEffect, useState } from 'react';

export default function EventDetail({ params }: { params: { id: string } }) {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [event, setEvent] = useState<any>(null);
  const [hasMinted, setHasMinted] = useState(false);

  const eventId = Number(params.id);

  useEffect(() => {
    const fetchEvent = async () => {
      // Simulate fetching from contract
      setEvent({
        name: `ETH Enugu Hackathon ${eventId}`,
        date: "2024-12-10",
        location: "Enugu, Nigeria",
        baseURI: "",
      });
    };
    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    const checkMint = async () => {
      if (!address) return;
      // Simulate `hasUserMinted`
      setHasMinted(false); // Replace with real contract call
    };
    checkMint();
  }, [address, eventId]);

  const handleMint = () => {
    writeContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      abi: contractAbi,
      functionName: 'mintEventNFT',
      args: [eventId],
    });
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">{event.name}</h1>
        <p className="text-xl text-gray-600 mb-6">{event.date} • {event.location}</p>
        <img
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800"
          alt="Event"
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <p className="text-lg mb-8">
          Join us for an epic Web3 hackathon in Enugu! Mint your NFT ticket and earn POAP.
        </p>

        {hasMinted ? (
          <button disabled className="bg-gray-400 text-white font-bold py-3 px-8 rounded-lg">
            Already Minted
          </button>
        ) : (
          <button
            onClick={handleMint}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg"
          >
            Mint Ticket
          </button>
        )}
      </div>
    </div>
  );
}