// components/TraderCard.tsx
import { contextData } from '@/context/AuthContext';
import { Trader } from '@/types/types';
import React, { useState } from 'react';

interface TraderCardProps {
  traders: Trader[];
  onCopy: (traderId: string) => Promise<any>;
}

const TraderCard: React.FC<TraderCardProps> = ({ traders, onCopy }) => {
  const [isSelected, setIsSelected] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = contextData();

  const handleCopy = async (traderId: string) => {
    setIsSelected(traderId);
    try {
      setIsLoading(true);
      await onCopy(traderId);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper functions for styling
  const getProfitColor = (value: number) =>
    value > 0 ? 'text-green-500' : value < 0 ? 'text-red-500' : 'text-gray-500';

  const getTagColor = (type: string, value: string) => {
    if (type === 'risk') {
      return value === 'Low'
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        : value === 'Medium'
          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
          : value === 'High'
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
    if (type === 'status') {
      return value === 'active'
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
        : value === 'paused'
          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
          : value === 'terminated'
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
  };

  return (
    <div className="max-ctn flex overflow-x-auto no-scrollbar">
      {traders.map((trader) => {
        return (
          <div key={trader._id} className="w-100 h-fit px-2 flex-shrink-0">
            <div
              className={`relative rounded-lg shadow-md transition-all duration-200 overflow-hidden h-full
                  ${
                    user.traderId === trader._id
                      ? 'border-2 border-blue-500 dark:border-blue-400 shadow-blue-500/20'
                      : isSelected === trader._id
                        ? 'transform scale-[1.01] shadow-lg'
                        : 'border border-gray-200 dark:border-gray-700'
                  } bg-white dark:bg-gray-800`}
            >
              {/* Status Badge */}
              <div className="absolute top-3 right-2">
                <span
                  className={`px-2 py-0.5 text-xs font-medium rounded-full uppercase ${getTagColor(
                    'status',
                    trader.status,
                  )}`}
                >
                  {trader.status}
                </span>
              </div>

              {/* Trader Header */}
              <div className="p-3 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                    {trader.profileImage ? (
                      <img
                        src={trader.profileImage}
                        alt={trader.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-500 dark:text-gray-400">
                        {trader.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="">
                    <h2 className="text-base font-bold text-gray-900 dark:text-white">
                      {trader.name}
                    </h2>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span
                        className={`px-1.5 py-0.5 text-xs font-medium rounded-full ${getTagColor(
                          'risk',
                          trader.riskLevel,
                        )}`}
                      >
                        Risk: {trader.riskLevel}
                      </span>
                      <span className="px-1.5 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        Specialty: {trader.specialization}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Monthly
                    </span>
                    <span
                      className={`font-bold ${getProfitColor(
                        trader.profitPercentage.monthly,
                      )}`}
                    >
                      {trader.profitPercentage.monthly > 0 ? '+' : ''}
                      {trader.profitPercentage.monthly}%
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Yearly
                    </span>
                    <span
                      className={`font-bold ${getProfitColor(
                        trader.profitPercentage.yearly,
                      )}`}
                    >
                      {trader.profitPercentage.yearly > 0 ? '+' : ''}
                      {trader.profitPercentage.yearly}%
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Win Rate
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {trader.winRate}%
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Experience
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {trader.experience}{' '}
                      {trader.experience === 1 ? 'Yr' : 'Yrs'}
                    </span>
                  </div>
                </div>

                {/* Bio - Shortened */}
                <div className="mt-3">
                  <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                    {trader.bio}
                  </p>
                </div>

                {/* Quick Stats */}
                <div className="mt-3 flex flex-wrap justify-between text-xs">
                  <div className="flex gap-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      Fee:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {trader.copierFee}%
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      Min:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      ${trader.minimumCopyAmount}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <span className="text-gray-500 dark:text-gray-400">
                      Copiers:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {trader.totalCopiers.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Copy Button */}
                <div className="mt-3">
                  <button
                    onClick={() => handleCopy(trader._id)}
                    disabled={
                      (isLoading && trader._id === isSelected) ||
                      trader.status !== 'active'
                    }
                    className={`w-full px-3 py-1.5 rounded-md font-medium text-sm transition-all duration-300 
                      ${
                        user.traderId === trader._id
                          ? 'bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                      }
                      ${
                        trader.status !== 'active' ||
                        (isLoading && trader._id === isSelected)
                          ? 'opacity-60 cursor-not-allowed'
                          : ''
                      }`}
                  >
                    {isLoading && trader._id === isSelected ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-3 w-3 text-current"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Copying
                      </span>
                    ) : user.traderId === trader._id ? (
                      'Copied'
                    ) : (
                      'Copy'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TraderCard;
