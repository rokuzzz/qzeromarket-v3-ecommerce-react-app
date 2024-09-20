import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../shared/components/ui/card';
import { Skeleton } from '../../shared/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../shared/components/ui/table';

const UserProfileContainerSkeleton = () => {
  return (
    <Card className='m-5 sm:m-0'>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 mb-4 pb-2'>
        <CardTitle className='text-2xl font-bold'>User Profile</CardTitle>
        <Skeleton className='h-10 w-10 rounded-md' />
      </CardHeader>
      <CardContent>
        <div className='flex items-center space-x-4 mb-6'>
          <Skeleton className='h-20 w-20 rounded-full' />
          <div className='space-y-2'>
            <Skeleton className='h-6 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
        <div className='space-y-4'>
          <h3 className='text-xl font-semibold'>X Orders</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className='h-5 w-[64px]' />
                  </TableCell>
                  <TableCell className='md:pr-16'>
                    <Skeleton className='h-5 w-[100px] sm:w-[250px] md:w-[350px] lg:w-[600px] xl:w-[700px]' />
                  </TableCell>
                  <TableCell>
                    <Skeleton className='h-5 w-[50px]' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileContainerSkeleton;
