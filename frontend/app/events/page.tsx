// app/events/page.tsx
import { useReadContract } from 'wagmi';
import { contractAbi } from '../../lib/contract';
import EventCard from '../../components/EventCard';

export default function EventsPage() {
  const { data: totalEvents } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'totalEvents',
  });

  const events = Array.from({ length: Number(totalEvents) || 3 }, (_, i) => ({
    id: i,
    name: `Event #${i + 1}`,
    date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
    location: 'Enugu, Nigeria',
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">All Events</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}