import { contextData } from "@/context/AuthContext";

export default function MiniBals() {
  const { user } = contextData();



  
  return (
    <div className="grid grid-cols-3 max-lg:grid-cols-1 gap-4 mb-4">
    <div className="flex flex-col gap-2 p-5 !rounded-[10px] bg-gray-50 dark:bg-gray-800 border-l border-l-lime-300">
        <p className="text-base font-medium text-gray-400 dark:text-gray-500">
          Deposit
        </p>

        <h2 className="text-3xl font-medium text-gray-700 dark:text-[#f0fff8]">
          {user?.deposit?.toLocaleString('en-US')}
          <span className="font-[Courier] font-normal text-lg">$</span>
        </h2>
    </div>

    <div className="flex flex-col gap-2 p-5 !rounded-[10px] bg-gray-50 dark:bg-gray-800 border-l border-l-sky-300">
        <p className="text-base font-medium text-gray-400 dark:text-gray-500">
          Interest
        </p>

        <h2 className="text-3xl font-medium text-gray-700 dark:text-[#f0fff8]">
          {user?.interest?.toLocaleString('en-US')}
          <span className="font-[Courier] font-normal text-lg">$</span>
        </h2>
    </div>

    <div className="flex flex-col gap-2 p-5 !rounded-[10px] bg-gray-50 dark:bg-gray-800 border-l border-l-rose-500">
        <p className="text-base font-medium text-gray-400 dark:text-gray-500">
          Withdrawal
        </p>

        <h2 className="text-3xl font-medium text-gray-700 dark:text-[#f0fff8]">
          {user?.withdraw?.toLocaleString('en-US')}
          <span className="font-[Courier] font-normal text-lg">$</span>
        </h2>
    </div>
  </div>
  )
}
