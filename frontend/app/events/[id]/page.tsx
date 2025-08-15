'use client';

import { useParams } from 'next/navigation';
import { useAccount, useReadContract, useWriteContract, useSwitchChain } from 'wagmi';
import { contractAbi } from '@/lib/contract';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { avalancheFuji } from 'wagmi/chains';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const GATEWAY_URL = 'https://ipfs.io/ipfs/';
const TREASURY_ADDRESS = '0x2c3b2B2325610a6814f2f822D0bF4DAB8CF16e16';
const PAYMENT_AMOUNT_WEI = 1500000000000000n; // 0.0015 ETH

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  animation_url?: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number | boolean;
  }>;
}

interface ParsedEvent {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string;
  external_url?: string;
  animation_url?: string;
}

function ipfsToHttp(url: string): string {
  if (!url) return '/placeholder-event.jpg';
  return url.startsWith('ipfs://')
    ? `${GATEWAY_URL}${url.slice(7)}`
    : url;
}

export default function EventDetailPage() {
  const { id } = useParams();
  const rawId = Array.isArray(id) ? id[0] : id;
  const eventId = typeof rawId === 'string' ? parseInt(rawId, 10) : NaN;
  const isValidId = !isNaN(eventId) && eventId >= 0;

  const { address, isConnected, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const { writeContract, isPending, isError, error } = useWriteContract();
  const router = useRouter();

  const [eventData, setEventData] = useState<ParsedEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [buttonState, setButtonState] = useState<'idle' | 'minting' | 'success'>('idle');

  const { data: hasMinted } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'hasUserMinted',
    args: isValidId && address ? [BigInt(eventId), address] : [BigInt(0), '0x0000000000000000000000000000000000000000'],
    query: {
      enabled: !!address && isValidId,
    },
  });

  // Fetch metadata
  useEffect(() => {
    if (!isValidId) {
      setLoading(false);
      return;
    }

    const fetchMetadata = async () => {
      try {
        const { readContract } = await import('@wagmi/core');
        const { wagmiConfig } = await import('@/lib/wagmi');

        const result = await readContract(wagmiConfig, {
          address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
          abi: contractAbi,
          functionName: 'events',
          args: [BigInt(eventId)],
          chainId: avalancheFuji.id,
        });

        const baseURI = (result as any)[1];
        if (!baseURI || typeof baseURI !== 'string') {
          throw new Error('Invalid or missing baseURI');
        }

        const metadataUrl = ipfsToHttp(baseURI);
        const { data: metadata } = await axios.get<NFTMetadata>(metadataUrl, { timeout: 15000 });

        const date = metadata.attributes?.find(a => a.trait_type === 'Date')?.value || 'TBA';
        const location = metadata.attributes?.find(a => a.trait_type === 'Location')?.value || 'TBA';

        setEventData({
          id: eventId,
          name: metadata.name,
          description: metadata.description,
          date: String(date),
          location: String(location),
          image: ipfsToHttp(metadata.image),
          external_url: metadata.external_url,
          animation_url: metadata.animation_url ? ipfsToHttp(metadata.animation_url) : '',
        });
      } catch (err: any) {
        console.error('Failed to load metadata:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [eventId, isValidId]);

  // Auto-switch chain
  useEffect(() => {
    if (isConnected && chain?.id !== avalancheFuji.id) {
      switchChain({ chainId: avalancheFuji.id });
    }
  }, [isConnected, chain, switchChain]);

  const handleBuyTicket = () => {
    if (!isConnected) return;
    if (chain?.id !== avalancheFuji.id) {
      switchChain({ chainId: avalancheFuji.id });
      return;
    }
    if (hasMinted || buttonState !== 'idle') return;

    setButtonState('minting');

    writeContract(
      {
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: contractAbi,
        functionName: 'mintEventNFT',
        args: [BigInt(eventId)],
        value: PAYMENT_AMOUNT_WEI,
        chainId: avalancheFuji.id,
      },
      {
        onSuccess: () => {
          setButtonState('success');
          setTimeout(() => {
            router.push('/dashboard');
          }, 1500);
        },
        onError: (err) => {
          console.error('Mint failed:', err);
          setButtonState('idle');
          alert(`Mint failed: ${err.message.includes('user rejected') ? 'Transaction rejected' : 'Check ETH amount or network'}`);
        },
      }
    );
  };

  // Share logic
  const shareText = `Check out "${eventData?.name}" on Onchain Social Mixer!`;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`;

  const handleAddToCalendar = () => {
    const today = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@onchain-social-mixer`,
      `DTSTAMP:${today}T000000Z`,
      `DTSTART:${today}T100000`,
      `DTEND:${today}T180000`,
      `SUMMARY:${eventData?.name}`,
      `DESCRIPTION:${eventData?.description}`,
      `LOCATION:${eventData?.location}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');
    const blob = new Blob([ics], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `event-${eventId}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Loading / Error States
  if (!isValidId) {
    return <ErrorPage message="Invalid Event ID" />;
  }

  if (loading) {
    return <LoadingPage />;
  }

  if (!eventData) {
    return <ErrorPage message="Event Not Found" />;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <a href="/events" className="inline-block mb-6 text-blue-600 hover:underline font-medium">← All Events</a>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="relative h-64 md:h-80">
              <img
                src={eventData.image}
                alt={eventData.name}
                className="w-full h-full object-cover"
                onError={(e) => ((e.target as HTMLImageElement).src = '/placeholder-event.jpg')}
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
                {hasMinted ? '✅ Attending' : '🎟️ Not Minted'}
              </div>
            </div>

            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-3">{eventData.name}</h1>
              <p className="text-gray-600 text-lg mb-6">{eventData.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <strong className="text-gray-700">📅 Date:</strong>
                  <p className="text-gray-600">{eventData.date}</p>
                </div>
                <div>
                  <strong className="text-gray-700">📍 Location:</strong>
                  <p className="text-gray-600">{eventData.location}</p>
                </div>
              </div>

              {/* Mint Button */}
              <div className="text-center mb-6">
                <button
                  onClick={handleBuyTicket}
                  disabled={buttonState !== 'idle' || hasMinted}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:bg-gray-400 text-white text-lg font-bold rounded-lg shadow-lg transition w-full max-w-xs mx-auto"
                >
                  {buttonState === 'idle' && !hasMinted && '🎟️ BUY TICKET'}
                  {buttonState === 'minting' && '🕒 Confirming...'}
                  {buttonState === 'success' && '✅ Success! Redirecting...'}
                  {hasMinted && '✅ Already Minted'}
                </button>
                {!hasMinted && <p className="text-xs text-gray-500 mt-2">0.001 ETH</p>}
              </div>

              {/* Share */}
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-4">📤 Share</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <button onClick={handleAddToCalendar} className="px-4 py-2  hover:bg-green-400 text-white rounded-lg text-sm font-semibold">
                                  <Image
                                    src="/calendar.png"
                                    alt="Event Ticket NFT"
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                  />
                    
                  </button>
                  <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2  hover:bg-green-400 text-white rounded-lg text-sm font-semibold">
                   <Image
                                    src="/twitter.png"
                                    alt="Event Ticket NFT"
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                  />
                  </a>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 hover:bg-green-400 text-white rounded-lg text-sm font-semibold">
                    <Image
                                    src="/whatsapp.png"
                                    alt="Event Ticket NFT"
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                  />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Helper Components
function ErrorPage({ message }: { message: string }) {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">{message}</h2>
          <a href="/events" className="text-blue-600 hover:underline">← Back to Events</a>
        </div>
      </div>
      <Footer />
    </>
  );
}

function LoadingPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block animate-spin w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full"></div>
          <p className="mt-4 text-gray-600">Loading event...</p>
        </div>
      </div>
      <Footer />
    </>
  );
}