import { contextData } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import s from '../login/Login.module.css';
import PageLoader from "@/components/PageLoader";


interface Coin{
  name: string;
  address: string;
  network: string;
  price: number;
}

export default function Withdraw() {
  const [amount, setAmount] = useState(0)
  const [convertedAmount, setConvertedAmount] = useState<string|number>(0)
  const [coins, setCoins] = useState([])
  const [coin, setCoin] = useState<Coin|undefined>()
  const [address, setAddress] = useState("")
  const [network, setNetwork] = useState("")
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState<any>(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL
  const { user } = contextData()


  const fetchCoins = async () => {
    setFetching(true)
    try {
      const res = await fetch(`${url}/utils`)
      const data = await res.json()

      if(res.ok) {
        setCoins(data.coins) 
        setCoin(data.coins[0])
      }
      else throw new Error(data.message)
    } catch (error) {
      console.log(error)
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => {
    fetchCoins()
  }, [])



  const sendWithdraw = async (e: any) => {
    e.preventDefault()
    setError(null)

    if(amount < 1) return setError("The minimum transfer amount is $1")
    if(address === "") return setError("The address must be specified")
    if(network === "") return setError("The network must be specified")
    setLoading(true)
    setSuccess(false)

    try {
      const res = await fetch(`${url}/withdrawals`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id: user._id, amount, convertedAmount, coinName: coin?.name, address, network })
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

  const roundNumber = (number:number) => {
    if (number < 1 && Math.abs(number) % 1 > 1e-6) {
      return number.toFixed(6);
    }

    return number.toFixed(2);
  };



  const handleCoinChange = (e:any) => {
    const findCoin:Coin|any = JSON.parse(e.target.value);
    if(findCoin) setCoin(findCoin)

    if(findCoin) {
      setConvertedAmount(roundNumber(amount/findCoin.price))
    }
  }

  const handleAmountChange = (e:any) => {
    const newAmount = Number(e.target.value)
    setAmount(newAmount)
    if(coin) setConvertedAmount(roundNumber(newAmount/coin.price))
  }



  if(fetching) return <PageLoader />

  return (coin &&
    <div className="w-full flex  justify-center shadow-1 m-auto">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#" onSubmit={sendWithdraw}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Start Withdraw</h5>

          <div className="flex gap-5">
            <div className="flex-auto">
              <label htmlFor="coin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Method</label>
              <select onChange={handleCoinChange} id="coin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 capitalize">
                {coins.map((c:Coin, i:number) => <option key={i} value={JSON.stringify(c)}>{c.name}</option>)}
              </select>
            </div>

            <div className="flex-auto">
              <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount In USD</label>
              <input onChange={handleAmountChange} value={amount} type="number" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Withdraw Amount" required min={0}/>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex-auto">
              <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wallet Address</label>
              <input onChange={(e) => setAddress(e.target.value)} value={address} type="text" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Wallet Address" required/>
            </div>

            <div className="flex-auto">
              <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Network</label>
              <input onChange={(e) => setNetwork(e.target.value)} value={network} type="text" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Wallet Network" required/>
            </div>
          </div>


          <div className="flex flex-col gap-5">
            <div className="flex-auto">
              <label htmlFor="convertedAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Amount in {coin?.name}</label>
              <input value={convertedAmount} type="number" id="convertedAmount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" disabled required/>
            </div>

            <div className="flex-auto">
              <label htmlFor="minWithdraw" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Minimum Withdraw</label>
              <input value="1" type="number" id="minWithdraw" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" disabled required/>
            </div>
          </div>

          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading? "Loading...": "Withdraw"}</button>
          {error && <p className={s.formError}>{error}</p>}
          {success && <p className={s.formSuccess}>{success}</p>}
        </form>
      </div>
    </div>
  )
}
