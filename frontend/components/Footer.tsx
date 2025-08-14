// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <Link href="/" className="flex justify-center items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
            <span className="font-bold text-white">OSM</span>
          </div>
          <span className="text-lg font-bold">Onchain Social Mixer</span>
        </Link>
        <p className="text-gray-400 mb-2">
          Web3 Ticketing System © {new Date().getFullYear()}
        </p>
        <p className="text-sm text-gray-500">
          Powered by blockchain. Built for community.
        </p>
      </div>
    </footer>
  );
}