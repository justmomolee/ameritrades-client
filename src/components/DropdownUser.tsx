import { contextData } from '@/context/AuthContext';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from 'react-icons/ci';
import { FiUser } from "react-icons/fi";


const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = contextData()

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (user?.fullName !== ""  &&
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          {!user?.isAdmin && <span className="block text-sm font-medium text-black dark:text-white">
            {user?.fullName}
          </span>}
          <span className="block text-xs">{user?.username}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
        <img className="w-10 h-10 rounded-full bg-[#E2FFD7]/10" src={`https://robohash.org/${user?._id}`} alt="Avatar" />
        </span>

        <svg
          className={`hidden fill-current sm:block ${
            dropdownOpen ? 'rotate-180' : ''
          }`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
          {!user?.isAdmin &&
            <Link
              to="/dashboard/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <FiUser className="text-xl"/>
              My Profile
            </Link>
          }

          {user?.isAdmin &&
            <Link
              to="/admin/active-users"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <FiUser className="text-xl"/>
              All Users
            </Link>
          }
          </li>

          <li>
            <Link
              to={`${user?.isAdmin ? "/admin/settings" : "/dashboard/settings"}`}
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <IoSettingsOutline className="text-2xl" />
              Account Settings
            </Link>
          </li>
        </ul>
        <button onClick={logout} className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
          <CiLogout className='text-xl'/>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DropdownUser;
