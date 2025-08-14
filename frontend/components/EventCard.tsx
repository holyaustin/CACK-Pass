// components/EventCard.tsx
import Link from 'next/link';

export default function EventCard({ event }: { event: any }) {
  return (
    <Link href={`/events/${event.id}`}>
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 transform cursor-pointer">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{event.name}</h3>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <span>📅 {event.date}</span>
            <span>📍 {event.location}</span>
          </div>
          <div className="flex space-x-2">
            <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs rounded-full font-semibold">
              NFT Ticket
            </span>
            <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-full font-semibold">
              POAP
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}