import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero3 from "@/components/Hero3";
import Navbar from "@/components/Navbar";
import LiquiditySlides from "@/components/liquiditySlides/LiquiditySlides";
import { cmHero } from "@/lib/utils";

export default function Commodities() {
  return (
    <>
      <Navbar />  
      <Hero3 data={cmHero} isProduct={true}/>
      <LiquiditySlides />
      <FAQ />
      <Footer />
    </>
  )
}
