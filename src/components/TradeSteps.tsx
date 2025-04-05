import secBg from '../assets/road.png'

type TradeStep = {
  title: string,
  desc: string,
}

export default function TradeSteps({ tradeSteps }: {tradeSteps: TradeStep[]}) {
  return (
    <section className="flex flex-wrap justify-center gap-20 max-ctn py-14 px-5 bg-center bg-cover bg-fixed" style={{backgroundImage: `url(${secBg})`}}>
      {tradeSteps.map((tradeStep, i) =>
      <div className="w-full max-w-sm p-6 flex flex-col gap-5 shadow-md rounded-3xl bg-white/40 backdrop-blur-lg">
        <div className="w-9 h-9 rounded-full p-5 bg-gray-300 flex items-center justify-center font-semibold">{i+1}</div>
        <h3 className="text-lg font-semibold">{tradeStep.title}</h3>
        <p className="font-normal text-sm text-gray-400">{tradeStep.desc}</p>
      </div>
      )}
    </section>
  )
}
