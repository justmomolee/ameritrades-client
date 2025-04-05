import { ChevronDownIcon } from '@heroicons/react/20/solid';
import copyTradeDevice from '../assets/multibank-mt4.png'

import secImg2 from '../assets/copy-trade3.png'
import secImg3 from '../assets/copy-trade2.png'
import secImg4 from '../assets/exchange-script-banner.webp'
import cert from '../assets/cert.png'








interface MenuItem {
  name: string;
  description?: string;
  href: string;
}

export interface MenuGroup {
  name: string;
  icon?: any;
  items: MenuItem[];
  href: string;
}



export const imgRootLink = 'https://assets.website-files.com/63904f663019b0d8edf8d57c'

export const heroAvatarLinks = [
  `${imgRootLink}/63905430069fb027f83abb71_Ellipse-3.jpg`,
  `${imgRootLink}/63905435069fb009d43abbb1_Ellipse-2.jpg`,
  `${imgRootLink}/6390542e809b5c72a0cdcb99_Ellipse.jpg`,
  `${imgRootLink}/6390543797156ee437ef0425_Ellipse-1.jpg`,
]

export const products: MenuItem[] = [
  { name: 'Forex CFDs', href: '/products/forex' },
  { name: 'Commodities CFDs', href: '/products/commodities' },
  { name: 'Indices CFDs', href: '/products/indices' },
  { name: 'Bonds CFDs', href: '/products/bonds' },
  { name: 'Stocks CFDs', href: '/products/stocks' },
  { name: 'Futures CFDs', href: '/products/futures' },
  { name: 'Digital Currencies', href: '/products/crypto' },
];

export const company: MenuItem[] = [
  { name: 'Why Ameritrades', href: '/company/why' },
  { name: 'Regulations', href: '/company/regulations' },
  { name: 'Contact Us', href: '/company/contact' },
  { name: 'Expert Traders', href: '/company/traders' },
  { name: 'White Label', href: '/company/label' },
  { name: 'Insurance', href: '/company/insurance' },
  { name: 'Careers', href: '/company/careers' },
  { name: 'Servers', href: '/company/servers' },
  { name: 'MT4 Tools', href: '/company/tools' },
];

export const more: MenuItem[] = [
  { name: 'Pricing', href: '/more/pricing' },
  { name: 'Trading Conditions', href: '/more/conditions' },
  { name: 'Spreads', href: '/more/spreads' },
  { name: 'Trading Hours', href: '/more/hours' },
  { name: 'Swap Rates', href: '/products/swap' },
];


export const menuItems: MenuGroup[] = [
  { name: 'CopyTrading', icon: ChevronDownIcon, items: [], href: '/copytrade' },
  { name: 'Products', icon: ChevronDownIcon, items: [...products], href: '/products' },
  { name: 'Company', icon: ChevronDownIcon, items: [...company], href: '/company' },
  { name: 'More', icon: ChevronDownIcon, items: [...more], href: '/' },
];


export const standardPlan = [
  {
    pips: {
      min: 20,
      max: 25
    },
    title: "STANDARD",
    truepoints: ["Minimum: ﹩3,000", "Maximum: ﹩4,999", "10% Trade Commission", "24/7 active support"],
  },
  {
    pips: {
      min: 25,
      max: 30
    },
    title: "MASTER",
    truepoints: ["Minimum: ﹩5,000", "Maximum: ﹩9,999", "10% Trade Commission", "24/7 active support"],
  },
  {
    pips: {
      min: 30,
      max: 35
    },
    title: "PREMIUM",
    truepoints: ["Minimum: ﹩10,000", "Maximum: ﹩19,999", "10% Trade Commission", "24/7 active support"],
  },
  {
    title: "ULTIMATE",
    pips: {
      min: 35,
      max: 40
    },
    truepoints: ["Minimum: ﹩20,000", "Maximum: ﹩49,999", "10% Trade Commission", "24/7 active support"],
  },
  {
    pips: {
      min: 40,
      max: 45
    },
    title: "CORPORATE",
    truepoints: ["Minimum: ﹩50,000", "Maximum: Unlimited", "10% Trade Commission", "24/7 active support"],
  },
]


export const advancedPlan = [
  {
    pips: {
      min: 30,
      max: 40
    },
    title: "STANDARD",
    truepoints: ["Minimum: ﹩1,000", "Maximum: ﹩9,999", "10% Trade Commission", "24/7 active support"],
  },
  {
    pips: {
      min: 40,
      max: 45
    },
    title: "MASTER PLUS",
    truepoints: ["Minimum: ﹩10,000", "Maximum: ﹩19,999", "10% Trade Commission", "24/7 active support"],
  },
  {
    pips: {
      min: 50,
      max: 60
    },
    title: "PREMIUM",
    truepoints: ["Minimum: ﹩20,000", "Maximum: ﹩49,999", "10% Trade Commission", "24/7 active support"],
  },
  {
    title: "ULTIMATE",
    pips: {
      min: 60,
      max: 70
    },
    truepoints: ["Minimum: ﹩50,000", "Maximum: ﹩99,999", "10% Trade Commission", "24/7 active support"],
  },
  {
    pips: {
      min: 70,
      max: 80
    },
    title: "CORPORATE",
    truepoints: ["Minimum: ﹩100,000", "Maximum: Unlimited", "10% Trade Commission", "24/7 active support"],
  },
]


export const NFP = [
  {
    pips: {
      min: 100,
      max: 124
    },
    title: "STARTER",
    truepoints: ["Minimum: ﹩50,000", "Maximum: ﹩99,999", "10% Trade Commission", "24/7 active support"],
  },
  {
    pips: {
      min: 150,
      max: undefined
    },
    title: "PREMIUM",
    truepoints: ["Minimum: ﹩100,000", "Maximum: ﹩149,999", "10% Trade Commission", "24/7 active support"],
  },
  {
    pips: {
      min: 200,
      max: undefined
    },
    title: "ULTIMATE",
    truepoints: ["Minimum: ﹩150,000", "Maximum: Unlimited", "10% Trade Commission", "24/7 active support"],
  },
]


export const BTC = [
  {
    pips: {
      min: 65,
      max: 70
    },
    title: "BASIC",
    truepoints: ["1 - 1.5 BTC", "10% Trade Commission", "24/7 active support"],
  },
  {
    pips: {
      min: 70,
      max: 75
    },
    title: "STANDARD",
    truepoints: ["5 - 14.9 BTC", "10% Trade Commission", "24/7 active support"],
  },
  {
    pips: {
      min: 80,
      max: 85
    },
    title: "PREMIUM",
    truepoints: ["15 - 29.9 BTC", "10% Trade Commission", "24/7 active support"],
  },
  {
    pips: {
      min: 90,
      max: 95
    },
    title: "PRO",
    truepoints: ["30+ BTC", "10% Trade Commission", "24/7 active support"],
  },
]



export const testimonies = [
  {
    title: 'Product Manager | Capsule',
    name: 'Josh Tyson',
    imgUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80',
    message: "Ameritrades has made navigating the complex world of finance a breeze. Their extensive range of services reflects their expertise. Ameritrades's friendly demeanor and organized approach have made managing my investments effortless. For all things related to copy trading and financial planning, they're the ones I trust.",
  },
  {
    title: 'Senior Director of Operations | Fitbit',
    name: 'Luisa',
    imgUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80',
    message: "Ameritrades epitomizes excellence in copy trading services. Their unwavering dedication to ensuring customer satisfaction sets them apart. With a secure approach, authentic insights, and swift responsiveness, every interaction is seamless. If you're looking for a copy trading platform that delivers results, I wholeheartedly recommend Ameritrades!",
  },
  {
    title: 'Financial Analyst | Nova',
    name: 'Alisa Williams',
    imgUrl: 'https://images.unsplash.com/photo-1579017331263-ef82f0bbc748?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=900&h=900&q=80',
    message: "I've had the privilege of working with Ameritrades for some time now, and their professionalism and knowledge continue to impress me. They provide thoughtful advice tailored to my financial goals and risk tolerance. Ameritrades's commitment to their clients' success is truly remarkable.",
  },
  {
    title: 'Tech Entrepreneur | Quantum',
    name: 'Michael',
    imgUrl: 'https://images.pexels.com/photos/3932542/pexels-photo-3932542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    message: "Ameritrades's financial expertise has been a game-changer for me. Their insights into market trends and their ability to explain complex concepts in simple terms have empowered me to make better financial decisions. Their services have exceeded my expectations in every way.",
  },
  {
    title: 'Investment Strategist | Luna',
    name: 'Sarah Thompson',
    imgUrl: 'https://source.unsplash.com/320x320/?woman',
    message: "Ameritrades's commitment to their clients is truly commendable. Their dedication to achieving financial goals is evident in every interaction. Their insights have helped me navigate volatile markets with confidence, and their friendly approach makes discussing finances a breeze.",
  },
  {
    title: 'Wealth Manager | Quantum',
    name: 'Anderson',
    imgUrl: 'https://plus.unsplash.com/premium_photo-1682000321215-a061fd738095?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODV8fHdoaXRlJTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D',
    message: "Working with Ameritrades has been enlightening. Their advice extends beyond mere financial matters; they're a holistic wealth advisor. Their personalized approach and genuine care for their clients' financial well-being are what set them apart. I'm grateful for their guidance.",
  },
  {
    title: 'Entrepreneur | Happy customer',
    name: 'Clark',
    imgUrl: 'https://images.unsplash.com/photo-1554260570-9140fd3b7614?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHdoaXRlJTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D',
    message: "Ameritrades's expertise stands out in a crowded financial landscape. Their knowledge of investment opportunities and risk management is unparalleled. They've not only helped me make informed decisions but also educated me along the way. I highly recommend their services.",
  },
  {
    title: 'Crypto Enthusiast | Cosmos',
    name: 'Miller',
    imgUrl: 'https://images.unsplash.com/photo-1514851947871-97fd1e04b2e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjR8fHdoaXRlJTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D',
    message: "Ameritrades is a financial wizard. Their ability to foresee market trends and recommend timely actions is remarkable. I've achieved significant growth in my investments under their guidance. They're not just financial advisors; they're strategic partners in wealth-building.",
  },
  {
    title: 'Retirement Planner | Nebula',
    name: 'Yousaf',
    imgUrl: 'https://images.unsplash.com/photo-1610611803787-7cd04238196f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fHdoaXRlJTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D',
    message: "I've been a client of Ameritrades for years, and their dedication to my financial success has never wavered. Their well-rounded expertise covers everything from retirement planning to tax-efficient investing. They're an invaluable asset in securing my financial future.",
  },
  {
    title: 'Socially Responsible Investor | Quantum',
    name: 'Nathan',
    imgUrl: 'https://images.unsplash.com/photo-1590086782957-93c06ef21604?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d2hpdGUlMjBtYWxlfGVufDB8fDB8fHww',
    message: "Ameritrades's commitment to ethical financial practices is inspiring. Their recommendations are always aligned with my values, and their transparency in explaining financial strategies is refreshing. With their guidance, I've been able to achieve my financial goals while staying socially responsible.",
  },
];


export const tradeSteps = [
  {
    title: "Find a Lead Trader in the Leaderboard",
    desc: "Check out the Leaderboard, search by performance, assets, percentage of the win rate and more. Find the one for you and talk to support via Live Chat."
  },
  {
    title: "Enroll for an Account",
    desc: "Register on the platform to access the Autocopy dashboard and essential trading indicators that show how the Lead Trader performs and profits."
  },
  {
    title: "Verify account and deposit investment amount",
    desc: "Choose deposit method and make payment of amount you want to profit with trader."
  },
  {
    title: "After Trade ends, Take Profit triggers",
    desc: "You copy Stop Loss and Take Profit settings after your leader, but you can withdraw after trade ends."
  },
  {
    title: "Confirm settings and start Earning",
    desc: "After payment approval. Now you are automatically mirroring trader's positions. You can monitor your progress and profits or change your Autocopy profile settings any time."
  },
]



//Home Section
export const HomeSec1 = {
  title: "Copy Lead Traders",
  span: undefined,
  desc: "Join and trade via a social network and profit from the knowledge of trading experts. Copy Lead Traders from around the world and reach your targets!",
  moreDesc: [
    "Find a trader you like and make sure to check if the risk score suits you.",
    "Choose if you want to invest relative or a fixed amount per each trade.", 
    "Begin mirroring the strategies of other traders automatically in real-time.",
  ],
  imgUrl: copyTradeDevice,
}


//Home Section
export const HomeSec2 = {
  title: "Copy Trading Simplified",
  desc: "Discover the power of copy trading with our transparent platform. Follow successful traders and replicate their strategies seamlessly.",
  imgUrl: secImg2,
  url: "#"
}

//Home Section
export const aboutSec2 = {
  title: "Certification and Licensing",
  desc: "Certification validates skills through assessments by organizations, while licensing grants legal permission to engage in specific activities. Both ensure standards, professionalism, and public safety in various industries.",
  imgUrl: cert,
  url: "/Ameritrades.pdf",
  btnLabel: "View Certificate",
  pdf: true
}

//Home Section
export const HomeSec3 = {
  title: "When They Trade, You Trade",
  desc: "Whether you're a beginner learning the basics or you simply don't have time to watch the markets, now it's easy to leverage other traders' expertise. With Ameritrades Copy Trading, you can automatically copy top-performing traders, instantly replicating their trading in your own portfolio.",
  imgUrl: secImg3,
}

//Home Section
export const HomeSec4 = {
  title: "",
  span: undefined,
  desc: undefined,
  moreDesc: [
    "Increase your profits with the highest rebates & commissions in the industry.",
    "Join a growing network of 30,000+ introducing brokers since 2005.", 
    "Partner with a global leader in the financial markets.",
    "Experience our exclusive IB program that suits your business.",
    "Build a client network with our advanced partnership solution.",
  ],
  imgUrl: secImg4,
  reverse: true,
  bulletList: true
}



//Company Sections
export const companySec1 = {
  title: "About",
  span: "Ameritrades",
  desc: "Ameritrades is a contemporary copy trading platform, distinguished by its modern features in comparison to MetaQuotes' platform. Experience lightning-fast order execution and a user-friendly interface that enables you to indulge in Raw Pricing trading. Benefit from No Dealing Desk trading seamlessly, accessible from anywhere in the world.",
  moreDesc: [
    "Simple user interface",
    "Advanced take profit and stop loss systems", 
    "Detachable charts and varying chart time frames",
    "Live sentiments and depth of market",
  ],
  imgUrl: "https://images.pexels.com/photos/1181304/pexels-photo-1181304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  bulletList: true
}







//Hero Details for Products
export const fxHero = {
  title: "Forex",
  subtitle: "Access the world's largest and most liquid market with Raw spreads starting from 0.0 pips.",
}

export const cmHero = {
  title: "Commodities",
  subtitle: "Trade the most popular CFDs on Commodities from around the world, including energies, agriculture and metals. Ameritrades combines tight pricing and flexible conditions to give you one powerful product.",
}

export const indicesHero = {
  title: "Indices",
  subtitle: "Gain exposure to the basket of instruments making up the index in just one trade. The world’s most popular Indices are available on all Ameritrades trading platforms.",
}

export const bondsHero = {
  title: "Bonds",
  subtitle: "Trade the world’s most popular and liquid fixed income securities from the United States, the UK, Europe and Japan on MetaTrader 4 and 5.",
}

export const cryptoHero = {
  title: "Cryptocurrency",
  subtitle: "Cryptocurrencies are volatile, unregulated, decentralised and controlled almost exclusively by retail speculators. Trade the world’s newest and most exciting asset class as CFDs with an FSA regulated Forex CFD Provider.",
}

export const stocksHero = {
  title: "Stocks",
  subtitle: "Trade over +2100 large-cap Stocks CFDs across the ASX, NYSE and NASDAQ stock exchanges with superior execution and tight pricing exclusively on the Ameritrades MetaTrader 5 platform.",
}

export const futuresHero = {
  title: "Futures",
  subtitle: "Futures are one of the most popular form of CFDs. Ameritrades offer a range of Futures from around the world, including ICE Dollar Index and CBOE VIX Index. Online Futures based CFDs are offered exclusively on Ameritrades ' MetaTrader 4 & 5 Platform.",
}






//Hero Details for Company
export const whyHero = {
  title: "Why Ameritrades",
  subtitle: "",
}

export const regHero = {
  title: "Regulations",
  subtitle: "Ameritrades is authorised and regulated by multiple Regulators across the globe. Trade with peace of mind knowing that Ameritrades is monitored by some of the strictest financial regulators’ bodies in the world.",
}

export const contactHero = {
  title: "Swift Customer Service, 24/7",
  subtitle: "",
}

export const tradersHero = {
  title: "Expert Traders",
  subtitle: "The Ameritrades traders are one of the most competitive traders in the world. Making the most profit on BullCopytrade is an admirable title, getting it takes time, brains and patience. You can copy any of the traders at BullCopytrade.",
}

export const labelHero = {
  title: "White Label",
  subtitle: "Ameritrades ' white label partnership program is a complete solution giving your clients access to our market-leading liquidity and technology.",
}

export const insuranceHero = {
  title: "Client Funds Insurance up to US$1,000,000",
  subtitle: "No opt-in is required and no extra costs",
}

export const serversHero = {
  title: "Servers",
  subtitle: "Virtual Private Server (VPS) & Other Trading Servers allows traders to run automated trading strategies 24 hours a day 7 days a week with the fastest possible connectivity to the Ameritrades trading servers.",
}

export const toolsHero = {
  title: "Advance Trading",
  subtitle: "With the help of Advanced Trading Tools, the world's best trading platform is now even better, providing our traders with a competitive edge",
}







//Hero Details for More
export const pricingHero = {
  title: "Explore Packages",
  subtitle: "We've got a great experience available to our customers at the best trading conditions for minimal prices",
}

export const condHero = {
  title: "Trading Conditions",
  subtitle: "The Ameritrades Trading environment offers the most aggressive pricing and flexible trading conditions globally. They are ideal for traders who demand the best execution quality and lowest spreads.",
}

export const spreadsHero = {
  title: "Spreads",
  subtitle: "Ameritrades ’ spreads are among the lowest across all major and minor currency pairs. In particular, our average EUR/USD spread* of 0.1 pips is one of the lowest in the world.",
}

export const hoursHero = {
  title: "Trading Hours",
  subtitle: "At Ameritrades there’s always a market for you to trade. Our dedicated specialists are available for you 24 hours a day, 5 days a week.",
}

export const swapHero = {
  title: "Swap Rates",
  subtitle: "Ameritrades swap rates are amongst the most competitive in the world. Maximise your overnight swap earnings or reduce your swap costs across our wide range of products.",
}