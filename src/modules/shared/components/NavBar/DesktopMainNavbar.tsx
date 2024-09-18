import React from 'react';
import { NavLink } from 'react-router-dom';

import { CustomNavLink } from '../ui/CustomNavLink';
import { GetUserDto } from '../../../users/types/userTypes';
import UserMenu from './UserMenu';

interface MainNavbarProps {
  user?: GetUserDto;
  logout: () => void;
}

const DesktopMainNavbar = ({ user, logout }: MainNavbarProps) => (
  <div className='flex items-center justify-between px-16 xl:px-40 py-4'>
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
      <CustomNavLink to='/about'>About</CustomNavLink>
    </div>

    <div className='flex-1 flex justify-end items-center space-x-4'>
      <UserMenu user={user} logout={logout} />
    </div>
  </div>
);

export default DesktopMainNavbar;
