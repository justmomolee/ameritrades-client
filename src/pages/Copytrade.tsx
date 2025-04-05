import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Hero2 from "@/components/Hero2";
import LightSectionV3 from "@/components/LightSectionV3";
import Navbar from "@/components/Navbar";
import TradeSteps from "@/components/TradeSteps";
import LiquiditySlides from "@/components/liquiditySlides/LiquiditySlides";
import { tradeSteps } from "@/lib/utils";

export default function Copytrade() {
  return (
    <>
    <Navbar />  
    <Hero2 />
    <TradeSteps tradeSteps={tradeSteps}/>
    <LightSectionV3 />
    <LiquiditySlides />
    <FAQ />
    <Footer />
  </>
  )
}
