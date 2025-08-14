// components/Hero.tsx
'use client';

import Link from 'next/link';
import { useSwitchChain } from 'wagmi';
import { avalanche } from 'wagmi/chains';

export default function Hero() {
  const { switchChain } = useSwitchChain();

  return (
    <section
      className="relative flex flex-col justify-center items-center text-white text-center px-4 min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          Web3-Powered <br />
          <span className="text-green-500">Event Ticketing</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto">
          Mint NFT tickets, earn discounts, and prove attendance with POAPs — all on-chain.
        </p>
        <Link
          href="/events"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full text-lg transition transform hover:scale-105 shadow-lg mb-16"
        >
          🎟️ Get Ticket
        </Link>

        {/* Powered By Section */}
        <div className="mt-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Powered By</h2>
          <div className="flex justify-center space-x-12">
            {/* Avalanche */}
            <button
              onClick={() => switchChain({ chainId: avalanche.id })}
              className="flex flex-col items-center space-y-2 group"
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                <img src="/avalanche.png" alt="Avalanche" className="w-10 h-10" />
              </div>
              <span className="text-white font-semibold text-sm">Avalanche</span>
            </button>

            {/* Sui (Read-only) */}
            <button
              className="flex flex-col items-center space-y-2 opacity-60 cursor-not-allowed"
              disabled
            >
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow">
                <img src="/sui.png" alt="Sui" className="w-10 h-10" />
              </div>
              <span className="text-white font-semibold text-sm">Sui</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}