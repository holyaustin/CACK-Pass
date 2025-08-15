// components/FeatureImage.tsx
import Image from 'next/image';

export default function FeatureImage() {
  return (
    <section className="py-16 px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose Onchain Social Mixer?
        </h2>

        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Image 1: Event Ticket (NFT) */}
          <div className="flex-1 min-w-[250px] text-center">
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl border-4 border-green-400">
              <Image
                src="/logosent.jpg"
                alt="Event Ticket NFT"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">🎟️ Onchain Social Mixer</h3>
            <p className="text-gray-600 mt-1">Your ticket is a unique NFT — verifiable and tradable.</p>
          </div>

          {/* Image 2: POAP */}
          <div className="flex-1 min-w-[250px] text-center">
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl border-4 border-orange-400">
              <Image
                src="/poap1.png"
                alt="Proof of Attendance (POAP)"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">✨ POAP Badge</h3>
            <p className="text-gray-600 mt-1">Earn a collectible badge just for attending.</p>
          </div>

          {/* Image 3: Wallet Ticket */}
          <div className="flex-1 min-w-[250px] text-center">
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-2xl border-4 border-purple-400">
              <Image
                src="/ticket.avif"
                alt="Digital Ticket in Wallet"
                width={400}
                height={400}
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">📱 Wallet-Hosted</h3>
            <p className="text-gray-600 mt-1">Your ticket lives in your wallet — no printing needed.</p>
          </div>
        </div>
      </div>
    </section>
  );
}