import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import {
  AcademicCapIcon,
  ChartBarIcon,
  CubeIcon as PuzzleIcon,
  BoltIcon as LightningBoltIcon,
  GlobeAltIcon,
  DocumentTextIcon,
} from '@heroicons/react/20/solid';

const Features: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const triggerPoint = 200; // Adjust this value based on when you want the animation to trigger

    if (scrollY > triggerPoint) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const features = [
    {
      title: (
        <p className="text-xl font-semibold">
          <span className="text-[#12006C]">User</span> Support
        </p>
      ),
      description: 'Get dedicated support from our team around the clock. Our experts will assist you with any questions or issues you encounter during your copy trading journey.',
      icon: <AcademicCapIcon className="inline-block h-12 text-[#12006C]" />,
    },
    {
      title: (
        <p className="text-xl font-semibold">
          <span className="text-[#12006C]">Smart</span> Organization
        </p>
      ),
      description: 'Effortlessly organize your copy trading strategies and investments. Our intuitive platform allows you to manage and track your portfolios with ease.',
      icon: <ChartBarIcon className="inline-block h-12 text-[#12006C]" />,
    },
    {
      title: (
        <p className="text-xl font-semibold">
          <span className="text-[#12006C]">Adaptable</span> Strategies
        </p>
      ),
      description: 'Enjoy the flexibility to choose and adapt copy trading strategies that suit your financial goals. Tailor your approach and optimize your investment outcomes.',
      icon: <PuzzleIcon className="inline-block h-12 text-[#12006C]" />,
    },
    {
      title: (
        <p className="text-xl font-semibold">
          <span className="text-[#12006C]">Swift</span> Execution
        </p>
      ),
      description: 'Experience lightning-fast execution of your trades. Our platform is designed for speed, ensuring that your copy trading orders are executed promptly.',
      icon: <LightningBoltIcon className="inline-block h-12 text-[#12006C]" />,
    },
    {
      title: (
        <p className="text-xl font-semibold">
          <span className="text-[#12006C]">Quality</span> Investments
        </p>
      ),
      description: 'Invest in high-quality assets and trading strategies. We prioritize quality to provide you with a diverse range of top-performing investment opportunities.',
      icon: <GlobeAltIcon className="inline-block h-12 text-[#12006C]" />,
    },
    {
      title: (
        <p className="text-xl font-semibold">
          <span className="text-[#12006C]">Resource</span> Optimization
        </p>
      ),
      description: 'Maximize your resources with our efficient copy trading tools. We provide the resources you need to make informed decisions and enhance your trading experience.',
      icon: <DocumentTextIcon className="inline-block h-12 text-[#12006C]" />,
    },
  ];
  
  

  return (
    <section>
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto text-center">
          <h2 className="hd-text">
          <span className="text-[#12006C]">Key</span> Features
          </h2>
          <p className="desc text-[#636262] mx-auto">
          Make every step user-centric
          </p>
        </div>
        <div
          className="grid gap-5 sm:grid-cols-2 md:grid-cols-3"
        >
          {features.map((feature, i) => (
            <Transition
              key={i}
              show={isVisible}
              enter="transition-opacity transform duration-1000 ease-in-out"
              enterFrom="opacity-0 translate-y-8"
              enterTo="opacity-100 translate-y-0"
            >
              <div className="grid gap-8 border border-solid border-[#dfdfdf] p-8 md:p-10">
                {feature.icon}
                {feature.title}
                <p className="text-sm text-[#636262]">{feature.description}</p>
              </div>
            </Transition>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;