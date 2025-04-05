import { contextData } from '@/context/AuthContext';
import liveTrade from '../../assets/liveTrade.gif'
import { Link } from 'react-router-dom';

export default function LiveTrades() {
  const { user } = contextData()
  
  const ctnStyles = {
    backgroundImage: `url(${liveTrade})`,
    backgroundSize: 'cover',
  };

  return (
    <div className='w-full h-screen' style={ctnStyles}>
      <div className='p-5 backdrop-blur-md w-full h-full flex items-center justify-center bg-slate-50/5'>
        <div className='w-100 max-lg:w-full p-5 !rounded-xl bg-gray-300/70 text-center'>
          <h3 className='text-2xl text-gray-800 font-medium mb-4'>Notice! Notice!! Notice!!!</h3>
          <p className='text-base text-gray-700 font-medium mb-4'>Hello {user.username}</p>
          <p className='text-base text-gray-700 font-medium mb-4'>You are not eligible to view livestream of ongoing trade. Kindly contact your trader or support.</p>
          <Link to="/dashboard" className='primaryBtn'>Back To Dashboard</Link>
        </div>
      </div>
    </div>
  )
}
