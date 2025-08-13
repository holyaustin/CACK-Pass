// components/NetworkSelector.tsx
'use client';
import { useAccount, useSwitchChain } from 'wagmi';
import { avalanche } from 'wagmi/chains';

export default function NetworkSelector() {
  const { switchChain } = useSwitchChain();
  const { chain } = useAccount();

  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={() => switchChain({ chainId: avalanche.id })}
        disabled={chain?.id === avalanche.id}
        className={`px-6 py-2 rounded-full font-semibold transition ${
          chain?.id === avalanche.id
            ? 'bg-red-600 text-white'
            : 'bg-white text-red-600 border border-red-600 hover:bg-red-50'
        }`}
      >
        Avalanche
      </button>
      <button
        disabled
        className="px-6 py-2 rounded-full bg-gray-200 text-gray-500 cursor-not-allowed"
      >
        Sui (Coming Soon)
      </button>
    </div>
  );
}