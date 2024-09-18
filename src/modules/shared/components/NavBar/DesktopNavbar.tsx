import React from 'react';
import { useLocation } from 'react-router-dom';
import { useGetAllCategories } from '../../../shared/api/categoryApi';
import DesktopMainNavbar from './DesktopMainNavbar';
import CategoriesNavbar from './CategoriesNavbar';
import { GetUserDto } from '@/users/types/userTypes';

interface DesktopNavbarProps {
  user?: GetUserDto;
  logout: () => void;
}

const DesktopNavbar = ({ user, logout }: DesktopNavbarProps) => {
  const location = useLocation();
  const { data, isLoading } = useGetAllCategories();

  const categories = data?.items || [];
  const isProductsPage = location.pathname.startsWith('/products');

  return (
    <nav className='z-50 bg-white'>
      <DesktopMainNavbar user={user} logout={logout} />
      {isProductsPage && (
        <CategoriesNavbar categories={categories} isLoading={isLoading} />
      )}
    </nav>
  );
};

export default DesktopNavbar;
