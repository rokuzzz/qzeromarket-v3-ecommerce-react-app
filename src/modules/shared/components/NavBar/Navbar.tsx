import { useUser } from '../../../users/context/userContext';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const Navbar = () => {
  const { user, logout } = useUser();

  return (
    <>
      {/* Render MobileNavBar for small screens */}
      <div className='block lg:hidden'>
        <MobileNavbar />
      </div>

      {/* Render DesktopNavBar for large screens */}
      <div className='hidden lg:block'>
        <DesktopNavbar user={user} logout={logout} />
      </div>
    </>
  );
};

export default Navbar;
