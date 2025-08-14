// lib/client.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { avalanche } from 'wagmi/chains';
import { http } from 'viem';

export const config = getDefaultConfig({
  appName: 'Onchain Social Mixer',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!, // Get from walletconnect.com
  chains: [avalanche],
  ssr: true,
  transports: {
    [avalanche.id]: http(),
  },
});

