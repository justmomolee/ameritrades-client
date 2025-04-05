import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero3 from "@/components/Hero3";
import Navbar from "@/components/Navbar";
import LiquiditySlides from "@/components/liquiditySlides/LiquiditySlides";
import { fxHero } from "@/lib/utils";

export default function Forex() {
  return (
    <>
      <Navbar />  
      <Hero3 data={fxHero} isProduct={true}/>
      <LiquiditySlides />
      <FAQ />
      <Footer />
    </>
  )
}
