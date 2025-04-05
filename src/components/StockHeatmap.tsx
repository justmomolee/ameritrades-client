import { useEffect, useRef, memo, FC } from 'react';

const StockHeatmap: FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "exchanges": [],
        "dataSource": "SPX500",
        "grouping": "sector",
        "blockSize": "market_cap_basic",
        "blockColor": "change|60",
        "locale": "en",
        "symbolUrl": "",
        "colorTheme": "dark",
        "hasTopBar": true,
        "isDataSetEnabled": true,
        "isZoomEnabled": true,
        "hasSymbolTooltip": true,
        "width": "100%",
        "height": "100%"
      }`;

  
      if (container.current) {
        container.current.innerHTML = "";
        container.current.appendChild(script);
      }
  }, []);

  return (
    <section className='h-[600px]'>
      <div className="tradingview-widget-container m-auto max-ctn rounded-xl overflow-hidden" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </section>
  );
};

export default memo(StockHeatmap);