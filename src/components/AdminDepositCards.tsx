import { useEffect, useState } from "react"
import { CiSaveDown2 } from "react-icons/ci";

export default function AdminDepositCards() {
  const [transactions, setTransactions] = useState<any>(null);
  const [totalDeposit, setTotalDeposit] = useState(0)
  const [pendingDeposits, setPendingDeposits] = useState(0)
  const [rejectedDeposit, setRejectedDeposits] = useState(0)
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
      const depositsTransactions = transactions.filter(
        (transaction: any) => transaction.status === "deposit" 
      );

      const depositSum = depositsTransactions
      .filter((transaction: any) => transaction.status === "success")
      .reduce((sum: number, transaction: any) => sum + transaction.amount, 0);
      
      const pendingSum = depositsTransactions
        .filter((transaction: any) => transaction.status === "pending").length

      const failedSum = depositsTransactions
        .filter((transaction: any) => transaction.status === "failed").length

      setTotalDeposit(depositSum);
      setPendingDeposits(pendingSum);
      setRejectedDeposits(failedSum);
    }
  }, []);



  
  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4 mb-4">
      <div className="flex flex-col gap-2 px-4 py-2 rounded-lg border border-gray-900 dark:border-gray-700">
        <p className="text-xs font-light text-gray-400 dark:text-gray-500">
          Total Deposit
        </p>

        <div className="w-full flex items-end justify-between">
          <h2 className="text-2xl font-lightl text-gray-700 dark:text-slate-300">
            {Number(totalDeposit).toLocaleString('en-US')}
            <span className="text-xs font-light text-gray-600">$</span>
          </h2>
          <CiSaveDown2  className="text-3xl text-lime-300"/>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-4 py-2 rounded-lg border border-gray-900 dark:border-gray-700">
        <p className="text-xs font-light text-gray-400 dark:text-gray-500">
          Pending Deposits
        </p>

        <div className="w-full flex items-end justify-between">
          <h2 className="text-2xl font-lightl text-gray-700 dark:text-slate-300">
            {Number(pendingDeposits).toLocaleString('en-US')}
          </h2>
          <CiSaveDown2  className="text-3xl text-warning"/>
        </div>
      </div>
      
      <div className="flex flex-col gap-2 px-4 py-2 rounded-lg border border-gray-900 dark:border-gray-700">
        <p className="text-xs font-light text-gray-400 dark:text-gray-500">
          Rejected Deposits
        </p>

        <div className="w-full flex items-end justify-between">
          <h2 className="text-2xl font-lightl text-gray-700 dark:text-slate-300">
            {Number(rejectedDeposit).toLocaleString('en-US')}
          </h2>
          <CiSaveDown2  className="text-3xl text-rose-500"/>
        </div>
    </div>
    </div>
  )
}
