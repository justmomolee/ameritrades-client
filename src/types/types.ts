// types/Trader.ts
export interface Trader {
  _id: string;
  name: string;
  profileImage?: string;
  bio: string;
  specialization: 'Forex' | 'Crypto' | 'Stocks' | 'Commodities' | 'Options' | 'Mixed';
  experience: number;
  profitPercentage: {
    monthly: number;
    yearly: number;
  };
  riskLevel: 'Low' | 'Medium' | 'High';
  tradingStyle: 'Day Trading' | 'Swing Trading' | 'Position Trading' | 'Scalping';
  winRate: number;
  totalCopiers: number;
  averageHoldingTime: string;
  minimumCopyAmount: number;
  copierFee: number;
  status: 'active' | 'paused' | 'terminated';
  tradingStreak?: number;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}