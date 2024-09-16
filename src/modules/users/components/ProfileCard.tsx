import { AlertCircle } from 'lucide-react';

import { Card, CardContent } from '../../shared/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../shared/components/ui/avatar';
import { Button } from '../../shared/components/ui/button';
import { Skeleton } from '../../shared/components/ui/skeleton';
import { GetUserDto } from '../types/userTypes';

type ProfileCardProps = {
  user?: GetUserDto;
  isLoading: boolean;
  error?: Error | null;
  refetch: () => void;
};

const ProfileCard = ({ user, isLoading, error, refetch }: ProfileCardProps) => {
  const cardContent = () => {
    if (isLoading) {
      return (
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='flex-shrink-0'>
            <Skeleton className='w-48 h-48 rounded-lg' />
          </div>
          <div className='flex-grow flex flex-col justify-between'>
            <div className='space-y-3'>
              <Skeleton className='w-24 h-6' />
              <Skeleton className='w-64 h-10' />
              <div>
                <Skeleton className='w-16 h-4 mb-1' />
                <Skeleton className='w-48 h-6' />
              </div>
            </div>
            <div className='mt-auto'>
              <Skeleton className='w-20 h-8' />
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className='flex flex-col items-center justify-center h-48 m-0 p-[0px]'>
          <AlertCircle className='w-12 h-12 text-red-500 mb-4' />
          <p className='text-red-500 text-lg font-medium mb-4'>
            Failed to load user data.
          </p>
          <Button
            variant='outline'
            onClick={refetch}
            className='text-orange-500 border-orange-500 hover:text-orange-600 hover:bg-orange-100'
          >
            Try Again
          </Button>
        </div>
      );
    }

    if (!user) {
      return null;
    }

    return (
      <div className='flex flex-col md:flex-row gap-8'>
        <div className='flex-shrink-0'>
          <Avatar className='w-48 h-48 rounded-lg'>
            <AvatarImage
              src={`http://localhost:5169/${user.avatar}`}
              alt={`${user.firstName} ${user.lastName}`}
            />
            <AvatarFallback>
              {user.firstName}
              {user.lastName}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className='flex-grow flex flex-col justify-between'>
          <div className='space-y-3'>
            <div className='inline-block'>
              <span className='px-4 py-1 text-sm font-medium text-white bg-amber-500 rounded-sm'>
                {user.role}
              </span>
            </div>
            <h1 className='text-4xl font-semibold'>
              {user.firstName} {user.lastName}
            </h1>
            <div>
              <p className='text-sm font-normal text-gray-400'>Email</p>
              <p className='text-base font-medium leading-5 text-gray-700'>
                {user.email}
              </p>
            </div>
          </div>
          <div className='mt-auto'>
            <Button
              variant='outline'
              size='sm'
              className='px-6 text-orange-500 border-orange-500 hover:text-orange-600 hover:bg-orange-100'
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardContent className='p-8'>{cardContent()}</CardContent>
    </Card>
  );
};

export default ProfileCard;
