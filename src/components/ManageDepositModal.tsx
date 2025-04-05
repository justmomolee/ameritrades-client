import { useState } from "react";
import s from "../pages/login/Login.module.css"
import { GrClose } from "react-icons/gr";
import EditTransaction from "./EditTransaction";

export default function ManageDepositModal({toggleModal, deposit}: {toggleModal: (e:boolean) => void, deposit: null|ITransaction}) {
  const [error, setError] = useState<null|string>(null)
  const [successLoading, setSuccessLoading] = useState(false)
  const [failedLoading, setFailedLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [edit, setEdit] = useState(false)
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  
  const ToggleModal = (e:boolean) => {
    setEdit(e)
  }

  const convertDate = (date: string) => {
    return new Date(date).toLocaleString();
  }


  const startUpdate = async (status: string) => {
    setError(null)
    setSuccess(false)

    if(status === 'success') setSuccessLoading(true)
    else setFailedLoading(true)

    try {
      const res = await fetch(`${url}/deposits/${deposit?._id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ status, email: deposit?.user.email, amount: deposit?.amount })
      })

      const data = await res.json()

      if(res.ok) setSuccess(data.message) 
      else throw new Error(data.message)
    } catch (error: any) {
      setError(error.message)
      console.log(error.message)
    } finally{
      setSuccessLoading(false)
      setFailedLoading(false)
    }
  }


  const refetch = (e:boolean) => {
    toggleModal(e)
  }


  return (deposit &&
    <div className="w-screen h-screen fixed left-0 top-0 z-9999 flex items-center justify-center backdrop-blur px-2">
      {!edit &&
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6">
          <div className="flex items-center justify-between mb-10 pb-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-base font-medium text-gray-900 dark:text-white">
              Deposit Via {deposit.walletData.coinName}
            </h3>
            <button onClick={() => toggleModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <GrClose />
                <span className="sr-only">Close modal</span>
            </button>
          </div>


          <div className="flex justify-between">
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               Date
            </p>
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
               {convertDate(deposit.date)}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               Name
            </p>
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {deposit.user.name}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               Method
            </p>
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {deposit.walletData.coinName}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               Amount
            </p>
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {deposit.amount} usd
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
               In {deposit.walletData.coinName}
            </p>
            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
              {deposit.walletData.convertedAmount}
            </p>
         </div>

          <div className="flex justify-between">
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">
              Status
            </p>
            <p className={`text-sm font-medium ${deposit.status} truncate`}>
              {deposit.status}
            </p>
         </div>

          {deposit.status === "pending" && 
          <div className="flex gap-5 max-xsm:gap-2">
            <a href="#" onClick={() => startUpdate("success")} className="w-full text-white bg-[#2a8f47] hover:bg-[#3cd266] font-medium rounded-lg text-sm px-5 py-2.5 text-center">{successLoading ? "Loading...": "Approve"}</a>

            <a href="#" onClick={() => setEdit(true)} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Edit</a>

            <a href="#" onClick={() => startUpdate("failed")} className="w-full text-white bg-red-600 hover:bg-red-700 focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">{failedLoading ? "Loading...": "Reject"}</a>
          </div>
          }
          {error && <p className={s.formError}>{error}</p>}
          {success && <p className={s.formSuccess}>{success}</p>}
        </form>
      </div>
      }

      {edit && <EditTransaction amountInUSD={deposit.amount} 
      amountInCRYPTO={deposit.walletData.convertedAmount} 
      coinName={deposit.walletData.coinName} id={deposit._id}
      ToggleModal={ToggleModal} refetch={refetch}/>}
    </div> 
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
  _id: string;
  type: string;
  user: User;
  status: 'pending' | 'success' | 'failed';
  amount: number;
  date: string; 
  walletData: WalletData;
  tradeData: TradeData;
}
