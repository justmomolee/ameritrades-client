import CheckList from "./CheckList";

export default function WideCard() {
  const listItems = [
    {title: "Forex CFDs", subTitle: "61 Products"},
    {title: "Commodities CFDs", subTitle: "24 Products"},
    {title: "Stocks CFDs", subTitle: "+2100 Products"},
    {title: "Indices CFDs", subTitle: "25 Products"},
    {title: "Bond CFDs", subTitle: "9 Products"},
    {title: "Crypto CFDs", subTitle: "21 Products"},
  ]


  return (
    <section className="px-3 py-28">
        <div className="max-ctn w-full px-6 py-10 bg-gray-100 rounded-3xl">
          <h3 className="text-3xl font-semibold mb-10"> 
            Global Markets At Your Fingertips 
          </h3>
          <ul className="w-full max-w-2xl mb-8 flex flex-wrap gap-14">
            {listItems.map((item, i) => (
            <li key={i} className="flex space-x-3 w-40">
              <CheckList />

              <p className="flex flex-col gap-1">
                <span className="text-sm text-gray-900 font-semibold">{item.title}</span>
                <span className="text-[10px] text-gray-400 font-medium">{item.subTitle}</span>
              </p>
            </li>
            ))}
          </ul>
          <a href="#" className="primaryBtn !bg-gray-200 !text-black" >
            Pricing Overview <span className="ml-3">&rarr;</span>
          </a>
        </div>
    </section>
  )
}
