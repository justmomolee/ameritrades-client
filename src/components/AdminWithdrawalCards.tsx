import { useEffect, useState } from "react"
import { CiSaveUp2 } from "react-icons/ci";

export default function AdminWithdrawalCards() {
  const [transactions, setTransactions] = useState<any>(null);
  const [totalWithdrawal, setTotalWithdrawal] = useState(0)
  const [pendingWithdrawals, setPendingWithdrawals] = useState(0)
  const [rejectedWithdrawal, setRejectedWithdrawals] = useState(0)
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchUserTransactions = async () => {
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
    fetchUserTransactions();
    
    if (transactions) {
      const withdrawalsTransactions = transactions.filter(
        (transaction: any) => transaction.status === "withdrawal" 
      );

      const withdrawalSum = withdrawalsTransactions
      .filter((transaction: any) => transaction.status === "success")
      .reduce((sum: number, transaction: any) => sum + transaction.amount, 0);
      
      const pendingSum = withdrawalsTransactions
        .filter((transaction: any) => transaction.status === "pending").length

      const failedSum = withdrawalsTransactions
        .filter((transaction: any) => transaction.status === "failed").length

      setTotalWithdrawal(withdrawalSum);
      setPendingWithdrawals(pendingSum);
      setRejectedWithdrawals(failedSum);
    }
  }, []);



  
  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4 mb-4">
      <div className="flex flex-col gap-3 px-4 py-2 rounded-lg border  border-gray-900 dark:border-gray-700">
        <div className="w-full flex items-end justify-between">
          <h2 className="text-2xl font-lightl text-white dark:text-slate-300">
            {Number(totalWithdrawal).toLocaleString('en-US')}
            <span className="text-xs text-gray-600 pl-[2px]">$</span>
          </h2>
          <CiSaveUp2  className="text-3xl text-lime-300"/>
        </div>

        <p className="text-xs font-light text-gray-400 dark:text-gray-500">
          Total Withdrawal
        </p>
      </div>

      <div className="flex flex-col gap-3 px-4 py-2 rounded-lg border  border-gray-900 dark:border-gray-700">
        <div className="w-full flex items-end justify-between">
          <h2 className="text-2xl font-lightl text-white dark:text-slate-300">
            {Number(pendingWithdrawals).toLocaleString('en-US')}
          </h2>
          <CiSaveUp2  className="text-3xl text-warning"/>
        </div>

        <p className="text-xs font-light text-gray-400 dark:text-gray-500">
          Pending Withdrawals
        </p>
      </div>
      
      <div className="flex flex-col gap-3 px-4 py-2 rounded-lg border  border-gray-900 dark:border-gray-700">
        <div className="w-full flex items-end justify-between">
          <h2 className="text-2xl font-lightl text-white dark:text-slate-300">
            {Number(rejectedWithdrawal).toLocaleString('en-US')}
          </h2>
          <CiSaveUp2  className="text-3xl text-rose-500"/>
        </div>

        <p className="text-xs font-light text-gray-400 dark:text-gray-500">
          Rejected Withdrawals
        </p>
    </div>
    </div>
  )
}
