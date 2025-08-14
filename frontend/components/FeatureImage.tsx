// components/FeatureImage.tsx
import Image from 'next/image';

export default function FeatureImage() {
  return (
    <section className="py-16 px-4 text-center bg-white">
      <div className="max-w-4xl mx-auto">
        <Image
          src="/logosent.jpg"
          alt="Onchain Social Mixer"
          width={1000}
          height={500}
          className="rounded-xl shadow-2xl mx-auto border-4 border-orange-400"
        />
        <h3 className="mt-6 text-2xl font-bold text-gray-800">Secure. On-chain. Verified.</h3>
        <p className="text-gray-600 mt-2">
          Every ticket is an NFT. Every attendee gets a POAP. Zero fraud.
        </p>
      </div>
    </section>
  );
}