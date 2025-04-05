import { heroAvatarLinks } from '@/lib/utils';
import phoneBg from '../assets/phoneBg.png';
import ChartSlide from './ChartSlide';
import { Link } from 'react-router-dom';
import phone from '../assets/iphone.png';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-no-repeat bg-center" id="heroSection">
      <div className="max-ctn pad-y px-5 max-md:pt-40 grid grid-cols-1 items-center gap-12 sm:gap-20 md:grid-cols-2">
        <div className="max-w-[720px] lg:max-w-[842px]">
          <h1 className="hd-text max-md:!text-2xl text-white  mb-4 md:mb-10 lg:mb-12">
            Super Fast, Secured, And Leading{' '}
            <span className="text-[#3475F8]"> Copy Trading </span> platform
          </h1>
          <p className="text-[#636262] desc max-md:!text-lg">
            Scale Your Investments with Precision: Follow, Learn, and Earn with
            Our Copy Trading Platform.
          </p>
          <Link to="/login" className="primaryBtn mb-6">
            Get Started <span className="ml-3">&rarr;</span>
          </Link>
          <div className="relative mb-4 flex w-full max-w-xs items-center">
            {heroAvatarLinks.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="avatar"
                className={`relative avatar ${
                  i > 0 ? '-ml-5' : ''
                } [box-shadow:#081f00_0px_6px]`}
                style={{ top: 'auto', left: `0px` }}
              />
            ))}
            <div className="relative left-[-40px] top-auto z-[1] rounded-[30px] bg-gray-900 py-2 pl-12 pr-3 text-center text-white [box-shadow:#345628_0px_6px]">
              <p className="text-[10px] leading-normal font-semibold">
                <span className="font-bold">2000k+ </span>
                <br />
                Clients
              </p>
            </div>
          </div>
        </div>

        <div
          className="bg-cover bg-no-repeat bg-right"
          style={{ backgroundImage: `url(${phoneBg})` }}
        >
          <img className="w-80 m-auto" src={phone} alt="trade" />
        </div>
      </div>
      <ChartSlide />
    </section>
  );
};

export default Hero;
