import UsdChart from "@/components/UsdChart"
import Balance from "@/components/balance/Balance"
import { contextData } from "@/context/AuthContext"

export default function Bonus() {
  const { user } = contextData()


  return (
    <div>
      <div className="w-full flex gap-5 my-4 max-[900px]:flex-col">
        <div className="flex-none">
          <Balance type="bonus" user={user}/>
        </div>
        <div className="flex-auto shadow-1">
          <UsdChart />
        </div>
      </div>
    </div>
  )
}
