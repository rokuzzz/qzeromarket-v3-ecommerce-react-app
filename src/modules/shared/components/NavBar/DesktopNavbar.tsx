import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { HomeIcon, InfoIcon } from '../../assets/icons/';
import { Button } from '../ui/button';
import { useUser } from '../../../users/context/userContext';
import { Role } from '../../../users/types/userTypes';

const DesktopNavbar = () => {
  const location = useLocation();
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinkClassName = (isHome: boolean, isActive: boolean) => {
    const baseClassName =
      'flex flex-row items-center font-fredoka text-xl font-semibold';
    if (isHome) {
      return isActive ||
        location.pathname.startsWith('/products/category/') ||
        location.pathname.startsWith('/search')
        ? `${baseClassName} text-black`
        : `${baseClassName} text-neutral-500 hover:text-black`;
    }
    return isActive
      ? `${baseClassName} text-black`
      : `${baseClassName} text-neutral-500 hover:text-black`;
  };

  return (
    <nav className='flex items-center justify-between px-16 xl:px-40 py-8'>
      <div className='flex-1 flex justify-start'>
        <NavLink
          to='/'
          className='font-merriweather text-2xl sm:text-3xl font-bold hover:text-amber-500 transition-colors duration-200'
        >
          QZM<span className='text-amber-500 font-merriweather'>.</span>
        </NavLink>
      </div>

      <div className='flex-1 flex justify-center space-x-4 sm:space-x-6'>
        <NavLink
          to='/'
          className={({ isActive }) => navLinkClassName(true, isActive)}
        >
          <HomeIcon />
          <span className='ml-1 hidden sm:inline'>Home</span>
        </NavLink>

        <NavLink
          to='/about'
          className={({ isActive }) => navLinkClassName(false, isActive)}
        >
          <InfoIcon />
          <span className='ml-1 hidden sm:inline'>About</span>
        </NavLink>
      </div>

      <div className='flex-1 flex justify-end items-center space-x-2'>
        {user ? (
          <>
            {user.role === Role.Admin ? (
              <Button variant={'outline'} size={'sm'} asChild>
                <Link to='/admin-dashboard'>Dashboard</Link>
              </Button>
            ) : (
              <Button variant={'default'} size={'sm'} asChild>
                <Link to='/user-profile'>Profile</Link>
              </Button>
            )}
            <Button variant={'default'} size={'sm'} onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button variant={'default'} size={'sm'} asChild>
            <Link to='/login'>Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default DesktopNavbar;
