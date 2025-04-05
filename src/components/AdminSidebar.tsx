import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { CiGrid42 } from 'react-icons/ci';
import { PiUsersFourLight } from 'react-icons/pi';
import { CiCreditCard2 } from 'react-icons/ci';
import { PiPresentationChart } from 'react-icons/pi';
import { CiCreditCardOff } from 'react-icons/ci';
import { BsShieldPlus } from 'react-icons/bs';
import { RxChevronDown } from 'react-icons/rx';
import { HiOutlineKey } from 'react-icons/hi2';
import { CiLogout } from 'react-icons/ci';
import { contextData } from '@/context/AuthContext';
import SidebarLinkGroup from './SidebarLinkGroup';
import { CiMail } from 'react-icons/ci';
import { User } from 'lucide-react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const { logout } = contextData();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
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
      className={`text-sm absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
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
            <>
              <ul className="mb-6 flex flex-col gap-1.5">
                <li>
                  <NavLink
                    to="/admin"
                    className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                      (pathname === '/' || pathname.includes('admin')) &&
                      'bg-graydark dark:bg-meta-4'
                    }`}
                  >
                    <CiGrid42 className="text-xl" />
                    Dashboard
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/admin/trades"
                    className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4${
                      (pathname === '/' || pathname.includes('admin/trades')) &&
                      'bg-graydark dark:bg-meta-4'
                    }`}
                  >
                    <PiPresentationChart className="text-xl" />
                    Manage Trades
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/admin/trader"
                    className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4${
                      (pathname === '/' || pathname.includes('admin/trades')) &&
                      'bg-graydark dark:bg-meta-4'
                    }`}
                  >
                    <User strokeWidth={1.4} className="text-xl" />
                    Manage Trader
                  </NavLink>
                </li>

                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/' || pathname.includes('dashboard')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <>
                        <NavLink
                          to="#"
                          className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === '/' ||
                              pathname.includes('admin/users/active')) &&
                            'bg-graydark dark:bg-meta-4'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <PiUsersFourLight className="text-xl" />
                          Manage Users
                          <RxChevronDown />
                        </NavLink>
                        <div
                          className={`text-sm translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/admin/active-users"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                  (isActive && '!text-white')
                                }
                              >
                                Active Users
                              </NavLink>
                            </li>

                            <li>
                              <NavLink
                                to="/admin/banned-users"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                  (isActive && '!text-white')
                                }
                              >
                                Banned Users
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </>
                    );
                  }}
                </SidebarLinkGroup>

                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/' || pathname.includes('dashboard')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <>
                        <NavLink
                          to="#"
                          className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === '/' ||
                              pathname.includes('dashboard')) &&
                            'bg-graydark dark:bg-meta-4'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <CiCreditCard2 className="text-xl" />
                          Manage Deposits
                          <RxChevronDown />
                        </NavLink>
                        <div
                          className={`text-sm translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/admin/approved-deposits"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                  (isActive && '!text-white')
                                }
                              >
                                Approved Deposits
                              </NavLink>
                            </li>

                            <li>
                              <NavLink
                                to="/admin/pending-deposits"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                  (isActive && '!text-white')
                                }
                              >
                                Pending Deposits
                              </NavLink>
                            </li>

                            <li>
                              <NavLink
                                to="/admin/rejected-deposits"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                  (isActive && '!text-white')
                                }
                              >
                                Rejected Deposits
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </>
                    );
                  }}
                </SidebarLinkGroup>

                <SidebarLinkGroup
                  activeCondition={
                    pathname === '/' || pathname.includes('dashboard')
                  }
                >
                  {(handleClick, open) => {
                    return (
                      <>
                        <NavLink
                          to="#"
                          className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                            (pathname === '/' ||
                              pathname.includes('dashboard')) &&
                            'bg-graydark dark:bg-meta-4'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded
                              ? handleClick()
                              : setSidebarExpanded(true);
                          }}
                        >
                          <CiCreditCardOff className="text-xl" />
                          Manage Withdrawals
                          <RxChevronDown />
                        </NavLink>
                        <div
                          className={`text-sm translate transform overflow-hidden ${
                            !open && 'hidden'
                          }`}
                        >
                          <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                            <li>
                              <NavLink
                                to="/admin/pending-withdrawals"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                  (isActive && '!text-white')
                                }
                              >
                                Pending Withdrawals
                              </NavLink>
                            </li>

                            <li>
                              <NavLink
                                to="/admin/approved-withdrawals"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                  (isActive && '!text-white')
                                }
                              >
                                Approved Withdrawals
                              </NavLink>
                            </li>

                            <li>
                              <NavLink
                                to="/admin/rejected-withdrawals"
                                className={({ isActive }) =>
                                  'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                  (isActive && '!text-white')
                                }
                              >
                                Rejected Withdrawals
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </>
                    );
                  }}
                </SidebarLinkGroup>
              </ul>
            </>
          </div>
          <div>
            {
              <>
                <ul className="mb-6 flex flex-col gap-1.5">
                  <li>
                    <NavLink
                      to="/admin/sendmail"
                      className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname.includes('sendmail') &&
                        'bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      <CiMail className="text-xl" />
                      Send Mail
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/admin/kyc"
                      className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname.includes('kyc') && 'bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      <BsShieldPlus className="text-xl" />
                      Manage Kyc
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/admin/settings"
                      className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        pathname.includes('settings') &&
                        'bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      <HiOutlineKey className="text-xl" />
                      Settings
                    </NavLink>
                  </li>
                </ul>
              </>
            }

            <NavLink
              to="#"
              className={`text-sm group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4`}
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

export default AdminSidebar;
