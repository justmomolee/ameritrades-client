import { Fragment, useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  CursorArrowRaysIcon,
} from '@heroicons/react/20/solid';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { MenuGroup, menuItems } from '@/lib/utils';
import { PiUserLight } from 'react-icons/pi';
import { contextData } from '@/context/AuthContext';

function MenuList({ items }: { items: MenuGroup[] }) {
  const handleNavbg = () => {
    const nav = document.getElementById('navBar');
    if (nav) {
      if (window.scrollY >= 500) nav.style.backgroundColor = 'rgb(17 24 39)';
      else {
        nav.style.backgroundColor = '';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleNavbg);
  }, []);

  return (
    <div className={`lg:flex lg:items-center gap-3`}>
      {items.map((listItem, i) => (
        <Popover className="relative" key={i}>
          {listItem.items.length > 0 ? (
            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-100">
              <span>{listItem.name}</span>
              <ChevronDownIcon className="hidden lg:flex h-5 w-5" />
            </Popover.Button>
          ) : (
            <Link
              to={listItem.href}
              className="inline-flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-100"
            >
              <span>{listItem.name}</span>
            </Link>
          )}

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
              <div className="w-screen max-w-sm flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {listItem.items.map((item, i) => (
                    <div
                      key={i}
                      className="group relative flex items-center gap-x-8 rounded-lg p-3 hover:bg-gray-50"
                    >
                      <div className="mt-1 flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-gray-50">
                        <CursorArrowRaysIcon className="h-3 w-3 text-gray-600 group-hover:text-indigo-600" />
                      </div>
                      <div>
                        <Link
                          to={item.href}
                          className="font-medium text-gray-900"
                        >
                          {item.name} <span className="absolute inset-0" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = contextData();

  const dashboard = [{ name: 'Dashboard', items: [], href: '/dashboard' }];

  const auth = [
    { name: 'Login', items: [], href: '/login' },
    { name: 'Register', items: [], href: '/register' },
  ];

  return (
    <header
      className="fixed w-full top-0 left-0 z-40 backdrop-blur-md"
      id="navBar"
    >
      <nav className="max-ctn flex items-center justify-between p-5">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <img className="w-40" src={logo} alt="logo" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop Menu */}
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <MenuList items={menuItems} />
        </Popover.Group>

        {user ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-6">
            <Link
              to="/dashboard"
              className="border border-white/20 px-4 py-2 !rounded-lg text-sm font-medium text-gray-100 flex items-center gap-2"
            >
              Dashboard{' '}
              <span className="ml-3">
                <PiUserLight />
              </span>
            </Link>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-6">
            <Link
              to="/register"
              className="border border-white/20 px-4 py-2 !rounded-lg text-sm font-medium text-gray-100 flex items-center gap-2"
            >
              Register{' '}
              <span className="ml-3">
                <PiUserLight />
              </span>
            </Link>

            <Link
              to="/login"
              className="text-sm font-medium leading-6 text-gray-100"
            >
              Log in{' '}
              <span className="ml-3" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Menu Dialog */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-10"></div>
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img className="h-8 w-auto mb-5" src={logo} alt="logo" />
            </Link>

            <button
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <MenuList items={menuItems} />
          {user && <MenuList items={dashboard} />}
          {!user && <MenuList items={auth} />}
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
