// components/WalletConnectButton.tsx
'use client';

import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css'; // ✅ Critical for modal styling

export default function WalletConnectButton() {
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
            style={{ opacity: ready ? 1 : 0 }}
            className="transition-opacity duration-300"
          >
            {!connected ? (
              <button
                onClick={openConnectModal}
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2.5 rounded-full shadow hover:shadow-lg transition-all"
              >
                🔌 Connect Wallet
              </button>
            ) : chain.unsupported ? (
              <button
                onClick={openChainModal}
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full text-sm"
              >
                ❌ Wrong Network
              </button>
            ) : (
              <button
                onClick={openAccountModal}
                type="button"
                className="bg-green-100 hover:bg-green-200 text-green-800 font-medium px-4 py-2 rounded-full text-sm transition border border-green-300"
              >
                {account.displayBalance && `(${account.displayBalance}) `}
                {account.displayName}
              </button>
            )}
          </div>
        );
      }}
    </RainbowConnectButton.Custom>
  );
}