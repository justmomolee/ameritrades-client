import { Link } from "react-router-dom";
import copyTradeImg from "../assets/copy-trade3.png"
import phoneBg from "../assets/phoneBg.png"
import ChartSlide from "./ChartSlide";

export default function Hero2 () {
  return (
    <section className="relative bg-no-repeat bg-center" id="heroSection">
      <div className="max-ctn px-5 pt-32 flex flex-wrap items-center gap-7 sm:gap-20">
        <div className="w-full max-w-lg">
          <h2 className="text-white text-[5rem] max-md:text-[2.8rem] font-bold mb-6">
          Copy <span className="text-blue-600">Trade</span>
          </h2>
          <p className="text-[#636262] my-5 text-lg">
          Choose the trader you'd like to Autocopy, deposit the amount of funds you'd like to allocate on the platform and Autocopy starts when approved.
          </p>
          <p className="text-[#636262] my-5 text-lg">
          You just started copying the Lead Trader's positions automatically and in real time!
          </p>
          <Link to="/login" className="primaryBtn mb-6" >
            Get Started <span className="ml-3">&rarr;</span>
          </Link>
        </div>

        <div className="w-full max-w-md bg-cover bg-no-repeat bg-center"  style={{ backgroundImage: `url(${phoneBg})` }}>
          <img src={copyTradeImg} alt="copy trade" className="h-full w-auto"/>
        </div>
      </div>

      <ChartSlide />
    </section>
  );
};