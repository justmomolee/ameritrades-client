import { useEffect } from 'react';

export default function UsdChart() {
  useEffect(() => {
    const script = document.createElement('script')
    const chartDiv = document.getElementById('cryptochart')
    
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js"
    script.type = 'text/javascript'
    script.async = true
    
    const loadscript = {
      "symbol": "NASDAQ:TSLA",
      "width": "100%",
      "height": "100%",
      "locale": "en",
      "dateRange": "1m",
      "colorTheme": "dark",
      "isTransparent": true,
      "autosize": true,
      "largeChartUrl": ""
    }
    
    script.innerHTML = JSON.stringify(loadscript)
    if (chartDiv && !chartDiv.hasChildNodes()) {
      chartDiv.appendChild(script);
    }
  }, [])



  return (
    <div className="w-full max-w-2xl h-[200px] px-5 bg-gray-50 dark:bg-[#273342] rounded-[25px]">
      <div className="tradingview-widget-container__widget" id='cryptochart'>
      </div>
    </div>
  )
}



