import DisplayActiveTrade from "@/components/DisplayActiveTrade";
import UsdChart from "@/components/UsdChart"
import Balance from "@/components/balance/Balance"
import { contextData } from "@/context/AuthContext"
import { useEffect, useState } from "react";

export default function Trades() {
  const [tradeData, setTradeData] = useState<any>([]);
  const { user } = contextData();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const fetchTrades = async () => {
    try {
      const res = await fetch(`${url}/trades`);
      const data = await res.json();
  
      if (res.ok) {
        const filteredTrades = data.filter((trade:any) => new Date(trade.date) > new Date(user.createdAt));
        setTradeData(filteredTrades);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    fetchTrades();
    console.log(tradeData)
  }, [tradeData.length]);


  return (
    <>
      <div className="w-full flex gap-5 my-4 max-[900px]:flex-col">
        <div className="flex-none">
          <Balance type="trade" user={user}/>
        </div>
        <div className="flex-auto shadow-1">
          <UsdChart />
        </div>
      </div>

      {tradeData ? (
        <DisplayActiveTrade trades={tradeData} />
      ) : (
        <p>No trade data yet.</p>
      )}
    </>
  );
}
