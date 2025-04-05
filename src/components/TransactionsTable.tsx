import { contextData } from "@/context/AuthContext";
import { useEffect, useState } from "react";


export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<any>(null);
  const { user } = contextData();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchUserTransactions = async () => {
    try {
      const res = await fetch(`${url}/transactions/user/${user.email}`);
      const data = await res.json();

      if (res.ok) setTransactions(data);
      else throw new Error(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserTransactions();
  }, []);



  return (transactions ?
    <div className="relative overflow-x-auto rounded-[6px]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700">
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3 rounded-s-lg">
                        Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Date
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-e-lg">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3 rounded-e-lg">
                        Amount
                    </th>
                </tr>
            </thead>

            <tbody>
              {transactions.map((transaction:ITransaction, i:number) =>
                <tr className="bg-white dark:bg-gray-800" key={i}>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {transaction.type}
                  </th>
                  <td className="px-6 py-4 max-sm:text-[10px] min-w-28">
                      {transaction.date.slice(0, 10)}
                  </td>
                  <td className={`px-6 py-4 max-sm:text-[12px] ${transaction.status} font-medium`}>
                      {transaction.status}
                  </td>
                  <td className="px-6 py-4">
                      <span className="amount pr-[1px]">$</span>{transaction.amount}
                  </td>
                </tr>
              )}
            </tbody>

        </table>
    </div>:
    <p className="text-base font-semibold text-gray-900 dark:text-[#c7ffb3]">No transaction yet</p>
  )
}






interface User {
  id?: string; 
  email?: string;
  name?: string;
}

interface WalletData {
  address?: string;
  network?: string;
  coinName?: string;
  convertedAmount?: number;
}

interface TradeData {
  package?: string;
  interest?: string;
}

interface ITransaction {
  type: string;
  user: User;
  status: 'pending' | 'success' | 'failed';
  amount: number;
  date: string; 
  walletData: WalletData;
  tradeData: TradeData;
}
