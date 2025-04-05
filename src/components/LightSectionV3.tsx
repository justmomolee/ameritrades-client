import CheckList from "./CheckList"


export default function LightSectionV3() {
  return (
    <section>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
          <div>
            <img className="rounded-xl" src="https://images.unsplash.com/photo-1579225663317-c0251b4369bc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Image Description" />
          </div>

          <div className="mt-5 sm:mt-10 lg:mt-0">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-2 md:space-y-4">
                <h2 className="font-bold text-2xl lg:text-5xl text-gray-800">
                  Copy The Trades Of Other Traders
                </h2>
                <p className="text-gray-500">
                  Diversify your trading and try following the strategies of our Lead traders. Copy their trading activity. They trade, you trade!
                  Their potential becomes yours too!
                </p>
                <p className="text-gray-500 flex flex-col gap-2">
                  <span>Find a trader you like and make sure to check if the risk score suits you.</span>
                  <span>Choose if you want to invest relative or a fixed amount per each trade.</span>
                  <span>Begin mirroring the strategies of other traders automatically in real-time.</span>
                </p>
              </div>

              <ul className="space-y-2 sm:space-y-4">
                <li className="flex space-x-3">
                  <CheckList />

                  <span className="text-sm sm:text-base text-gray-500">
                  Pick a <span className="font-bold">trader</span>
                  </span>
                </li>

                <li className="flex space-x-3">
                  <CheckList />

                  <span className="text-sm sm:text-base text-gray-500">
                    Set the <span className="font-bold">amount</span>
                  </span>
                </li>

                <li className="flex space-x-3">
                  <CheckList />

                  <span className="text-sm sm:text-base text-gray-500">
                    Relax & Earn
                  </span>
                </li>
              </ul>

              <button className="primaryBtn" >Try copy trading now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}