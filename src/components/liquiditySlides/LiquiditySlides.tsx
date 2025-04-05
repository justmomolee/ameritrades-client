import img1 from '../../assets/bankLogos/absolut.svg'
import img2 from '../../assets/bankLogos/absolute.svg'
import img3 from '../../assets/bankLogos/adca.svg'
import img4 from '../../assets/bankLogos/advance.svg'
import img5 from '../../assets/bankLogos/agf.svg'
import img6 from '../../assets/bankLogos/ak.svg'
import img7 from '../../assets/bankLogos/aleksandrovsky.svg'
import img8 from '../../assets/bankLogos/alfa.svg'
import img9 from '../../assets/bankLogos/allegiant.svg'
import img10 from '../../assets/bankLogos/ally.svg'
import img11 from '../../assets/bankLogos/bank atantic.svg'
import img12 from '../../assets/bankLogos/bank austria.svg'
import img13 from '../../assets/bankLogos/bank hofmann.svg'
import img14 from '../../assets/bankLogos/bank louisville.svg'
import img15 from '../../assets/bankLogos/bank ochrony.svg'
import img16 from '../../assets/bankLogos/bank of america.svg'
import img17 from '../../assets/bankLogos/bank of oklahoma.svg'
import img18 from '../../assets/bankLogos/bank one.svg'
import img19 from '../../assets/bankLogos/banknorth.svg'
import img20 from '../../assets/bankLogos/banksys.svg'
import img21 from '../../assets/bankLogos/barclays.svg'
import img22 from '../../assets/bankLogos/walmart.svg'
import img23 from '../../assets/bankLogos/bay.svg'
import img24 from '../../assets/bankLogos/bca.svg'
import img25 from '../../assets/bankLogos/cal.svg'
import img26 from '../../assets/bankLogos/citizens.svg'
import img27 from '../../assets/bankLogos/club.svg'
import img28 from '../../assets/bankLogos/comerica.svg'
import img29 from '../../assets/bankLogos/concierge.svg'
import img30 from '../../assets/bankLogos/dah.svg'
import img31 from '../../assets/bankLogos/daiwa.svg'
import img32 from '../../assets/bankLogos/dexia.svg'
import img33 from '../../assets/bankLogos/dime.svg'
import img34 from '../../assets/bankLogos/era.svg'
import img35 from '../../assets/bankLogos/first.svg'
import img36 from '../../assets/bankLogos/fleet.svg'
import img37 from '../../assets/bankLogos/fortis.svg'
import img38 from '../../assets/bankLogos/glacier.svg'
import img39 from '../../assets/bankLogos/hongkong.svg'
import img40 from '../../assets/bankLogos/hvb.svg'
import img41 from '../../assets/bankLogos/hypo.svg'
import img42 from '../../assets/bankLogos/invest.svg'
import img43 from '../../assets/bankLogos/key.svg'
import img44 from '../../assets/bankLogos/mdm.svg'
import img45 from '../../assets/bankLogos/mkt.svg'
import img46 from '../../assets/bankLogos/rossiysky.svg'
import img47 from '../../assets/bankLogos/royal.svg'
import img48 from '../../assets/bankLogos/st.svg'
import img49 from '../../assets/bankLogos/union.svg'
import img50 from '../../assets/bankLogos/vectra.svg'
import s from './LiquiditySlides.module.css'

const imageArray = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
  img21, img22, img23, img24, img25, img26, img27, img28, img29, img30,
  img31, img32, img33, img34, img35, img36, img37, img38, img39, img40,
  img41, img42, img43, img44, img45, img46, img47, img48, img49, img50,
];

export default function LiquiditySlides() {
  return (
    <section className={`${s.ctn} bg-gray-900 py-16`} id='slide'>
      <div className='w-full'>
        <h1 className='pl-3 text-white text-5xl max-md:text-2xl font-extrabold w-fit m-auto font-Palanquin mb-10'>Liquidity Providers</h1>
      </div>

      <div className={s.wrp1}>
        {["1", "2", "3"].map(() => imageArray.map((img, i) => (
          <div className={s.imgWrp} key={i}>
            <img src={img} alt='liquidity banks' />
          </div>
        )))}
      </div>

      <div className={s.wrp2}>
        {["1", "2", "3"].map(() => imageArray.map((img, i) => (
          <div className={s.imgWrp} key={i}>
            <img src={img} alt='liquidity banks' />
          </div>
        )))}
      </div>

      <div className={s.wrp3}>
        {["1", "2", "3"].map(() => imageArray.map((img, i) => (
          <div className={s.imgWrp} key={i}>
            <img src={img} alt='liquidity banks' />
          </div>
        )))}
      </div>
    </section>
  )
}