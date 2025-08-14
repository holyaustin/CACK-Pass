// app/page.tsx
import Hero from '../components/Hero';
import TrendingEvents from '../components/TrendingEvents';
import FeatureImage from '../components/FeatureImage';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <TrendingEvents />
      <FeatureImage />
      <Footer />
    </>
  );
}