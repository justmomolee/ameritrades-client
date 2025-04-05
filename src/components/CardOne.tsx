import CheckList from './CheckList';
import image1 from '../assets/hero.webp';
import image2 from '../assets/image-2.png';

export default function CardOne() {
  return (
    <div className="max-ctn py-30 px-5">
      <h2 className="max-w-xl p-4 text-2xl max-sm:text-xl max-sm:text-left font-bold mb-14 text-center text-gray-900 m-auto">
        Ameritrades is the strongest platform you will ever trade with
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-full sm:max-w-70 rounded-2xl border border-gray-200 shadow-1 flex flex-col gap-7">
          <h2 className="text-xl p-6 font-semibold text-gray-900">
            Expert Traders
          </h2>

          <ul className="space-y-2 sm:space-y-4 px-4">
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-satoshi font-semibold">
                4x more trades per user
              </span>
            </li>
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-satoshi font-semibold">
                {' '}
                Highly engaging
              </span>
            </li>
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-satoshi font-semibold">
                Worldwide community
              </span>
            </li>
          </ul>

          <img
            src={image1}
            alt="Expert Traders"
            className="w-full h-70 object-contain object-center"
          />
        </div>

        <div className="w-full sm:max-w-70 rounded-2xl border border-gray-200 shadow-1 flex flex-col gap-7 overflow-hidden">
          <h2 className="text-xl p-6 font-semibold text-gray-900">
            Copy Trading
          </h2>

          <ul className="space-y-2 sm:space-y-4 px-4">
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-satoshi font-semibold">
                Copy the trades of Lead Traders
              </span>
            </li>
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-satoshi font-semibold">
                Save time with copy trading
              </span>
            </li>
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-satoshi font-semibold">
                Leaderboard with statistic
              </span>
            </li>
          </ul>

          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-70 object-cover"
          >
            <source
              src="https://naga.com/images/new-main-page/why-choose-naga/video-new.mp4"
              type="video/mp4"
            />
            video
          </video>
        </div>

        <div className="w-full sm:max-w-70 rounded-2xl border border-gray-200 shadow-1 flex flex-col gap-7">
          <h2 className="text-xl p-6 font-semibold text-gray-900">
            Multi-Asset
          </h2>

          <ul className="space-y-2 sm:space-y-4 px-4">
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-satoshi font-semibold">
                CFD's on FX, Indices, Metals. Commodities
              </span>
            </li>
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-satoshi font-semibold">
                Short & Long Trading
              </span>
            </li>
            <li className="flex space-x-3">
              <CheckList />
              <span className="text-sm text-gray-800 font-satoshi font-semibold">
                Low and transparent fees
              </span>
            </li>
          </ul>

          <img
            src={image2}
            alt="Expert Traders"
            className="w-full h-70 object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
