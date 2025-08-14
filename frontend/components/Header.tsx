// components/Header.tsx
import Link from 'next/link';
import WalletConnectButton from './WalletConnectButton';

export default function Header() {
  return (
    <header className="relative z-50 bg-black/70 backdrop-blur-md text-white shadow-lg border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo & Title */}
        <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-orange-500 flex items-center justify-center shadow-lg">
            <span className="font-bold text-white text-lg">OSM</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">Onchain Social Mixer</h1>
            <p className="text-xs text-green-300">Web3 Ticketing System</p>
          </div>
        </Link>

        {/* Wallet Button */}
        <div className="flex-shrink-0">
          <WalletConnectButton />
        </div>
      </div>
    </header>
  );
}