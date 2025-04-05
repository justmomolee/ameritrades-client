const listItems = ['Raw spreads means really from 0.0 pips*', 'Our diverse and proprietary liquidity mix keeps spreads tight 24/5']
import CheckList from "./CheckList";

const SpreadSteps = () => {

  return (
    <section className="px-3 py-28">
      <div className="max-ctn flex flex-wrap gap-x-10 gap-y-20 justify-between py-12">
        <div className="w-full px-5 py-10 bg-gray-100 rounded-3xl">
          <h3 className="text-3xl font-semibold mb-8 max-md:!text-2xl max-md:font-bold ">
            Spreads from 0.0 Pips
          </h3>
          <ul className="list mb-5 text-[1rem]">
            {listItems.map((item, i) => (
            <li key={i} className="flex space-x-3 mb-4">
              <CheckList />

              <span className="text-sm text-gray-900 font-semibold">
                {item}
              </span>
            </li>
            ))}
          </ul>
          <a href="#" className="primaryBtn !bg-gray-200 !text-black" >
            Pricing Overview <span className="ml-3">&rarr;</span>
          </a>
        </div>

        <div className="bg-gray-100 rounded-3xl px-5 py-10 w-full max-w-[580px]">
          <h3 className="text-3xl font-semibold mb-8 max-md:!text-2xl max-md:font-bold ">
            Fast Order Execution
          </h3>
          <ul className="list mb-5 text-[1rem]">
            <li className="flex space-x-3 mb-4">
              <CheckList />

              <span className="text-sm text-gray-900 font-semibold">
                Average execution speeds of under 40ms***
              </span>
            </li>

            <li className="flex space-x-3 mb-4">
              <CheckList />

              <span className="text-sm text-gray-900 font-semibold">
                Low latency fibre optic and Equinix NY4 server
              </span>
            </li>

            <li className="flex space-x-3 mb-4">
              <CheckList />

              <span className="text-sm text-gray-900 font-semibold">
                Free Low latency collocated VPS available
              </span>
            </li>
          </ul>
          <a href="#" className="primaryBtn !bg-gray-200 !text-black" >
            Get your Free VPS <span className="ml-3">&rarr;</span>
          </a>
        </div>

        <div className="bg-gray-100 rounded-3xl px-5 py-10 w-full max-w-[580px]">
          <h3 className="text-3xl font-semibold mb-8 max-md:!text-2xl max-md:font-bold ">
            Grade Trading
          </h3>
          <ul className="list mb-5 text-[1rem]">
            <li className="flex space-x-3 mb-4">
              <CheckList />

              <span className="text-sm text-gray-900 font-semibold">
                Real, deep and diverse liquidity you can trade on
              </span>
            </li>

            <li className="flex space-x-3 mb-4">
              <CheckList />

              <span className="text-sm text-gray-900 font-semibold">
                Over 29 Billion USD in FX trades processed daily
              </span>
            </li>

            <li className="flex space-x-3 mb-4">
              <CheckList />

              <span className="text-sm text-gray-900 font-semibold">
                Copied Trades have 100% success rates
              </span>
            </li>
          </ul>
          <a href="#" className="primaryBtn !bg-gray-200 !text-black" >
            Raw Pricing Benefits <span className="ml-3">&rarr;</span>
          </a>
        </div>
      </div>

    </section>
  );
};

export default SpreadSteps;
