import { BsCheck } from "react-icons/bs"
import s from "./Pricing.module.css";
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { BTC, NFP, advancedPlan, standardPlan } from "@/lib/utils";
import TradeModal from "../TradeModal";
import { contextData } from "@/context/AuthContext";


export default function Pricing() {
  const [standard, setStandard] = useState(true)
  const [advanced, setAdvanced] = useState(false)
  const [nfp, setNFP] = useState(false)
  const [btc, setBTC] = useState(false)
  const location = useLocation();
  const isDashboardRoute = location.pathname.includes("dashboard");
  const [tradeType, setTradeType] = useState("")
  const [showModal, setShowModal] = useState(false)
  const { user } = contextData()
  const navigate = useNavigate()


    const toggleModal = (bool:boolean) => {
      console.log(bool)
      setShowModal(bool)
    }


    const handleInvest = (plan:string) => {
      return
      if(!user) navigate('/login')
      else {
        setTradeType(plan)  
        toggleModal(true)
      }
    }

    const showStandard = () => {
      setStandard(true)
      setAdvanced(false)
      setNFP(false)
      setBTC(false)
    }

    const showAdvanced = () => {
      setStandard(false)
      setAdvanced(true)
      setNFP(false)
      setBTC(false)
    }

    const showNFP = () => {
      setStandard(false)
      setAdvanced(false)
      setNFP(true)
      setBTC(false)
    }

    const showBTC = () => {
      setStandard(false)
      setAdvanced(false)
      setNFP(false)
      setBTC(true)
    }





  return (
    <section className="pt-14 relative">
      <div className="w-full max-w-[fit-content] m-auto flex flex-col justify-center gap-5">
        <h1 className={`text-3xl font-semibold text-gray-800   ${isDashboardRoute && "dark:text-gray-100"} text-center`}>Pricing</h1>
        <div className="rounded-full flex flex-wrap gap-1 p-2 transition-all justify-center">
          <button onClick={showStandard} className={`${standard ? 'bg-green-300' : 'bg-white'} text-gray-800 rounded-full px-3 py-1 text-xs font-semibold`}>Standard</button>
          <button onClick={showAdvanced} className={`${advanced ? 'bg-green-300' : 'bg-white'} text-gray-800 rounded-full px-3 py-1 text-xs font-semibold`}>Advanced</button>
          <button onClick={showNFP} className={`${nfp ? 'bg-green-300' : 'bg-white'} text-gray-800 rounded-full px-3 py-1 text-xs font-semibold`}>NFP</button>
          <button onClick={showBTC} className={`${btc ? 'bg-green-300' : 'bg-white'} text-gray-800 rounded-full px-3 py-1 text-xs font-semibold`}>BTC</button>
        </div>
      </div>

      {/* Standard Plan */}
      {standard &&
      <div className={s.ctn}>
        {standardPlan.map((plan:any, i:any)  =>
          <div className={`${s.card} ${isDashboardRoute && "dark:border-green-300/30"}`} key={i}>
            <div className={s.content1}>
              <h2 className={`${isDashboardRoute && "dark:!text-green-100/50"} `}>{plan.title}</h2>
              {plan.pips.max !== undefined && <h3 className={`${isDashboardRoute && "dark:!text-gray-300"}`}>{plan.pips.min}<span>%</span> - {plan.pips.max}<span>%</span></h3>}
              {plan.pips.max === undefined && <h3 className={`${isDashboardRoute && "dark:!text-gray-300"}`}>{plan.pips.min}<span>%</span></h3>}
              <span className={`${s.seperate} dark:!bg-green-300/10`}></span>
            </div>
            <button className={`${isDashboardRoute && "dark:!bg-gray-300"}`} onClick={() => handleInvest("standard")}>Start Trade</button>
            <div className={s.content2}>
              {plan.truepoints.map((truepoint: any) => <div key={truepoint} className={s.fact1}><span><BsCheck /><p className={`${isDashboardRoute && "dark:!text-gray-100/50"}`}>{truepoint}</p></span></div>) }
            </div>
          </div>
        )}
      </div> 
      }

      {/* Advanced Plan */}
      {advanced &&
      <div className={s.ctn}>
        {advancedPlan.map((plan:any, i:any)  =>
          <div className={`${s.card} dark:border-green-300/30`} key={i}>
            <div className={s.content1}>
              <h2 className="dark:!text-green-100/50">{plan.title}</h2>
              {plan.pips.max !== undefined && <h3 className={`${isDashboardRoute && "dark:!text-gray-300"}`}>{plan.pips.min}<span>%</span> - {plan.pips.max}<span>%</span></h3>}
              {plan.pips.max === undefined && <h3 className={`${isDashboardRoute && "dark:!text-gray-300"}`}>{plan.pips.min}<span>%</span></h3>}
              <span className={`${s.seperate} dark:!bg-green-300/10`}></span>
            </div>
            <button className={`${isDashboardRoute && "dark:!bg-gray-300"}`} onClick={() => handleInvest("advanced")}>Start Trade</button>
            <div className={s.content2}>
              {plan.truepoints.map((truepoint: any) => <div key={truepoint} className={s.fact1}><span><BsCheck /><p className={`${isDashboardRoute && "dark:!text-gray-100/50"}`}>{truepoint}</p></span></div>) }
            </div>
          </div>
        )}
      </div> 
      }

      {/* NFP */}
      {nfp &&
      <div className={s.ctn}>
        {NFP.map((plan:any, i:any)  =>
          <div className={`${s.card} dark:border-green-300/30`} key={i}>
            <div className={s.content1}>
              <h2 className="dark:!text-green-100/50">{plan.title}</h2>
              {plan.pips.max !== undefined && <h3 className={`${isDashboardRoute && "dark:!text-gray-300"}`}>{plan.pips.min}<span>%</span> - {plan.pips.max}<span>%</span></h3>}
              {plan.pips.max === undefined && <h3 className={`${isDashboardRoute && "dark:!text-gray-300"}`}>{plan.pips.min}<span>%</span></h3>}
              <span className={`${s.seperate} dark:!bg-green-300/10`}></span>
            </div>
            <button className={`${isDashboardRoute && "dark:!bg-gray-300"}`} onClick={() => handleInvest("nfp")}>Start Trade</button>
            <div className={s.content2}>
              {plan.truepoints.map((truepoint: any) => <div key={truepoint} className={s.fact1}><span><BsCheck /><p className={`${isDashboardRoute && "dark:!text-gray-100/50"}`}>{truepoint}</p></span></div>) }
            </div>
          </div>
        )}
      </div> 
      }

      {/*BTC*/}
      {btc &&
      <div className={s.ctn}>
        {BTC.map((plan:any, i:any)  =>
          <div className={`${s.card} dark:border-green-300/30`} key={i}>
            <div className={s.content1}>
              <h2 className="dark:!text-green-100/50">{plan.title}</h2>
              {plan.pips.max !== undefined && <h3 className={`${isDashboardRoute && "dark:!text-gray-300"}`}>{plan.pips.min}<span>%</span> - {plan.pips.max}<span>%</span></h3>}
              {plan.pips.max === undefined && <h3 className={`${isDashboardRoute && "dark:!text-gray-300"}`}>{plan.pips.min}<span>%</span></h3>}
              <span className={`${s.seperate} dark:!bg-green-300/10`}></span>
            </div>
            <button className={`${isDashboardRoute && "dark:!bg-gray-300"}`} onClick={() => handleInvest("btc")}>Start Trade</button>
            <div className={s.content2}>
              {plan.truepoints.map((truepoint: any) => <div key={truepoint} className={s.fact1}><span><BsCheck /><p className={`${isDashboardRoute && "dark:!text-gray-100/50"}`}>{truepoint}</p></span></div>) }
            </div>
          </div>
        )}
      </div> 
      }
    {showModal && <TradeModal tradeType={tradeType} toggleModal={toggleModal}/>}
    </section>
  )
}
