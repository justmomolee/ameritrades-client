
export default function TradeCounter({ trades }: any) {
  const totalAmount = trades.reduce((sum:number, trade:any) => sum + trade.amount, 0)


  return ((trades && trades.length > 0) &&
    <div className="w-full max-w-4xl flex flex-col gap-4 mt-15">
      <div className="w-full flex justify-between text-xl font-medium text-gray-900 dark:text-gray-50">
        <h3>Trades</h3>
        <h3>
          Total  {totalAmount}
          <span className='text-xs font-normal'> $</span>
        </h3>
      </div>
      {trades.map((trade: any) => (
        <div className="w-full rounded-[15px] p-5 shadow-1 bg-gray-50 dark:bg-gray-800" key={trade._id}>
          <div className="w-full flex justify-between mb-2 text-sm">
            <p>     
               {new Date(trade.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })}
            </p>
            <p>{trade.amount} <span className='text-[10px]'>USD</span></p>
          </div>


          <div>
            <div className='w-full h-[5px] bg-gray-600/5 !rounded-xl overflow-hidden'>
              <div style={{ background: "linear-gradient(90deg, #c3d100 0%, #00B35F 3%, #00ff88 90%)", 
                width: `${trade.status === 'pending'? "20":"100"}%`}}
                className='h-full !rounded-xl'
                />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}




