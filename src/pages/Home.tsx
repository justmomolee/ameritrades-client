import AutoCount from '@/components/AutoCount';
import BlackSection from '@/components/BlackSection';
import FAQ from '@/components/FAQ';
import Features from '@/components/Features';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HowItWorksSection from '@/components/HowItWorksSection';
import LightSection from '@/components/LightSection';
import LiquiditySlides from '@/components/liquiditySlides/LiquiditySlides';
import Navbar from '@/components/Navbar';
import SpreadSteps from '@/components/SpreadSteps';
import CryptoCarousel from '@/components/cryptoCarousel/CryptoCarousel';
import Pricing from '@/components/pricing/Pricing';
import {
  testimonies,
  HomeSec1,
  HomeSec2,
  HomeSec3,
  HomeSec4,
} from '@/lib/utils';
import LightSectionV2 from '@/components/LightSectionV2';
import Testimonials from '@/components/Testimonials';
import DarkSection from '@/components/DarkSection';
import StockHeatmap from '@/components/StockHeatmap';
import WideCard from '@/components/WideCard';
import CardOne from '@/components/CardOne';
import WhatsAppBtn from '@/components/WhatsAppBtn';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorksSection />
      <CardOne />
      <LightSectionV2 secData={HomeSec4} />
      <AutoCount />
      <Features />
      <LightSectionV2 secData={HomeSec1} />
      <CryptoCarousel />
      <DarkSection />
      <Pricing />
      <StockHeatmap />
      <LightSection secData={HomeSec2} />
      <BlackSection />
      <SpreadSteps />
      <Testimonials data={testimonies} />
      <WideCard />
      <LightSection secData={HomeSec3} />
      <LiquiditySlides />
      <FAQ />
      <Footer />
      <WhatsAppBtn />
    </>
  );
}
