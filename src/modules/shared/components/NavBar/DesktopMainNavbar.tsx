import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import { CustomNavLink } from '../ui/CustomNavLink';
import { GetUserDto } from '../../../users/types/userTypes';
import CartSheet from '../../../cart/CartSheet';
import { useToast } from '../../../shared/hooks/use-toast';
import { Button } from '../ui/button';

interface MainNavbarProps {
  user?: GetUserDto;
  logout: () => void;
}

const DesktopMainNavbar: React.FC<MainNavbarProps> = ({ user, logout }) => {
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  return (
    <div className='flex items-center justify-between px-16 xl:px-40 py-6'>
      <div className='flex-1 flex justify-start'>
        <NavLink
          to='/'
          className='font-merriweather text-3xl font-bold hover:text-amber-500 transition-colors duration-200'
        >
          QZM<span className='text-amber-500 font-merriweather'>.</span>
        </NavLink>
      </div>

      <div className='flex-1 flex justify-center space-x-4 sm:space-x-6'>
        <CustomNavLink to='/products'>Products</CustomNavLink>
        {user && <CustomNavLink to='/user-profile'>Profile</CustomNavLink>}
      </div>

      <div className='flex-1 flex justify-end items-center space-x-4'>
        <CartSheet />
        {user ? (
          <>
            {user.role === 'Admin' && (
              <CustomNavLink to='/admin-dashboard'>Dashboard</CustomNavLink>
            )}
            <Button
              className='text-red-500 pr-0'
              variant='link'
              size='sm'
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <Button
            className='text-amber-500 font-bold'
            variant='link'
            size='sm'
            asChild
          >
            <Link to='/login'>Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default DesktopMainNavbar;
