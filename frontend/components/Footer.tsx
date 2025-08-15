// components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <Link href="/" className="flex justify-center items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
            <Image
              src="/logoosm.png"
              alt="Onchain Social Mixer"
              width={1000}
              height={500}
              className="rounded-xl shadow-2xl mx-auto border-4 border-orange-400"
            />
          </div>
          <span className="text-lg font-bold">Onchain Social Mixer</span>
        </Link>

        {/* Dashboard & Events Links */}
        <div className="flex justify-center space-x-6 text-sm mb-4">
          <Link href="/dashboard" className="text-white hover:text-green-400 transition">
            🎟️ My Dashboard
          </Link>
          <Link href="/events" className="text-white hover:text-green-400 transition">
            📅 All Events
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 mb-2">
          Web3 Ticketing System © {new Date().getFullYear()}
        </p>
        <p className="text-sm text-gray-500">
          Powered by Avalanche. Built for community.
        </p>
      </div>
    </footer>
  );
}