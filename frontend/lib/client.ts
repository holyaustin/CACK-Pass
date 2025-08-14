// lib/client.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { avalancheFuji } from 'wagmi/chains';
import { http } from 'viem';

export const config = getDefaultConfig({
  appName: 'Onchain Social Mixer',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!, // Get from walletconnect.com
  chains: [avalancheFuji],
  ssr: true,
  transports: {
    [avalancheFuji.id]: http(),
  },
});

