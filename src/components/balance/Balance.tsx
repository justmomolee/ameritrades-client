import s from './Balance.module.css'
import { Link } from 'react-router-dom'



interface BalanceProps {
  type: string;
  user: {
    deposit: number;
    interest: number;
    trade: number;
    bonus: number;
    card: string;
    username: string;
  };
}

export default function Balance({type, user}: BalanceProps) {

    
  const handleCopy = async (textToCopy:string) => {
    try {
      await navigator.clipboard.writeText(`https://ameritradesbrokers.com/register/${textToCopy}`);
      alert('Text copied to clipboard');
    } catch (err) {
      console.log('Failed to copy text: ', err);
    }
  };


  return (
    <div className={s.ctn}>
      <div className={s.wrp}>
        <div className={s.left}>
          <p className={s.title}>Total Balance</p>
          <h1 className={s.bal}>{
            type === "balance"? (user?.deposit + user?.interest)?.toLocaleString('en-US')
            : type === "trade"? (user?.deposit + user?.interest)?.toLocaleString('en-US')
              : type === "bonus"? user?.bonus?.toLocaleString('en-US') : 0}<span>$</span>
          </h1>

          <Link to="/dashboard/withdrawal" className={s.btn}> Withdraw </Link>

        </div>
        <div className={s.right}>
          <div className='flex gap-2'>
            <h3 className={s.miniBal}>
              <span className='text-[8px] text-gray-400 font-extralight'>Deposit</span>
              <span>{user?.deposit?.toLocaleString('en-US')}<span className="font-[Courier] text-[8px]">$</span></span>
            </h3>

            <h3 className={s.miniBal}>
              <span className='text-[8px] text-gray-400 font-thin'>Interest</span>
              <span>{user?.interest?.toLocaleString('en-US')}<span className="font-[Courier] text-[8px]">$</span></span>
            </h3>
          </div>

          <img src="/fav.svg" alt='logo' className="w-6" />

          {type === "bonus" ? 
          <div className={s.btn} onClick={() => handleCopy(user.username)}>Copy Referral Code</div> : 
          <Link to="/dashboard/deposit" className={s.btn}>+ Add Fund </Link>
          }
        </div>
      </div>

    </div>
  )
}
