import { useEffect, useState } from "react";
import { PiChartBarHorizontalThin } from "react-icons/pi";

export default function AdminTradeCards() {
  const [transactions, setTransactions] = useState<any>(null)
  const [totalTrades, setTotalTrades] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [pendingTrades, setPendingTrades] = useState(0)
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchTradeTransactions = async () => {
    try {
      const res = await fetch(`${url}/transactions`);
      const data = await res.json();

      if (res.ok) setTransactions(data);
      else throw new Error(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTradeTransactions();
    
    if (transactions) {
      const tradesTransactions = transactions.filter(
        (transaction: any) => transaction.type === "trade" 
      );

      const tradesSum = tradesTransactions
      .filter((transaction: any) => transaction.status === "success")
      .reduce((sum: number, transaction: any) => sum + transaction.amount, 0);
      
      const pendingSum = tradesTransactions
        .filter((transaction: any) => transaction.status === "pending").length


        setTotalTrades(tradesSum)
        setPendingTrades(pendingSum)
        setTotalInterest(tradesSum)
    }
  }, []);




  
  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4 mb-4">
      <div className="flex flex-col gap-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border-l border-l-sky-600">
          <div className="w-full flex flex-row-reverse items-end justify-between">
            <h2 className="text-3xl -mb-2 text-gray-700 dark:text-white">
              {Number(totalTrades).toLocaleString('en-US')}
              <span className="text-xs text-gray-600 pl-[2px]">$</span>
            </h2>
            <PiChartBarHorizontalThin className="text-4xl text-blue-600"/>
          </div>

          <p className="text-xs font-light flex text-gray-400 dark:text-gray-500">
            All Trades
          </p>
      </div>

      <div className="flex flex-col gap-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border-l border-l-warning">
          <div className="w-full flex flex-row-reverse items-end justify-between">
            <h2 className="text-3xl -mb-2 text-gray-700 dark:text-white">
              {Number(pendingTrades).toLocaleString('en-US')}
            </h2>
            <PiChartBarHorizontalThin className="text-4xl text-warning"/>
          </div>

          <p className="text-sm font-light flex text-gray-400 dark:text-gray-500">
            Pending Trades
          </p>
      </div>
      
      <div className="flex flex-col gap-1 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border-l border-l-lime-300">

          <div className="w-full flex flex-row-reverse items-end justify-between">
            <h2 className="text-3xl -mb-2 text-gray-700 dark:text-white">
              {Number(totalInterest).toLocaleString('en-US')}
              <span className="text-xs text-gray-600 pl-[2px]">$</span>
            </h2>
            <PiChartBarHorizontalThin className="text-4xl text-lime-300"/>
          </div>

          <p className="text-sm font-light flex text-gray-400 dark:text-gray-500">
            Total Interest
          </p>
      </div>
    </div>
    )
  }
