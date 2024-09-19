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
  orderCount: number;
};

const ProfileCard = ({
  user,
  isLoading,
  error,
  refetch,
  orderCount,
}: ProfileCardProps) => {
  const cardContent = () => {
    if (isLoading) {
      return (
        <div className='flex flex-col items-center md:flex-row md:items-start gap-8'>
          <div className='flex-shrink-0'>
            <Skeleton className='w-64 h-64 rounded-full md:rounded-lg' />
          </div>
          <div className='flex-grow flex flex-col justify-between items-center md:items-start text-center md:text-left w-full md:w-auto h-full'>
            <div className='space-y-4 w-full'>
              <Skeleton className='w-16 h-6 mx-auto md:mx-0' />
              <Skeleton className='w-48 h-8 md:w-64 md:h-10 mx-auto md:mx-0' />
              <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8'>
                <div className='flex flex-col'>
                  <p className='text-sm font-normal text-gray-400'>Email</p>
                  <Skeleton className='w-48 h-4 mx-auto md:mx-0 mt-1' />
                </div>
                <div className='flex flex-col'>
                  <p className='text-sm font-normal text-gray-400'>Orders</p>
                  <Skeleton className='w-24 h-4 mx-auto md:mx-0 mt-1' />
                </div>
              </div>
            </div>
            <div className='mt-auto pt-4 w-full md:text-left'>
              <Skeleton className='w-24 h-8' />
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className='flex flex-col items-center justify-center h-48 m-0 p-0'>
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
        </div>
      );
    }

    if (!user) {
      return null;
    }

    return (
      <div className='flex flex-col items-center md:flex-row md:items-start gap-8'>
        <div className='flex-shrink-0'>
          <Avatar className='w-64 h-64 md:rounded-lg'>
            <AvatarImage
              src={`http://localhost:5169/${user.avatar}`}
              alt={`${user.firstName} ${user.lastName}`}
            />
            <AvatarFallback>
              {user.firstName[0]}
              {user.lastName[0]}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className='flex-grow flex flex-col justify-between items-center md:items-start text-center md:text-left h-full'>
          <div className='space-y-4 w-full'>
            <div className='inline-block'>
              <span className='px-3 py-1 text-xs md:text-sm font-medium text-white bg-amber-500 rounded-sm'>
                {user.role}
              </span>
            </div>
            <h1 className='text-2xl md:text-4xl font-semibold'>
              {user.firstName} {user.lastName}
            </h1>
            <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8'>
              <div className='flex flex-col'>
                <p className='text-sm font-normal text-gray-400'>Email</p>
                <p className='text-base font-medium leading-5 text-gray-700'>
                  {user.email}
                </p>
              </div>
              <div className='flex flex-col'>
                <p className='text-sm font-normal text-gray-400'>Orders</p>
                <p className='text-base font-medium leading-5 text-gray-700'>
                  {orderCount}
                </p>
              </div>
            </div>
          </div>
          <div className='mt-auto pt-4 w-full md:text-left self-end'>
            {' '}
            {/* Ensuring the button is at the end */}
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
    <div className='pt-4'>
      <h2 className='text-2xl font-bold mb-4'>User Profile</h2>
      <Card className='w-full bg-white shadow-xl border border-gray-200 rounded-lg overflow-hidden'>
        <CardContent className='p-4 sm:p-8'>{cardContent()}</CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
