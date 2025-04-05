import logo from "../../assets/logo2.svg"
import s from "./Login.module.css"
import { useEffect, useState } from "react"
import { ImSpinner8 } from "react-icons/im"
import { Link, useNavigate } from "react-router-dom"
import { MdVisibility } from "react-icons/md"
import { contextData } from "@/context/AuthContext"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<boolean|string>(false)
  const [loading, setLoading] = useState(false)
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;  
  const { user, login } = contextData()
  const navigate = useNavigate()

  useEffect(() => {
    if(user) return navigate('/dashboard')
  }, [])

    
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }


  const handleSubmit = async(e:any) => {
    e.preventDefault()

    if(email.length < 7) return setError("Your email must be at least 7 characters")
    if(!email.includes('@')) return setError("Invalid Email")
    if(password.length < 5) return setError("Your password must be at least 5 characters")

    setLoading(true)
    setError(false)

    try{
      // send info to server
      const res = await fetch(`${url}/users/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (res.ok) {
        login(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dashboard/')
      }
      else throw new Error(data.message)
      setLoading(false)
    } catch(err:any) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (!user &&
    <div className={s.ctn}>
      <div className={s.formWrp}>
          <Link to="/" className="w-full mb-6">
            <img className="m-auto w-40" alt="logo" src={logo} />
          </Link>

          <div className={s.formLinks}>
            <Link to="/login"  style={{borderBottom: '2px solid #031C6E'}}>Sign <span>In</span></Link>
            <Link to="/register">Sign <span>Up</span></Link>
          </div>

          <input value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} className={s.formInput} type='email' placeholder='Email' autoComplete="off"/>
          <div className={s.inputWrp}>
            {
              showPassword ?
              <input value={password} onChange={(e) => setPassword(e.target.value)} className={s.formInput} type='text' placeholder='Password' autoComplete="new-password"/>
            : <input value={password} onChange={(e) => setPassword(e.target.value)} className={s.formInput} type='password' placeholder='Password' autoComplete="new-password"/>
            }
            <MdVisibility onClick={handleShowPassword} className={s.visibility}/>
          </div>

          <button onClick={handleSubmit} className={`w-full ${s.slideAnim} bigBtn`}>{loading? <ImSpinner8 className="spin" /> : 'Sign In'}</button>

          <div className={s.formLinks}> 
            <Link className="m-auto" to="/password-reset">Forgot <span>Password?</span></Link>
          </div>
          {error && <p className={s.formError}>{error}</p>}
      </div>
    </div>
  )
}
