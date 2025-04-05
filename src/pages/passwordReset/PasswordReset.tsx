import logo from '../../assets/logo2.svg';
import s from './PasswordReset.module.css';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ImSpinner8 } from 'react-icons/im';

export default function PasswordReset() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { page } = useParams();
  const url = import.meta.env.VITE_REACT_APP_SERVER_URL;

  const handleReset = async (e: any) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (email === '' || !email.includes('@') || email.length < 5)
      return setError('Email is invalid');

    try {
      setLoading(true);
      const res = await fetch(`${url}/users/reset-password/${email}`);
      const data = await res.json();

      if (res.ok) setSuccess(data.message);
      else throw new Error(data.message);
    } catch (error: any) {
      setError(error.message);
      console.log('Custom Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  // handling new password
  const handleNewPassword = async (e: any) => {
    e.preventDefault();

    if (email === '' || !email.includes('@') || email.length < 7)
      return setError('Email is invalid');
    if (newPassword === '' || newPassword.length < 5)
      return setError('password is invalid');

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${url}/users/new-password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setLoading(false);
        setSuccess('Password Changed Successfully, Login to continue');
      } else throw new Error(data.message);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className={s.ctn}>
      {page === 'newPassword' ? (
        <form className={s.ctn} onSubmit={handleNewPassword}>
          <div className={s.formWrp}>
            <Link to="/" className="w-full mb-6">
              <img className="m-auto w-40" alt="logo" src={logo} />
            </Link>

            <h1 className={s.formTitle} style={{ fontSize: '1.2rem' }}>
              Enter Email & New Password!
            </h1>
            <input
              className={s.formInput}
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
            <input
              className={s.formInput}
              value={newPassword}
              placeholder="Password"
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button
              onClick={handleNewPassword}
              disabled={loading}
              className={`w-full ${s.slideAnim} bigBtn`}
            >
              {loading ? <ImSpinner8 className={s.spin} /> : 'Reset'}
            </button>
            {error && <p className={s.formError}>{error}</p>}
            {success && <p className={s.formSuccess}>{success}</p>}
            <div className={s.formLinks}>
              <Link style={{ width: '100%' }} to="/login" className={s.link}>
                Back to <span>Login?</span>
              </Link>
            </div>
          </div>
        </form>
      ) : (
        <form className={s.formCtn} onSubmit={handleReset}>
          <div className={s.formWrp}>
            <Link to="/" className="w-full mb-6">
              <img className="m-auto" alt="logo" src={logo} />
            </Link>

            <h1 className={s.formTitle}>Reset Password</h1>
            <input
              className={s.formInput}
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />

            <button
              onClick={handleReset}
              disabled={loading}
              className={`w-full ${s.slideAnim} bigBtn`}
            >
              {loading ? <ImSpinner8 className={s.spin} /> : 'Send Mail'}
            </button>
            {error && <p className={s.formError}>{error}</p>}
            {success && <p className={s.formSuccess}>{success}</p>}
            <div className={s.formLinks}>
              <Link style={{ width: '100%' }} to="/login" className={s.link}>
                Back to <span>Login?</span>
              </Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
