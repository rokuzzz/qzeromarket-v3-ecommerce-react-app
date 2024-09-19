import { Link } from 'react-router-dom';

import { Button } from '../ui/button';
import { GetUserDto } from '../../../users/types/userTypes';
import { CustomNavLink } from '../ui/CustomNavLink';
import { useToast } from '../../../shared/hooks/use-toast';

interface UserMenuProps {
  user?: GetUserDto;
  logout: () => void;
}

const UserMenu = ({ user, logout }: UserMenuProps) => {
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  if (user) {
    return (
      <>
        {user.role === 'Admin' ? (
          <Button variant={'default'} size={'sm'} asChild>
            <Link to='/admin-dashboard'>Dashboard</Link>
          </Button>
        ) : (
          <CustomNavLink to='/user-profile'>Profile</CustomNavLink>
        )}
        <Button
          className='text-red-500 pr-0'
          variant={'link'}
          size={'sm'}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </>
    );
  }

  return (
    <Button className='text-amber-500 font-bold' variant={'link'} size={'sm'} asChild>
      <Link to='/login'>Login</Link>
    </Button>
  );
};

export default UserMenu;
