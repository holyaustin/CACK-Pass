// app/verify/page.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useReadContract } from 'wagmi';
import { contractAbi } from '../../lib/contract';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VerifyPage() {
  const [scanning, setScanning] = useState(false);
  const [eventId, setEventId] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [verified, setVerified] = useState<boolean | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<any>(null);
  const isClient = typeof window !== 'undefined';

  const { data: admitted } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'verifyAdmission',
    args: eventId && result ? [BigInt(eventId), result as `0x${string}`] : undefined,
    query: {
      enabled: !!eventId && !!result && /^0x[a-fA-F0-9]{40}$/.test(result),
    },
  });

  // 🔥 Load ZXing only on client, after mount
  useEffect(() => {
    if (!isClient) return;

    const loadZxing = async () => {
      try {
        const { BrowserMultiFormatReader } = await import('@zxing/library');
        codeReader.current = new BrowserMultiFormatReader();
        toast.info('📷 Scanner ready!', { autoClose: 1000 });
      } catch (err) {
        console.error('ZXing failed to load:', err);
        toast.error('❌ Scanner unavailable');
      }
    };

    loadZxing();
  }, [isClient]);

  useEffect(() => {
    if (admitted === true) {
      setVerified(true);
      toast.success('✅ Access Granted!', { theme: 'colored' });
    } else if (admitted === false) {
      setVerified(false);
      toast.error('❌ No valid ticket or POAP.', { theme: 'colored' });
    }
  }, [admitted]);

  const startScanner = () => {
    if (!eventId) {
      toast.warn('⚠️ Enter Event ID first!');
      return;
    }

    if (!codeReader.current) {
      toast.error('❌ Scanner not ready. Try again.');
      return;
    }

    setScanning(true);
    setResult(null);
    setVerified(null);

    codeReader.current
      .decodeFromVideoDevice(
        null,
        videoRef.current!,
        (result: any) => {
          if (result) {
            const address = result.getText();
            if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
              setResult(address);
              toast.info(`📱 Scanned: ${address.slice(0, 6)}...${address.slice(-4)}`, {
                autoClose: 2000,
              });
              stopScanner();
            } else {
              toast.warn('❌ Invalid address in QR');
            }
          }
        }
      )
      .catch((err: Error) => {
        console.error(err);
        toast.error(`❌ ${err.message}`);
        setScanning(false);
      });
  };

  const stopScanner = () => {
    if (codeReader.current) {
      codeReader.current.reset();
    }
    setScanning(false);
  };

  const handleManualVerify = () => {
    if (!eventId || !result) {
      toast.warn('⚠️ Enter Event ID and scan QR.');
      return;
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(result)) {
      toast.error('❌ Invalid Ethereum address.');
      return;
    }
    toast.info('🔍 Verifying on-chain...');
  };

  return (
    <div className="min-h-screen bg-body py-8 px-4">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-primary text-white p-6 text-center">
          <h1 className="text-2xl font-bold">🎟️ On-Chain Admission Check</h1>
          <p className="text-white/80">Scan QR to verify ticket or POAP</p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-dark mb-2">🔢 Event ID</label>
            <input
              type="number"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
              placeholder="e.g., 0"
              disabled={scanning}
              className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-dark mb-2">📷 QR Scanner</label>
            {scanning ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  className="w-full h-64 border-2 border-secondary rounded-lg bg-black"
                  style={{ objectFit: 'cover' }}
                  autoPlay
                  playsInline
                ></video>
                <button
                  onClick={stopScanner}
                  className="mt-2 w-full bg-danger text-white py-2 rounded-lg font-semibold"
                >
                  🔴 Stop Scanner
                </button>
              </div>
            ) : (
              <button
                onClick={startScanner}
                disabled={!eventId}
                className={`w-full py-3 rounded-lg font-bold text-white transition
                  ${eventId ? 'bg-secondary hover:bg-orange-600' : 'bg-gray-400 cursor-not-allowed'}
                `}
              >
                🚀 Start QR Scanner
              </button>
            )}
          </div>

          {result && (
            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-600">Scanned Address:</p>
              <p className="font-mono text-sm break-all">{result}</p>
            </div>
          )}

          <button
            onClick={handleManualVerify}
            disabled={!eventId || !result}
            className="w-full bg-primary hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
          >
            ✅ Verify On-Chain
          </button>

          {verified !== null && (
            <div
              className={`p-4 rounded-lg text-center font-semibold
                ${verified ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}
              `}
            >
              {verified ? '✅ User is admitted!' : '❌ No valid ticket or POAP found.'}
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-4 text-center text-sm text-gray-600 border-t">
          🔐 Powered by Onchain Social Mixer
        </div>
      </div>
    </div>
  );
}