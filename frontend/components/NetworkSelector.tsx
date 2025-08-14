// components/NetworkSelector.tsx
'use client';
import { useSwitchChain } from 'wagmi';
import { avalanche } from 'wagmi/chains';

export default function NetworkSelector() {
  const { switchChain } = useSwitchChain();

  return (
    <div className="flex justify-center space-x-6">
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

      {/* Sui */}
      <button
        className="flex flex-col items-center space-y-2 opacity-70 cursor-not-allowed"
        disabled
      >
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
          <img src="/sui.png" alt="Sui" className="w-10 h-10" />
        </div>
        <span className="text-white font-semibold text-sm">Sui</span>
      </button>
    </div>
  );
}