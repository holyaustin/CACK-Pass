// app/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NetworkSelector from '../components/NetworkSelector';
import EventCard from '../components/EventCard';

export default function Home() {
  const mockEvents = [
    { id: 0, name: "ETH Enugu Meetup", date: "2024-12-10", location: "Enugu, Nigeria" },
    { id: 1, name: "Avalanche Hackathon", date: "2024-11-15", location: "Virtual" },
    { id: 2, name: "Web3 DevCon", date: "2025-01-20", location: "Lagos, Nigeria" },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Hero */}
        <section className="text-center py-16 px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-6">
            Web3-Powered <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              Event Ticketing
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Mint NFT tickets, earn discounts, and prove attendance with POAPs — all on-chain.
          </p>
          <Link href="/events" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition">
            Get Ticket
          </Link>
        </section>

        {/* Network Selector */}
        <section className="py-8 bg-gray-100">
          <NetworkSelector />
        </section>

        {/* Trending Events */}
        <section className="py-12 px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Trending Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {mockEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* Hero Image */}
        <section className="py-12 px-4 bg-blue-50">
          <div className="max-w-4xl mx-auto text-center">
            <Image
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Event Tickets"
              width={1000}
              height={500}
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}