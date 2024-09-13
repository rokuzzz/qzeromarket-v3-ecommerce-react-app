import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const Navbar = () => {
  return (
    <>
      {/* Render MobileNavBar for small screens */}
      <div className='block lg:hidden'>
        <MobileNavbar />
      </div>

      {/* Render DesktopNavBar for large screens */}
      <div className='hidden lg:block'>
        <DesktopNavbar />
      </div>
    </>
  );
};

export default Navbar;
