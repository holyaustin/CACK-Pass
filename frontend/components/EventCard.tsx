// components/EventCard.tsx
import Link from 'next/link';

export default function EventCard({ event }: { event: any }) {
  return (
    <Link href={`/events/${event.id}`}>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800">{event.name}</h3>
          <p className="text-gray-600">{event.date} • {event.location}</p>
          <div className="mt-4">
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              NFT Ticket
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}