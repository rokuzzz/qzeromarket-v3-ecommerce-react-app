import { useState } from 'react';
import { AlertCircle, Edit } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../shared/components/ui/card';
import { Button } from '../../shared/components/ui/button';
import { GetUserDto } from '../types/userTypes';
import EditProfileDialog from './EditProfileDialog';
import UserProfileContainerSkeleton from './UserProfileContainerSkeleton';
import UserInfoCard from './UserInfoCard';
import OrderList from './OrderList';
import { ApiError } from '../../shared/types/sharedTypes';

interface UserProfileContainerProps {
  user?: GetUserDto;
  orders?: any[];
  isLoading: boolean;
  error: Error | ApiError | null;
  refetch: () => void;
}

const UserProfileContainer = ({
  user,
  orders,
  isLoading,
  error,
  refetch,
}: UserProfileContainerProps) => {
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
    refetch();
  };

  if (isLoading) {
    return <UserProfileContainerSkeleton />;
  }

  if (error) {
    return (
      <Card>
        <CardContent className='flex flex-col items-center justify-center h-48 m-0 p-0'>
          <AlertCircle className='w-12 h-12 text-red-500 mb-4' />
          <p className='text-red-500 text-lg font-medium mb-4 text-center'>
            Failed to load user data.
          </p>
          <Button
            variant='outline'
            onClick={refetch}
            className='text-orange-500 border-orange-500 hover:text-orange-600 hover:bg-orange-100'
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!user || !orders) {
    return null;
  }

  return (
    <Card className='m-5 sm:m-0'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 mb-4 pb-2'>
        <CardTitle className='text-2xl font-bold'>User Profile</CardTitle>
        <Button variant='outline' size='icon' onClick={handleEditClick}>
          <Edit className='h-4 w-4' />
          <span className='sr-only'>Edit profile</span>
        </Button>
      </CardHeader>
      <CardContent>
        <UserInfoCard user={user} />
        <OrderList orders={orders} />
      </CardContent>

      <EditProfileDialog
        isOpen={isEditDialogOpen}
        onClose={handleDialogClose}
        user={user}
        refetchUser={refetch}
      />
    </Card>
  );
};

export default UserProfileContainer;
