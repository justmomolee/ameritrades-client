import { useState } from "react";
import s from "../pages/login/Login.module.css"

export default function CreateTradeModal({toggleModal}:any) {
  const [stock, setStock] = useState('')
  const [interest, setInterest] = useState(0)
  const [error, setError] = useState<null|string>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;



  const startTrade = async (e: any) => {
    e.preventDefault()
    setError(null)


    if(stock.length < 2) return setError("Stock must be above 1 character")
    if(!(interest >= 0)) return setError("Interest cannot be less than 0 character")

    setLoading(true)
    setSuccess(false)

    try {
      const res = await fetch(`${url}/trades`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ package: stock, interest: Number(interest/100) })
      })
      const data = await res.json()

      if(res.ok) setSuccess(data.message) 
      else throw new Error(data.message)
    } catch (error: any) {
      setError(error.message)
    } finally{
      setLoading(false)
    }
  }


  return (
    <div className="w-screen h-screen fixed left-0 top-0 z-9999 flex items-center justify-center backdrop-blur px-2">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#" onSubmit={startTrade}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white capitalize">Create Trade</h5>
          <div>
            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
            <input onChange={(e) => setStock(e.target.value)} value={stock} type="text" id="stock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="TSLA" required/>
          </div>

          <div>
            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Interest</label>
            <input onChange={(e) => setInterest(Number(e.target.value))} value={interest} type="Number" id="stock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="50%" required min={0}/>
          </div>

          <div className="flex gap-5">
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading? "Loading...": "Start Trade"}</button>
            <button onClick={() => toggleModal(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
          </div>
          {error && <p className={s.formError}>{error}</p>}
          {success && <p className={s.formSuccess}>{success}</p>}
        </form>
      </div>  
    </div> 
  )
}
