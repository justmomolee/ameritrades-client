// components/TraderGrid.tsx
import React from 'react';
import { Trader } from '@/types/types';
import TraderCard from './TraderCard';

interface TraderGridProps {
  traders: Trader[];
  onCopyTrader: (traderId: string) => Promise<boolean>;
}

const TraderGrid: React.FC<TraderGridProps> = ({ traders, onCopyTrader }) => {
  const handleCopyTrader = async (traderId: string) => {
    try {
      await onCopyTrader(traderId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TraderCard traders={traders} onCopy={handleCopyTrader} />

      {traders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No traders available at the moment
          </p>
        </div>
      )}
    </>
  );
};

export default TraderGrid;
