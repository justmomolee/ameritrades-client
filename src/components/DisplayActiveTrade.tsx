export default function DisplayActiveTrade({trades}:any) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-6 py-3 rounded-s-lg">
                      Stock
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Date
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-e-lg">
                      Status
                  </th>
              </tr>
          </thead>
          <tbody>
            {trades.length > 0 && trades.map((trade:any) =>
              <tr key={trade._id} className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {trade.tradeData.package}
                </th>
                <td className="px-6 py-4">
                    {trade.date.slice(0, 10)}
                </td>
                <td className={`px-6 py-4 font-medium ${trade.status}`}>
                    {trade.status === "success" ? "Completed" : trade.status === "pending" ? "Active" : trade.status}
                </td>
            </tr>
            )}
          </tbody>
      </table>
  </div>
  )
}
