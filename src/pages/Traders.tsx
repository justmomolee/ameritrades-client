import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero3 from "@/components/Hero3";
import Navbar from "@/components/Navbar";
import LiquiditySlides from "@/components/liquiditySlides/LiquiditySlides";
import { tradersHero } from "@/lib/utils";

export default function Traders() {
  return (
    <>
      <Navbar />  
      <Hero3 data={tradersHero} isProduct={false}/>
      <LiquiditySlides />
      <FAQ />
      <Footer />
    </>
  )
}
