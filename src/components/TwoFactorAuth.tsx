import { useEffect, useState } from 'react'
import dummyQr from '../assets/dummyQr.png'
import authImg from '../assets/authMFA.png'
import { contextData } from '@/context/AuthContext'
import s from '../pages/login/Login.module.css'

export default function TwoFactorAuth() {
  const [qrCodeSrc, setQrCodeSrc] = useState<null|string>(null)
  const [token, setToken] = useState("")
  const [secret, setSecret] = useState("")
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const { user } = contextData()

  const fetchQrCode = async () => {
    try {
      const res = await fetch(`${url}/users/getQrCode`)
      const data = await res.json()

      if(res.ok) {
        setQrCodeSrc(data.imgSrc) 
        setSecret(data.secret.ascii)
      }else throw new Error(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const sendToken = async (e: any) => {
    e.preventDefault()
    setError('')

    if(token.length < 6) return setError("Invalid token")
    setLoading(true)
    setSuccess(false)

    try {
      const res = await fetch(`${url}/users/verifyToken`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email: user.email, token, secret })
      })
      const data = await res.json()
      console.log(data)

      if(res.ok) setSuccess(data.message) 
      else throw new Error(data.message)
    } catch (error: any) {
      setError(error.message)
    } finally{
      setLoading(false)
      setToken("")
    }
  }

useEffect(() => {
  fetchQrCode()
  }, [])


  return (
    <div className="w-full flex justify-center items-center gap-10 my-4 max-[900px]:flex-col">
      {!user.mfa ?
      <>
      <div className="flex-none">
        <img src={qrCodeSrc? qrCodeSrc : dummyQr} alt='qrcode' className='rounded-xl' width={250}/>
      </div>
      <div className="flex-auto shadow-1">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" action="#" onSubmit={sendToken}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Enter the six digit code</h5>
            <div>
              <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Otp</label>
              <input onChange={(e) => setToken(e.target.value)} value={token} type="text" id="otp" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="******" required/>
            </div>
            <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading? "Loading...": "Submit code"}</button>
            {error && <p className={s.formError}>{error}</p>}
            {success && <p className={s.formSuccess}>{success}</p>}
          </form>
        </div>
      </div>
      </> :

      <img src={authImg} alt='auth image' className='w-full max-w-100'/>
      }
    </div>
  )
}

