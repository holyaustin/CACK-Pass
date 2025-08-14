// components/TrendingEvents.tsx
import EventCard from './EventCard';

const mockEvents = [
  { id: 0, name: "ETH Enugu Meetup", date: "2024-12-10", location: "Enugu, Nigeria" },
  { id: 1, name: "Avalanche Hackathon", date: "2024-11-15", location: "Virtual" },
  { id: 2, name: "Web3 DevCon", date: "2025-01-20", location: "Lagos, Nigeria" },
];

export default function TrendingEvents() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">🔥 Trending Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {mockEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}