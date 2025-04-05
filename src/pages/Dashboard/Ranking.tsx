import welcome from '../../assets/ranks/welcome.png'
import silver from '../../assets/ranks/silver.png'
import silverPro from '../../assets/ranks/silverPro.png'
import gold from '../../assets/ranks/gold.png'
import goldPro from '../../assets/ranks/goldPro.png'
import diamond from '../../assets/ranks/diamond.png'
import ambassador from '../../assets/ranks/ambassador.png'
import Rank from '@/components/Rank'



const welcomeData = {
  level: 1,
  minimumDeposit: 0,
  directReferral: 0,
  referralDeposits: 0,
  bonus: 0,
}

const silverData = {
  level: 2,
  minimumDeposit: 5000,
  directReferral: 0,
  referralDeposits: 0,
  bonus: 200,
}

const silverProData = {
  level: 3,
  minimumDeposit: 25000,
  directReferral: 0,
  referralDeposits: 0,
  bonus: 1000,
}

const goldData = {
  level: 4,
  minimumDeposit: 50000,
  directReferral: 0,
  referralDeposits: 0,
  bonus: 2000,
}

const goldProData = {
  level: 5,
  minimumDeposit: 100000,
  directReferral: 0,
  referralDeposits: 0,
  bonus: 3000,
}

const diamondData = {
  level: 6,
  minimumDeposit: 500000,
  directReferral: 12,
  referralDeposits: 2550000,
  bonus: 20000,
}

const ambassadorData = {
  level: 7,
  minimumDeposit: 1000000,
  directReferral: 12,
  referralDeposits: 2550000,
  bonus: 50000,
}


export default function Ranking() {
  return (
    <div className="flex items-center justify-center flex-wrap gap-14 p-5 mb-4 rounded-[40px] bg-gray-50 dark:bg-gray-800">
      <Rank imageSrc={welcome} rank="welcome" moreInfo={welcomeData}/>
      <Rank imageSrc={silver} rank="silver" moreInfo={silverData}/>
      <Rank imageSrc={silverPro} rank="silver pro" moreInfo={silverProData}/>
      <Rank imageSrc={gold} rank="gold" moreInfo={goldData}/>
      <Rank imageSrc={goldPro} rank="gold pro" moreInfo={goldProData}/>
      <Rank imageSrc={diamond} rank="diamond" moreInfo={diamondData}/>
      <Rank imageSrc={ambassador} rank="ambassador" moreInfo={ambassadorData}/>
    </div>
  )
}
