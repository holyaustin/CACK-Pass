// components/Header.tsx
import Link from 'next/link';
import WalletConnectButton from './WalletConnectButton';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="relative z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition">
          <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                    <Image
                      src="/logoosm.png"
                      alt="Onchain Social Mixer"
                      width={1000}
                      height={500}
                      className="rounded-xl shadow-2xl mx-auto border-4 border-orange-400"
                    />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 font-bold text-orange-400">Onchain Social Mixer</h1>
            <p className="text-sm text-green-600 font-bold">Web3 Ticketing System</p>
          </div>
        </Link>
        <div className="flex-shrink-0">
          <WalletConnectButton />
        </div>
      </div>
    </header>
  );
}