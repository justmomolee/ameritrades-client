import { useState } from "react"
import { ImSpinner8 } from "react-icons/im"
import { useNavigate } from "react-router-dom"
import { contextData } from "../context/AuthContext"
import s from '../pages/register/Register.module.css'

export default function Otp({ email, password, username, referredBy }: 
  {email: string, password: string, username: string, referredBy: string}) {

  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const [error, setError] = useState<string|null>('')
  const [success, setSuccess] = useState<string|null>(null)
  const [loading, setLoading] = useState(false)
  const { login } = contextData()
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;
  


  const handleChange = (e:any) => {
    setOtp(e.target.value)
  }

  const handleResendOtp = async(e:any) => {
    e.preventDefault()
    setSuccess(null)
    setError(null)

    try{
      const res = await fetch(`${url}/users/resend-otp`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email })
      })

      const data = await res.json()

      if (res.ok) setSuccess("Successfully Sent!")
      else throw new Error(data.message)
    } catch(err:any) { setError(err.message) }

    setTimeout(() =>{
      setSuccess(null)
    }, 3000)
  }



  const handleSubmit = async(e:any) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try{
      const res = await fetch(`${url}/users/otp/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ code: otp, email, password, username, referredBy})
      })

      const data = await res.json()

      if (res.ok) {
        login(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dashboard/')
      } else {
        throw new Error(data.message)
      }
      
    } catch(err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }



  return (
    <div className={s.ctn}>
      <div className={s.formWrp}>
        <h1 className={s.formTitle}>Enter Code</h1>
          <input value={otp} onChange={handleChange} className={s.formInput} type='text' placeholder='* * * * * *'/>
          
          <button onClick={handleSubmit} className={`${s.formBtn} ${s.slideAnim} bigBtn`}>{loading? <ImSpinner8 className={s.spin} /> : 'Send Code'}</button>
          {error && <p className={s.formError}>{error}</p>}
          {success && <p className={s.formSuccess}>{success}</p>}

          <div className={s.formLinks}> 
            <p style={{width: "100%"}} onClick={handleResendOtp}>Resend <span>OTP</span></p>
          </div>
      </div>
    </div>
  )
}
