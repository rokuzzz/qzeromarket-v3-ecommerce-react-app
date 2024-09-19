import { NavLink } from 'react-router-dom';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '../../components/ui/sheet';
import HamburgerIcon from '../../assets/icons/HamburgerIcon';
import { GetUserDto } from '../../../users/types/userTypes';
import { useToast } from '../../../shared/hooks/use-toast';

interface MobileNavbarProps {
  user?: GetUserDto;
  logout: () => void;
}

const MobileNavbar = ({ user, logout }: MobileNavbarProps) => {
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  return (
    <nav className='flex px-2 sm:px-[20px] md:px-[52px] py-4'>
      <div className='flex items-center'>
        <Sheet>
          <SheetTrigger>
            <div className='inline-flex  p-2 text-gray-700 bg-transparent border border-transparent rounded-md hover:bg-gray-100 cursor-pointer'>
              <HamburgerIcon />
            </div>
          </SheetTrigger>
          <SheetContent side='left' className='w-64 bg-white'>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Select a page to navigate.</SheetDescription>
            </SheetHeader>
            <div className='flex flex-col space-y-4 p-4'>
              <NavLink
                to='/products'
                className='text-lg text-gray-700 hover:text-black'
              >
                Products
              </NavLink>

              <NavLink
                to='/about'
                className='text-lg text-gray-700 hover:text-black'
              >
                About
              </NavLink>

              {/* Check for user's role */}
              {user ? (
                <>
                  {user.role === 'Admin' ? (
                    <NavLink
                      to='/admin-dashboard'
                      className='text-lg text-gray-700 hover:text-black'
                    >
                      Dashboard
                    </NavLink>
                  ) : (
                    <NavLink
                      to='/user-profile'
                      className='text-lg text-gray-700 hover:text-black'
                    >
                      Profile
                    </NavLink>
                  )}

                  <span
                    className='text-lg text-gray-700 hover:text-black cursor-pointer'
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                </>
              ) : (
                <NavLink
                  to='/login'
                  className='text-lg text-gray-700 hover:text-black'
                >
                  Login
                </NavLink>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className='flex-grow flex items-center justify-center'>
        <h1 className='font-merriweather text-2xl font-black'>
          QZM<span className='text-amber-500 font-merriweather'>.</span>
        </h1>
      </div>

      <div className='invisible inline-flex  p-2 text-gray-700 bg-transparent border border-transparent rounded-md hover:bg-gray-100 cursor-pointer'>
        <HamburgerIcon />
      </div>
    </nav>
  );
};

export default MobileNavbar;
