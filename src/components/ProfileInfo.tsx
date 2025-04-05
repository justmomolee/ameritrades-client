import { contextData } from "@/context/AuthContext"
import { GiRank3 } from "react-icons/gi";

export default function ProfileInfo() {
  const { user } = contextData()

  
  return (
    <>
      <div className="px-4 pb-6 pt-20 text-center lg:pb-8 xl:pb-11.5">
        <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full shadow-2 bg-[#E2FFD7]/10 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
          <div className="relative drop-shadow-2">
            <img src={`https://robohash.org/${user._id}`} alt="Avatar" />
          </div>
        </div>
        <div className="mt-4">
          <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
            {user.fullName}
          </h3>
          <p className="font-medium flex justify-center items-center gap-2 flex-wrap">{user.username} ({user?.rank}) <GiRank3 className="text-green-500 font-semibold text-xl -mb-1"/></p>


          <div className="mx-auto max-w-180 mt-12">
          <div className="relative overflow-x-auto rounded-[6px]">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3 rounded-s-lg">
                            Profile
                        </th>
                        <th scope="col" className="px-6 py-3 rounded-s-lg">
                            Data
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Full Name
                        </th>
                        <td className="px-6 py-4">
                            {user.fullName}
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Username
                        </th>
                        <td className="px-6 py-4">
                            {user.username}
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Email
                        </th>
                        <td className="px-6 py-4">
                          {user.email}
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Rank
                        </th>
                        <td className="px-6 py-4">
                          {user?.rank}
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Address
                        </th>
                        <td className="px-6 py-4">
                          {user.address}
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            State
                        </th>
                        <td className="px-6 py-4">
                          {user.state}
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Country
                        </th>
                        <td className="px-6 py-4">
                          {user.country}
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Zip Code
                        </th>
                        <td className="px-6 py-4">
                          {user.zipCode}
                        </td>
                    </tr>
                </tbody>
                {/* <tfoot>
                    <tr className="font-semibold text-gray-900 dark:text-white">
                        <th scope="row" className="px-6 py-3 text-base">Total</th>
                        <td className="px-6 py-3">3</td>
                        <td className="px-6 py-3">21,000</td>
                    </tr>
                </tfoot> */}
            </table>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}
