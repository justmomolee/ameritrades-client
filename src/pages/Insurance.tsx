import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero3 from "@/components/Hero3";
import Navbar from "@/components/Navbar";
import LiquiditySlides from "@/components/liquiditySlides/LiquiditySlides";
import { insuranceHero } from "@/lib/utils";

export default function Insurance() {
  return (
    <>
      <Navbar />  
      <Hero3 data={insuranceHero} isProduct={false}/>
      <LiquiditySlides />
      <FAQ />
      <Footer />
    </>
  )
}
