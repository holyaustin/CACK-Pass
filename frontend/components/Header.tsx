// components/Header.tsx
import Link from 'next/link';
import WalletConnectButton from './WalletConnectButton';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="Logo" className="h-10 w-10" />
          <div>
            <h1 className="text-xl font-bold">Onchain Social Mixer</h1>
            <p className="text-xs text-gray-500">Web3 Ticketing System</p>
          </div>
        </Link>
        <WalletConnectButton />
      </div>
    </header>
  );
}