import { useEffect, useState } from 'react';

const AutoCount = () => {
  const [startCount, setStartCount] = useState(false);
  const [totalClients, setTotalClients] = useState(0);
  const [regulated, setRegulated] = useState(0);
  const [offices, setOffices] = useState(0);
  const [instruments, setInstruments] = useState(0);

  const handleScroll = () => {
    const element = document.getElementById('counterSection');
    if (
      element &&
      window.scrollY > element.offsetTop - window.innerHeight / 2 &&
      window.scrollY < element.offsetTop + element.offsetHeight
    ) {
      setStartCount(true);
      window.removeEventListener('scroll', handleScroll);
    } else {
      setStartCount(false);
      setRegulated(0);
    }
  };

  const startCountAnimation = () => {
    let counter = 0;
    const intervalId = setInterval(() => {
      counter += 5000;
      setTotalClients(counter > 1500000 ? 1500000 : counter);
      if (counter >= 1500000) clearInterval(intervalId);
    }, 100);

    let counter2 = 0;
    const intervalId2 = setInterval(() => {
      counter2 += 1;
      setRegulated(counter2 > 14 ? 14 : counter2);
      if (counter2 >= 14) clearInterval(intervalId2);
    }, 500);

    let counter3 = 0;
    const intervalId3 = setInterval(() => {
      counter3 += 1;
      setOffices(counter3 > 30 ? 30 : counter3);
      if (counter3 >= 30) clearInterval(intervalId3);
    }, 500);

    let counter4 = 0;
    const intervalId4 = setInterval(() => {
      counter4 += 100;
      setInstruments(counter4 > 25000 ? 25000 : counter4);
      if (counter4 >= 25000) clearInterval(intervalId4);
    }, 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (startCount) startCountAnimation();
  }, [startCount]);

  return (
    <section id='counterSection' className='flex flex-wrap items-center justify-center gap-20 py-20 sm:px-6 sm:py-24 lg:px-8 bg-gray-50'>
      <div className="flex flex-col items-center w-full max-w-[200px]">
        <p className="text-sm mb-5 text-gray-500">Ameritrades Clients</p>
        <h2 className="hd-text text-gray-800 font-[4rem]">
          {totalClients}
          <span className='text-3xl mb-6 text-gray-500'>+</span>
        </h2>
      </div>
      <div className="flex flex-col items-center w-full max-w-[200px]">
        <p className="text-base mb-5 text-gray-500">Most Regulated</p>
        <h2 className="hd-text text-gray-800 font-[4rem]">
          {regulated}
          <span className='text-3xl mb-6 text-gray-500'>+</span>
        </h2>
      </div>
      <div className="flex flex-col items-center w-full max-w-[200px]">
        <p className="text-base mb-5 text-gray-500">Offices & Branches</p>
        <h2 className="hd-text text-gray-800 font-[4rem]">
          {offices}
          <span className='text-3xl mb-6 text-gray-500'>+</span>
        </h2>
      </div>
      <div className="flex flex-col items-center w-full max-w-[200px]">
        <p className="text-base mb-5 text-gray-500">Trading Instruments</p>
        <h2 className="hd-text text-gray-800 font-[4rem]">
          {instruments}
          <span className='text-3xl mb-6 text-gray-500'>+</span>
        </h2>
      </div>
    </section>
  );
};

export default AutoCount;
