import { countries } from "@/lib/countries";
import { useEffect, useState } from "react";
import s from "../pages/login/Login.module.css"
import { useNavigate } from "react-router-dom";
import { contextData } from "@/context/AuthContext";

export default function EditUserModal({userData, handleUserData}:any) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [deposit, setDeposit] = useState(0);
  const [interest, setInterest] = useState(0);
  const [trade, setTrade] = useState(0);
  const [bonus, setBonus] = useState(0);
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { login } = contextData()
  const navigate = useNavigate()
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;  

  useEffect(() => {
    setFullName(userData.fullName); setEmail(userData.email); setSelectedCountry(userData.country);
    setPhoneNumber(userData.phone); setAddress(userData.address); setCity(userData.city); 
    setState(userData.state); setZipCode(userData.zipCode);  setDeposit(userData.deposit); 
    setInterest(userData.interest); setTrade(userData.trade); setBonus(userData.bonus);
  }, [])



  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError(null);

    if(fullName.length < 3) return setError("Full name must be at least 3 characters");
    if(email.length < 7) return setError("Email must be at least 7 characters");
    if(selectedCountry === 'none' || selectedCountry === '') return setError("No country was selected");
    if(phoneNumber.length < 3) return setError("Invalid phone number");
    if(address.length < 3) return setError("Address must be at least 3 characters");
    if(state.length < 3) return setError("State must be at least 3 characters");
    if(city.length < 3) return setError("City must be at least 3 characters");
    if(zipCode.length < 3) return setError("Zip Code must be at least 3 characters");

    const profileData = {
      email, fullName,
      country: selectedCountry,
      phone: phoneNumber,
      address, state, city, zipCode,
      deposit, interest, trade, bonus
    }


    try {
      setLoading(true);
      const res = await fetch(`${url}/users/update-profile`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(profileData)
      })
      const data = await res.json()

      if (res.ok) setSuccess(true)
      else throw new Error(data.message)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false);
    }
  }

  const loginAsUser = () => {
    login(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    navigate('/dashboard/')
  }



  return (
      <div className="bg-black/30 backdrop-blur-md fixed top-0 left-0 right-0  z-9999 flex items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen max-h-full">
        <div className="relative w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <form onSubmit={handleSubmit} className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                {/* <!-- Modal header --> */}
                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Edit user
                    </h3>
                   <button onClick={()=> handleUserData(null)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                </div>

                {/* <!-- Modal body --> */}
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="full-name" className="editUserLabel">Full Name</label>
                            <input value={fullName} onChange={(e) => setFullName(e.target.value)} type="text" id="full-name" className="editUserInput" placeholder={userData.fullName} required />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="email" className="editUserLabel">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="editUserInput" placeholder={userData.email} required />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="country" className="editUserLabel">Country</label>
                            <select id="country" value={selectedCountry} onChange={(e) => {setSelectedCountry(e.target.value)}} className="editUserInput">
                              <option value="none">{userData.country}</option>
                              {countries.map((country, i) => <option key={i} value={country.name}>{country.name}</option>) }
                            </select>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="phone-number" className="editUserLabel">Phone Number</label>
                            <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" id="phone-number" className="editUserInput" placeholder={userData.phone} required />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="address" className="editUserLabel">Address</label>
                            <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" name="address" id="address" className="editUserInput" placeholder={userData.address} required />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="state" className="editUserLabel">State</label>
                            <input value={state} onChange={(e) => setState(e.target.value)} type="text" id="state" className="editUserInput" placeholder={userData.state} required />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="city" className="editUserLabel">City</label>
                            <input value={city} onChange={(e) => setCity(e.target.value)} type="text" id="city" className="editUserInput" placeholder={userData.city} required />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="zipCode" className="editUserLabel">Zip Code</label>
                            <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} type="text" id="zipCode" className="editUserInput" placeholder={userData.zipCode} required />
                        </div>

                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="deposit" className="editUserLabel">Deposit</label>
                            <input value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} type="number" id="deposit" className="editUserInput" placeholder={userData.deposit} required min={0}/>
                        </div>

                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="interest" className="editUserLabel">Interest</label>
                            <input value={interest} onChange={(e) => setInterest(Number(e.target.value))} type="number" id="interest" className="editUserInput" placeholder={userData.interest} required min={0}/>
                        </div>

                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="trade" className="editUserLabel">Trade</label>
                            <input value={trade} onChange={(e) => setTrade(Number(e.target.value))} type="number" id="trade" className="editUserInput" placeholder={userData.trade} required min={0}/>
                        </div>

                        <div className="col-span-3 sm:col-span-2">
                            <label htmlFor="bonus" className="editUserLabel">Bonus</label>
                            <input value={bonus} onChange={(e) => setBonus(Number(e.target.value))} type="number" id="bonus" className="editUserInput" placeholder={userData.bonus} required min={0}/>
                        </div>

                    </div>
                    {error && <p className={s.formError}>{error}</p>}
                    {success && <p className={s.formSuccess}>User Updated SuccessFully...</p>}
                </div>

                {/* <!-- Modal footer --> */}
                <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? "Saving..." : "Save all"}</button>

                    <a href="#" onClick={loginAsUser} className="text-white bg-gray-900 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-200 dark:text-gray-800">Login as user</a>
                </div>
            </form>
        </div>
    </div>
  )
}
