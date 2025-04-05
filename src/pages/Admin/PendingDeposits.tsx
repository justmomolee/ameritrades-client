import ManageDepositModal from "@/components/ManageDepositModal";
import { useEffect, useState } from "react";

export default function PendingDeposits() {
  const [deposits, setDeposits] = useState<ITransaction[]>([])
  const [singleDeposit, setSingleDeposit] = useState<null|ITransaction>(null)
  const [toggle, setToggle] = useState(false);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  
  const toggleModal = (e:boolean) => {
    setToggle(e)
  }

  const manageDeposit = (e:ITransaction) => {
    setSingleDeposit(e)
    toggleModal(true)
  }


  
  const fetchDeposits = async () => {
    try {
      const res = await fetch(`${url}/deposits`);
      const data = await res.json();

      if (res.ok) setDeposits(data.filter((dep:any) => dep.status === "pending"))
      else throw new Error(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDeposits();
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

                {deposits.length > 0 && deposits.map((deposit:ITransaction, i:number) =>
                  <tr className="bg-white dark:bg-gray-800" key={i}>
                    <th scope="row" className="flex items-center px-5 py-3 text-gray-900 whitespace-nowrap dark:text-white">
                        <img className="w-10 h-10 rounded-full bg-[#E2FFD7]/10" src={`https://robohash.org/${deposit.user.id}`} alt="Avatar" />
                          <div className="ps-3">
                              <div className="text-xs font-semibold">
                                {deposit.user.name.length > 17 && deposit.user.name.slice(0, 15) + "..."} 
                                {deposit.user.name.length < 17 && deposit.user.name}
                              </div>
                              <div className="text-xs font-medium text-gray-500">
                                {deposit.user.email.length > 17 && deposit.user.email.slice(0, 15) + "..."} 
                                {deposit.user.email.length < 17 && deposit.user.email} 
                              </div>
                          </div>  
                      </th>

                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="text-xs font-semibold">
                          {deposit.walletData.coinName}
                        </div>
                        <div className="text-xs font-medium text-gray-500">
                          {deposit.walletData.convertedAmount}
                        </div>
                    </td>
                    <td className="px-6 py-4 max-sm:text-[10px] min-w-28">
                        {deposit.date.slice(0, 10)}
                    </td>
                    <td className={`px-6 py-4 max-sm:text-[12px] ${deposit.status} font-medium`}>
                        {deposit.status}
                    </td>
                    <td className="px-5 py-3">
                        <button onClick={() => manageDeposit(deposit)} className="font-medium text-blue-600 dark:text-blue-500">Manage</button>
                    </td>
                  </tr>
                )}
              </tbody>
          </table>

          {toggle && <ManageDepositModal toggleModal={toggleModal} deposit={singleDeposit} />}
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
