// app/page.tsx
import Hero from '../components/Hero';
import Header from '../components/Header';
import TrendingEvents from '../components/TrendingEvents';
import FeatureImage from '../components/FeatureImage';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <TrendingEvents />
      <FeatureImage />
      <Footer />
    </>
  );
}