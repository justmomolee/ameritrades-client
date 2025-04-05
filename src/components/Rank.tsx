import { contextData } from '@/context/AuthContext';
import React, { useEffect, useRef, useState } from 'react';

interface RankProps {
  rank: string;
  imageSrc: string;
  moreInfo: {[key: string]: number}
}

const Rank: React.FC<RankProps> = ({ rank, imageSrc, moreInfo }) => {
  const { user } = contextData()
  const [tooltip, setTooltip] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setTooltip(false);
      }
    };

    if (tooltip) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [tooltip]);


  return (
    <div className="relative" onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}>
      <div className="w-30 h-30 p-7 bg-gray-300/20 rounded-[50px] overflow-hidden transition-transform transform-gpu hover:scale-105">
        <img src={imageSrc}  alt={rank} className={`w-full h-full object-cover grayscale hover:grayscale-0 ${user.rank === rank? 'grayscale-0': ''}`}/>
      </div>
      <h3 className="w-fit m-auto mt-2 text-gray-800 font-normal capitalize text-base font-satoshi dark:text-gray-100">
        {rank}
      </h3>

      <div ref={tooltipRef} onClick={() => setTooltip(true)} className={`${tooltip ? "opacity-1 visible" : "invisible opacity-0"}  absolute -left-16 top-[120px] z-10 inline-block w-64 text-sm text-white transition-opacity duration-300 bg-gray-600 border border-gray-600 rounded-lg shadow-sm  dark:text-gray-500 dark:border-gray-200 dark:bg-white`}>
        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">{rank}</h3>
        </div>
        <div className="px-3 py-2 flex flex-col gap-1">
          <p className="flex gap-3">
            <span className="font-bold">Level:</span>
            <span>{moreInfo.level}</span>
          </p>
          <p className="flex gap-3">
            <span className="font-bold">Minimum Deposit:</span>
            <span className='amount'>${moreInfo.minimumDeposit.toLocaleString('en-US')}</span>
          </p>
          <p className="flex gap-3">
            <span className="font-bold">Direct Referral:</span>
            <span>{moreInfo.directReferral}</span>
          </p>
          <p className="flex gap-3">
            <span className="font-bold">Referral Deposits:</span>
            <span className='amount'>${moreInfo.referralDeposits.toLocaleString('en-US')}</span>
          </p>
          <p className="flex gap-3">
            <span className="font-bold">Bonus:</span>
            <span className='amount'>${moreInfo.bonus.toLocaleString('en-US')}</span>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Rank;
