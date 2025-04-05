import { useEffect, useState } from "react"
import s from '../pages/login/Login.module.css'

interface ITransactionData {
  amountInUSD: number, 
  amountInCRYPTO: number | undefined, 
  coinName: string | undefined, 
  ToggleModal: (e:boolean) => void,
  refetch: (e:boolean) => void,
  id: string,
}


export default function EditTransaction({amountInUSD, amountInCRYPTO, coinName, id, ToggleModal, refetch}:ITransactionData ) {

  const [amount, setAmount] = useState(0)
  const [amountInCrypto, setAmountInCrypto] = useState(0)
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  useEffect(() => {
    setAmount(amountInUSD)
    if(amountInCRYPTO) setAmountInCrypto(amountInCRYPTO)
  }, [])



  const handleUpdate = async(e:any) => {
    e.preventDefault();
    setError(null)
    setSuccess(false)

    try {
      setLoading(true)
      const res = await fetch(`${url}/transactions/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ amount, convertedAmount: amountInCrypto})
      })

      const data = await res.json()

      if(res.ok) setSuccess(data.message) 
      else throw new Error(data.message)
    } catch (error: any) {
      setError(error.message)
      console.log(error.message)
    } finally{
      setLoading(false)
      setTimeout(() => refetch(false), 2000)
    }
  }


  return (
    <div className="w-full flex  justify-center shadow-1 m-auto">
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" action="#" onSubmit={handleUpdate}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Edit Transaction</h5>


        <div className="flex flex-col gap-5">
          <div className="flex-auto">
            <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount In USD</label>
            <input onChange={(e) => setAmount(Number(e.target.value))} value={amount} type="number" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Deposit Amount" required min={0}/>
          </div>

          <div className="flex-auto">
            <label htmlFor="convertedAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Amount in {coinName}</label>
            <input onChange={(e) => setAmountInCrypto(Number(e.target.value))} value={amountInCrypto} type="number" id="convertedAmount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
          </div>
        </div>

        <div className="flex gap-5 max-xsm:gap-2">
          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading? "Loading...": "Save"}</button>

          <a href="#" onClick={() => ToggleModal(false)} className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Cancel </a>
        </div>
        {error && <p className={s.formError}>{error}</p>}
        {success && <p className={s.formSuccess}>{success}</p>}
      </form>
    </div>
  </div>
  )
}
