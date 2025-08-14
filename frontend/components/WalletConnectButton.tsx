// components/WalletConnectButton.tsx
'use client';

import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';

export default function WalletConnectButton() {
  const [mounted, setMounted] = useState(false);

  // Ensure this only runs on client
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <button className="bg-gray-600 text-white px-4 py-2 rounded">Connect</button>;

  return (
    <RainbowConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            style={{ opacity: ready ? 1 : 0, pointerEvents: ready ? 'auto' : 'none' }}
            className="transition-opacity duration-300"
          >
            {!connected ? (
              <button
                onClick={openConnectModal}
                type="button"
                className="bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white font-semibold px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
              >
                🔌 Connect Wallet
              </button>
            ) : chain.unsupported ? (
              <button
                onClick={openChainModal}
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full text-sm animate-pulse"
              >
                ❌ Wrong Network
              </button>
            ) : (
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-3 py-1 hover:bg-white/30 transition">
                <button
                  onClick={openChainModal}
                  type="button"
                  className="text-white text-sm px-3 py-1.5 rounded-full bg-black/20 hover:bg-black/30 font-medium transition flex items-center gap-1"
                >
                  {chain.hasIcon && (
                    <span
                      style={{
                        background: chain.iconBackground,
                        maskImage: `url(${chain.iconUrl})`,
                        WebkitMaskImage: `url(${chain.iconUrl})`,
                        maskSize: 'cover',
                        WebkitMaskSize: 'cover',
                        width: '16px',
                        height: '16px',
                      }}
                      className="bg-current inline-block"
                    />
                  )}
                  {chain.name}
                </button>

                <button
                  onClick={openAccountModal}
                  type="button"
                  className="text-white font-semibold text-sm px-4 py-1.5 rounded-full bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 transition truncate max-w-[120px]"
                >
                  {account.displayBalance && `(${account.displayBalance}) `}
                  {account.displayName}
                </button>
              </div>
            )}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
}