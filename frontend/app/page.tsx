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
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/bg.png')" }}>
      <Header />
      <main className="relative z-10 text-white">
        {/* Hero */}
        <section className="text-center py-20 px-4 backdrop-blur-sm bg-black/40 min-h-screen flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Web3-Powered <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-orange-500">
              Event Ticketing
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-10">
            Mint NFT tickets, earn discounts, and prove attendance with POAPs — all on-chain.
          </p>
          <Link
            href="/events"
            className="inline-block bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg transition transform hover:scale-105"
          >
            🎟️ Get Ticket
          </Link>
        </section>

        {/* Powered By */}
        <section className="py-12 bg-black/50 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Powered By</h2>
          </div>
          <NetworkSelector />
        </section>

        {/* Trending Events */}
        <section className="py-16 px-4 bg-black/40 backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-center mb-10 text-white">🔥 Trending Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {mockEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* Feature Image */}
        <section className="py-16 px-4 text-center bg-black/50 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <Image
              src="/logosent.jpg"
              alt="Onchain Social Mixer"
              width={1000}
              height={500}
              className="rounded-xl shadow-2xl mx-auto border-4 border-orange-400"
            />
            <h3 className="mt-6 text-2xl font-bold text-white">Secure. On-chain. Verified.</h3>
            <p className="text-gray-200 mt-2">
              Every ticket is an NFT. Every attendee gets a POAP. Zero fraud.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}