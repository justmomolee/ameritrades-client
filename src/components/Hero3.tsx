import { Link } from "react-router-dom"

type heroProps = {
  title: string,
  subtitle: string,
}

interface IHeroProps {
  data: heroProps,
  isProduct: boolean
}

export default function Hero3({ data, isProduct }: IHeroProps) {
  return (
    <section className="bg-gray-900">
      <div className="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element-dark.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:w-full before:h-full before:z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 relative z-10">
          <div className="flex justify-center">
            <a className="inline-flex items-center gap-x-2 border text-sm p-1 ps-3 rounded-full transition hover:border-gray-600 bg-gray-800 border-gray-700 text-gray-200 focus:outline-none focus:ring-1 focus:ring-gray-600" href="#">
               Join the community
              <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full font-semibold text-sm text-gray-400 bg-gray-700">
                <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </span>
            </a>
          </div>

          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-4xl md:text-5xl lg:text-6xl text-gray-200">
              {data.title} {" "}
              {isProduct && <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">CFDs</span>}
            </h1>
          </div>

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-400">{data.subtitle}</p>
          </div>

          <div className="mt-8 gap-3 flex justify-center">
            <Link className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 focus:ring-offset-gray-800" to="/login">
              Get started
              <svg className="flex-shrink-0 w-4 h-4" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
