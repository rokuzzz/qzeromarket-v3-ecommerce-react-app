import { useLocation } from 'react-router-dom';

import { GetUserDto } from '../../../users/types/userTypes';
import { useGetAllCategories } from '../../../categories/api/categoryApi';
import DesktopMainNavbar from './DesktopMainNavbar';
import DesktopCategoriesNavbar from '../../../categories/DesktopCategoriesNavbar';

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
        <DesktopCategoriesNavbar
          categories={categories}
          isLoading={isLoading}
        />
      )}
    </nav>
  );
};

export default DesktopNavbar;
