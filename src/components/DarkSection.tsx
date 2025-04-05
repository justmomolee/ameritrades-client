import React from 'react';
import phone from '../assets/hand-with-phone.png'

const DarkSection: React.FC = () => {
  return (
  <section>
    <div className="max-ctn py-10 sm:px-6 sm:py-32 lg:px-8">
      <div className="bg-black px-6 py-16 shadow-xl sm:rounded-3xl sm:px-16 md:py-24 lg:flex sm:gap-y-14 lg:py-[100px] justify-evenly items-center">
        <div className="w-full max-w-lg">
          <h2 className="hd-text max-md:!text-2xl  text-gray-100 mb-5">Wide Variety Of Instruments</h2>
          <p className="desc text-gray-400 mb-4 md:mb-10 lg:mb-12 max-md:!text-base">
          Whether you CopyTrade or Trade manually, we support the trading of Currency Pairs, Stocks, Indices, Metals, and Crypto. If you are an advanced investor and prefer manual trading, you are always able to customize your settings or trade with a variety of advanced tools.
          </p>
          <button className="primaryBtn">Explore Copy Trading</button>
        </div>

        <div className="w-full max-w-100">
          <img className='w-full' src={phone} alt='trade'/>
        </div>
      </div>
    </div>
  </section>
  );
};

export default DarkSection;
