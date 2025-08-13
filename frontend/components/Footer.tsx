// components/Footer.tsx
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <Link href="/" className="flex justify-center items-center space-x-2 mb-4">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8" />
          <span className="text-lg font-bold">Onchain Social Mixer</span>
        </Link>
        <p className="text-gray-400">
          Web3 Ticketing System © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}