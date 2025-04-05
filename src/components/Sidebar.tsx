import { useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { LuLayoutDashboard } from 'react-icons/lu';
import { RiTokenSwapLine } from 'react-icons/ri';
import { FiUser } from 'react-icons/fi';
import { PiPresentationChart } from 'react-icons/pi';
import { TbTransform } from 'react-icons/tb';
// import { LiaUserShieldSolid } from "react-icons/lia";
import { BsShieldPlus } from 'react-icons/bs';
import { SlBadge } from 'react-icons/sl';
import { HiOutlineKey } from 'react-icons/hi2';
import { CiLogout } from 'react-icons/ci';
import { TfiGift } from 'react-icons/tfi';
import { contextData } from '@/context/AuthContext';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const { user, logout } = contextData();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      onClick={() => setSidebarOpen(false)}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="w-40" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            {user.fullName !== '' && (
              <>
                <div className="flex gap-5 pb-8 pt-3">
                  <Link
                    to="/dashboard/deposit"
                    className="w-full text-white bg-[#3475F8] hover:bg-[#114fca] font-medium rounded-lg text-sm px-5 py-2 text-center"
                  >
                    Deposit
                  </Link>
                  <Link
                    to="/dashboard/withdrawal"
                    className="w-full text-red-500 font-medium rounded-lg text-sm px-5 py-2 text-center border border-red-500"
                  >
                    Withdrawal
                  </Link>
                </div>

                <ul className="mb-6 flex flex-col gap-1.5">
                  <NavLink
                    to="/dashboard"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      (pathname === '/' || pathname.includes('dashboard')) &&
                      'bg-graydark dark:bg-meta-4'
                    }`}
                  >
                    <LuLayoutDashboard className="text-xl" />
                    Dashboard
                  </NavLink>

                  <li>
                    <NavLink
                      to="/dashboard/trades"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname.includes('trades') &&
                        'bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      <RiTokenSwapLine className="text-xl" />
                      Trades
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/liveTrades"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname.includes('liveTrades') &&
                        'bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      <PiPresentationChart className="text-xl" />
                      Watch Live Trades
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/profile"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname.includes('profile') &&
                        'bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      <FiUser className="text-xl" />
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/bonus"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname.includes('bonus') &&
                        'bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      <TfiGift className="text-xl" />
                      Bonus
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/ranking"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname.includes('ranking') &&
                        'bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      <SlBadge className="text-xl" />
                      Ranking
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/transactions"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname.includes('transactions') &&
                        'bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      <TbTransform className="text-xl" />
                      Transactions
                    </NavLink>
                  </li>
                </ul>
              </>
            )}
          </div>

          <div>
            {user.fullName !== '' && (
              <>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                  OTHERS
                </h3>
                <ul className="mb-6 flex flex-col gap-1.5">
                  {/* <li>
                  <NavLink
                    to="/dashboard/kyc"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      pathname.includes('kyc') && 'bg-graydark dark:bg-meta-4'
                    }`}
                  >
                    <LiaUserShieldSolid className='text-xl'/>
                    KYC
                  </NavLink>
                </li> */}

                  <li>
                    <NavLink
                      to="/dashboard/2fa"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname.includes('2fa') && 'bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      <BsShieldPlus className="text-xl" />
                      2FA
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/password-reset"
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname.includes('settings') &&
                        'bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      <HiOutlineKey className="text-xl" />
                      Reset Password
                    </NavLink>
                  </li>
                </ul>
              </>
            )}

            <NavLink
              to="#"
              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
              onClick={() => logout()}
            >
              <CiLogout className="text-xl" />
              Sign out
            </NavLink>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
