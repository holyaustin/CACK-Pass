// components/WalletConnectButton.tsx
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function WalletConnectButton() {
  return (
    <ConnectButton
      accountStatus="avatar"
      chainStatus="icon"
      showBalance={true}
    />
  );
}