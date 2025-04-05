  import ManageWithdrawalModal from "@/components/ManageWithdrawalModal";
import { useEffect, useState } from "react";

export default function RejectedWithdrawals() {
  const [withdrawals, setWithdrawals] = useState<ITransaction[]>([])
  const [singleWithdrawal, setSingleWithdrawal] = useState<null|ITransaction>(null)
  const [toggle, setToggle] = useState(false);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  
  const toggleModal = (e:boolean) => {
    setToggle(e)
  }

  const manageWithdrawal = (e:ITransaction) => {
    setSingleWithdrawal(e)
    toggleModal(true)
  }


  
  const fetchWithdrawals = async () => {
    try {
      const res = await fetch(`${url}/withdrawals`);
      const data = await res.json();

      if (res.ok) setWithdrawals(data.filter((wth:any) => wth.status === "failed"))
      else throw new Error(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, [toggle]);

  
  
    return (
      <div className="relative overflow-x-auto rounded-[6px]">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700">
              <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3 rounded-s-lg">
                          User
                      </th>
                      <th scope="col" className="px-6 py-3 rounded-s-lg">
                          Method
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Date
                      </th>
                      <th scope="col" className="px-6 py-3 rounded-e-lg">
                          Status
                      </th>
                      <th scope="col" className="px-6 py-3 rounded-e-lg">
                          Action
                      </th>
                  </tr>
              </thead>
  
              <tbody>
                {withdrawals.length > 0 && withdrawals.map((withdrawal:ITransaction, i:number) =>
                  <tr className="bg-white dark:bg-gray-800" key={i}>
                    <th scope="row" className="flex items-center px-5 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                        <img className="w-10 h-10 rounded-full bg-[#E2FFD7]/10" src={`https://robohash.org/${withdrawal.user.id}`} alt="Avatar" />
                          <div className="ps-3">
                              <div className="text-xs font-semibold">
                                {withdrawal.user.name.length > 17 && withdrawal.user.name.slice(0, 15) + "..."} 
                                {withdrawal.user.name.length < 17 && withdrawal.user.name}
                              </div>
                              <div className="text-xs font-medium text-gray-500">
                                {withdrawal.user.email.length > 17 && withdrawal.user.email.slice(0, 15) + "..."} 
                                {withdrawal.user.email.length < 17 && withdrawal.user.email} 
                              </div>
                          </div>  
                      </th>

                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="text-xs font-semibold">
                          {withdrawal.walletData.coinName}
                        </div>
                        <div className="text-xs font-medium text-gray-500">
                          {withdrawal.walletData.convertedAmount}
                        </div>
                    </td>
                    <td className="px-6 py-4 max-sm:text-[10px] min-w-28">
                        {withdrawal.date.slice(0, 10)}
                    </td>
                    <td className={`px-6 py-4 max-sm:text-[12px] ${withdrawal.status} font-medium`}>
                        {withdrawal.status}
                    </td>
                    <td className="px-5 py-3">
                        <button onClick={() => manageWithdrawal(withdrawal)} className="font-medium text-blue-600 dark:text-blue-500">View</button>
                    </td>
                  </tr>
                )}
              </tbody>
          </table>

          {toggle && <ManageWithdrawalModal toggleModal={toggleModal} withdrawal={singleWithdrawal} />}
      </div>
  )
}







interface User {
  id: string; 
  email: string;
  name: string;
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
  _id: string;
  type: string;
  user: User;
  status: 'pending' | 'success' | 'failed';
  amount: number;
  date: string; 
  walletData: WalletData;
  tradeData: TradeData;
}

