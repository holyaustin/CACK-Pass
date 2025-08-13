// components/QRCodeGenerator.tsx
import { QRCodeSVG } from 'qrcode.react'; // ✅ Named import

interface QRCodeGeneratorProps {
  address: string;
}

export default function QRCodeGenerator({ address }: QRCodeGeneratorProps) {
  if (!address) return null;

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg border">
      <h3 className="text-lg font-bold text-gray-800 mb-4">🎟️ Your Ticket QR Code</h3>
      <div className="p-4 bg-white rounded-lg border-2 border-green-600">
        <QRCodeSVG value={address} size={200} level="H" includeMargin={true} />
      </div>
      <p className="mt-4 text-sm font-mono text-gray-600 break-all max-w-xs text-center">
        {address.slice(0, 6)}...{address.slice(-4)}
      </p>
      <p className="mt-2 text-xs text-gray-500">Show this at entry</p>
    </div>
  );
}