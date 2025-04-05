// components/TraderGrid.tsx
import React, { useState } from 'react';
import { Trader } from '@/types/types';
import TraderCard from './TraderCard';

interface TraderGridProps {
  traders: Trader[];
  copiedTraderId: string | null;
  onCopyTrader: (traderId: string) => Promise<boolean>;
}

const TraderGrid: React.FC<TraderGridProps> = ({
  traders,
  copiedTraderId,
  onCopyTrader,
}) => {
  const [loadingTraderId, setLoadingTraderId] = useState<string | null>(null);

  const handleCopyTrader = async (traderId: string) => {
    try {
      setLoadingTraderId(traderId);
      await onCopyTrader(traderId);
    } finally {
      setLoadingTraderId(null);
    }
  };

  return (
    <div>
      <div >
        {traders.map((trader) => (
          <TraderCard
            key={trader._id}
            traders={traders}
            isCopied={trader._id === copiedTraderId}
            onCopy={handleCopyTrader}
            isLoading={trader._id === loadingTraderId}
          />
        ))}
      </div>

      {traders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No traders available at the moment
          </p>
        </div>
      )}
    </div>
  );
};

export default TraderGrid;
