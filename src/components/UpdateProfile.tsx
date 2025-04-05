import { contextData } from "@/context/AuthContext";
import { countries } from "@/lib/countries"
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"


export default function UpdateProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [optionalAddress, setOptionalAddress] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState<string|null>(null);
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null);
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;  
  const { login, user } = contextData()
  const navigate = useNavigate()



  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if(firstName.length < 3) return setError("First name must be at least 3 characters");
    if(lastName.length < 3) return setError("Last name must be at least 3 characters");
    if(selectedCountry === 'none' || selectedCountry === '') return setError("No country was selected");
    if(phoneNumber.length < 3) return setError("Invalid phone number");
    if(streetAddress.length < 3) return setError("Street Address must be at least 3 characters");
    if(state.length < 3) return setError("State must be at least 3 characters");
    if(city.length < 3) return setError("City must be at least 3 characters");
    if(zipCode.length < 3) return setError("Zip Code must be at least 3 characters");

    const profileData = {
      email: user.email,
      fullName: `${firstName} ${lastName}`,
      country: selectedCountry,
      phone: phoneNumber,
      address: `${streetAddress} ${optionalAddress}`,
      state, city, zipCode,
    }

    try {
      const res = await fetch(`${url}/users/update-profile`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(profileData)
      })
      const data = await res.json()

      if (res.ok) {
        login(data.user)
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard/home');
      }
      else throw new Error(data.message)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false);
      formRef.current?.reset();
    }
  }



  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-gray-800">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Profile
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Update profile details to start trading.
        </p>
      </div>

      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
          <div className="mt-2 space-y-3">
            <input value={firstName} onChange={(e) => {setFirstName(e.target.value)}} type="text" className="p-3 pe-11 block w-full border-gray-200 shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700/80 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="First Name" />
            <input value={lastName} onChange={(e) => {setLastName(e.target.value)}} type="text" className="p-3 pe-11 block w-full border-gray-200 shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700/80 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Last Name" />

            <select value={selectedCountry} onChange={(e) => {setSelectedCountry(e.target.value)}} className="p-3 pe-9 block w-full border-gray-200 shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700/80 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
              <option value="none">Country</option>
              {countries.map((country, i) => <option key={i} value={country.name}>{country.name}</option>) }
            </select>

            <input value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}} type="text" className="p-3 pe-11 block w-full border-gray-200 shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700/80 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Phone Number" />
          </div>
        </div>

        <div className="py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200 dark:border-gray-700 dark:first:border-transparent">
          <label htmlFor="af-payment-billing-address" className="inline-block text-sm font-medium dark:text-white">
            Address
          </label>

          <div className="mt-2 space-y-3">
            <input value={streetAddress} onChange={(e) => {setStreetAddress(e.target.value)}} type="text" className="p-3 pe-11 block w-full border-gray-200 shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700/80 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Street Address" />
            <input value={optionalAddress} onChange={(e) => {setOptionalAddress(e.target.value)}} type="text" className="p-3 pe-11 block w-full border-gray-200 shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700/80 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Apt, Syuite, Building (Optional)" />

            <div className="grid sm:flex gap-3">
              <input value={state} onChange={(e) => {setState(e.target.value)}} type="text" className="p-3 pe-11 block w-full border-gray-200 shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700/80 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="State" />
              <input value={city} onChange={(e) => {setCity(e.target.value)}} type="text" className="p-3 pe-11 block w-full border-gray-200 shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700/80 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="City" />
              <input value={zipCode} onChange={(e) => {setZipCode(e.target.value)}} type="text" className="p-3 pe-11 block w-full border-gray-200 shadow-sm text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-700/80 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Zip Code" />
            </div>
          </div>
        </div>
      </form>

      {error && <div className="w-full p-3 my-3 font-semibold text-sm text-red-600 bg-red-600/10 border border-red-600">{error}</div>}

      <div className="mt-5 flex justify-end gap-x-2">
        <button onClick={handleSubmit} type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
          {loading? "Loading...": 'Save changes'}
        </button>
      </div>
    </div>
  )
}
