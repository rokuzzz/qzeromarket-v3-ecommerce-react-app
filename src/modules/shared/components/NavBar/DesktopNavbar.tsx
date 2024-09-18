import { useLocation } from 'react-router-dom';
import { useUser } from '../../../users/context/userContext';
import { useGetAllCategories } from '../../../shared/api/categoryApi';
import DesktopMainNavbar from './DesktopMainNavbar';
import CategoriesNavbar from './CategoriesNavbar';

const DesktopNavbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useUser();
  const { data } = useGetAllCategories();

  const categories = data?.items || [];
  const isProductsPage = location.pathname.startsWith('/products');

  return (
    <nav className='z-50 bg-white'>
      <DesktopMainNavbar user={user} logout={logout} />
      {isProductsPage && categories.length > 0 && (
        <CategoriesNavbar categories={categories} />
      )}
    </nav>
  );
};

export default DesktopNavbar;
