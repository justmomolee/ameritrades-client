import Navbar from "@/components/Navbar";
import Hero3 from "@/components/Hero3";
import LightSectionV2 from "@/components/LightSectionV2";
import LiquiditySlides from "@/components/liquiditySlides/LiquiditySlides";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { aboutSec2, companySec1, whyHero } from "@/lib/utils";
import LightSection from "@/components/LightSection";

export default function WhyAmeritrades() {
  return (
    <>
    <Navbar />  
    <Hero3 data={whyHero} isProduct={false}/>
    <LightSectionV2 secData={companySec1}/>
    <LightSection secData={aboutSec2}/>
    <LiquiditySlides />
    <FAQ />
    <Footer />
  </>
  )
}
