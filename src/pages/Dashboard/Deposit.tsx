import { contextData } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import s from '../login/Login.module.css';
import PageLoader from "@/components/PageLoader";
import { IoCopy } from "react-icons/io5";
import { GoInfo } from "react-icons/go";


interface Coin{
  name: string;
  address: string;
  network: string;
  price: number;
}

export default function Deposit() {
  const [amount, setAmount] = useState(0)
  const [convertedAmount, setConvertedAmount] = useState<string|number>(0)
  const [coins, setCoins] = useState([])
  const [coin, setCoin] = useState<Coin|undefined>()
  const [fetching, setFetching] = useState(false)
  const [error, setError] = useState<any>(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
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



  const sendDeposit = async (e: any) => {
    e.preventDefault()
    setError(null)

    if(amount < 1) return setError("The minimum transfer amount is $1")
    setLoading(true)
    setSuccess(false)

    try {
      const res = await fetch(`${url}/deposits`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ id: user._id, amount, convertedAmount, coinName: coin?.name })
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


  const copyToClipBoard = async (copyMe:string) => {
    await navigator.clipboard.writeText(copyMe);
    setCopySuccess(true)
    setTimeout(() => {
      setCopySuccess(false)
    }, 3000)
  }




  if(fetching) return <PageLoader />

  return (coin &&
    <>
    {!success ?
    <div className="w-full flex  justify-center shadow-1 m-auto">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" action="#" onSubmit={sendDeposit}>
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">Start Deposit</h5>

          <div className="flex gap-5">
            <div className="flex-auto">
              <label htmlFor="coin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Method</label>
              <select onChange={handleCoinChange} id="coin" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 capitalize">
                {coins.map((c:Coin, i:number) => <option key={i} value={JSON.stringify(c)}>{c.name} {c.network}</option>)}
              </select>
            </div>

            <div className="flex-auto">
              <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount In USD</label>
              <input onChange={handleAmountChange} value={amount} type="number" id="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Enter Deposit Amount" required min={0}/>
            </div>
          </div>


          <div className="flex flex-col gap-5">
            <div className="flex-auto">
              <label htmlFor="convertedAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">Amount in {coin?.name}</label>
              <input value={convertedAmount} type="number" id="convertedAmount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" disabled required/>
            </div>

            <div className="flex-auto">
              <label htmlFor="minDeposit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Minimum Deposit</label>
              <input value="1" type="number" id="minDeposit" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" disabled required/>
            </div>
          </div>

          <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading? "Loading...": "Deposit"}</button>
          {error && <p className={s.formError}>{error}</p>}
        </form>
      </div>
    </div>:

    <div className="w-full flex  justify-center shadow-1 m-auto">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h4 className="text-lg font-semibold text-gray-900 dark:text-[#c7ffb3] mb-4">Deposit Confirmation</h4>
      <h5 className="text-base font-semibold text-gray-900 dark:text-gray-300 mb-3 capitalize">{coin?.name} Payment</h5>


      <p className="text-sm font-light text-gray-900 dark:text-gray-300 mb-4">
        Your deposit order of <span className="text-green-400 font-medium">{amount} USD</span> has been placed.
      </p>

      <p className="text-sm font-light text-gray-900 dark:text-gray-300 mb-4">
        Please send <span className="text-green-400 font-medium uppercase">{convertedAmount} {coin?.name} {coin?.network}</span> to the address below. The amount will appear in your account only after transaction is approved.
      </p>

      <h5 className="text-sm font-semibold m-auto text-gray-900 dark:text-gray-100 mb-4">
        Pay To The Wallet Address Below
      </h5>


      <p className="flex text-center gap-2 mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white">
        <span className="flex-auto text-[12px]">
          {coin.address.length > 30 ? `${coin.address.substring(0, 30)}...` : coin.address}
          </span>
        <span className="flex items-center gap-3 cursor-pointer w-20" onClick={() => copyToClipBoard(coin.address)}>
          <IoCopy style={copySuccess ? {color: "#4ECB71"}: {}}/>
           copy
        </span>
      </p>

      <p className="flex text-[10px] gap-2 text-gray-800 dark:text-gray-400 leading-none">
        <GoInfo className="text-xl"/> Kindly make sure to check that your are sending to above generated wallet address, to avoid loss of funds.
      </p>
      </div>
    </div>
  }
  </>
  )
}
