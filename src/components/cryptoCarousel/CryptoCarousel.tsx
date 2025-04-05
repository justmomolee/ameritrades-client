import React, { useEffect, useState } from 'react';
import s from './CryptoCarousel.module.css';

interface CryptoData {
  name: string;
  symbol: string;
  price: string;
  imageUrl: string;
}

const CryptoCarousel: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,cardano,dogecoin,chainlink,litecoin,stellar,uniswap,solana,polkadot,usd-coin,binancecoin,cosmos,internet-computer,filecoin,avalanche-2,aave,polygon,monero,tezos,tron,neo,dash,theta,fantom,vechain,bitcoin-cash,algorand,ethereum-classic,compound,shiba-inu,wrapped-bitcoin,hedera-hashgraph,huobi-token,theta-fuel,terra,maker,pancakeswap,compound-governance-token,okb,stellar,luna,elrond,near,dydx'
        );        

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data: CryptoData[] = await response.json();

        setCryptoData(
          data.map((crypto: any) => ({
            name: crypto?.name,
            symbol: crypto.symbol.toUpperCase(),
            price: `$${crypto.current_price.toFixed(2)}`,
            imageUrl: crypto.image,
          }))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);




  return (
    <section className={s.ctn} id='slide'>
      <div className={s.wrp}>
        {["1", "2", "3"].map(() => cryptoData.map((crypto, i) => (        
          <img key={i} src={crypto.imageUrl} alt={`${crypto.symbol} Logo`} />
        )))}
      </div>

      <div className={s.wrp} style={{marginLeft: "-50px", flexDirection: "row-reverse"}}>
        {["1", "2", "3"].map(() => cryptoData.map((crypto, i) => (        
          <img key={i} src={crypto.imageUrl} alt={`${crypto.symbol} Logo`} />
        )))}
      </div>
    </section>
  );
};

export default CryptoCarousel;
