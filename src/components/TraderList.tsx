// components/TraderList.tsx
import { Trader } from '@/types/types';
import React from 'react';

interface TraderListProps {
  traders: Trader[];
  loading: boolean;
  onEdit: (trader: Trader) => void;
  onDelete: (id: string) => void;
}

const TraderList: React.FC<TraderListProps> = ({ traders, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (traders.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
        <p className="text-xl dark:text-white">No traders found. Add your first trader to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">Trader</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">Specialization</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">Performance</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
          {traders.map((trader) => (
            <tr key={trader._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img 
                      className="h-10 w-10 rounded-full object-cover" 
                      src={trader.profileImage || '/default-trader.png'} 
                      alt={trader.name}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900 dark:text-white">{trader.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {trader.experience} years exp.
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-gray-900 dark:text-white">{trader.specialization}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {trader.tradingStyle}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-600 dark:text-gray-300">Monthly:</span>
                    <span className={trader.profitPercentage.monthly >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {trader.profitPercentage.monthly >= 0 ? '+' : ''}
                      {trader.profitPercentage.monthly}%
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-600 dark:text-gray-300">Win Rate:</span>
                    <span className="text-gray-900 dark:text-white">{trader.winRate}%</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${trader.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                    : trader.status === 'paused'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                    : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                  }`}>
                  {trader.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(trader)}
                  className="mr-2 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(trader._id)}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TraderList;