import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero3 from "@/components/Hero3";
import Navbar from "@/components/Navbar";
import LiquiditySlides from "@/components/liquiditySlides/LiquiditySlides";
import { indicesHero } from "@/lib/utils";

export default function Indices() {
  return (
    <>
      <Navbar />  
      <Hero3 data={indicesHero} isProduct={true}/>
      <LiquiditySlides />
      <FAQ />
      <Footer />
    </>
  )
}
