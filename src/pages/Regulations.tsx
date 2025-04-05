import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero3 from "@/components/Hero3";
import Navbar from "@/components/Navbar";
import LiquiditySlides from "@/components/liquiditySlides/LiquiditySlides";
import { regHero } from "@/lib/utils";

export default function Regulations() {
  return (
    <>
      <Navbar />  
      <Hero3 data={regHero} isProduct={false}/>
      <LiquiditySlides />
      <FAQ />
      <Footer />
    </>
  )
}
