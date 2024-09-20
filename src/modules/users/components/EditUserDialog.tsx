import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../../shared/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../../shared/components/ui/form';
import { Button } from '../../shared/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { GetUserDto, UpdateUserDto } from '../types/userTypes';
import { useUpdateUser } from '../api/userApi';
import { Input } from '../../shared/components/ui/input';
import { useToast } from '../../shared/hooks/use-toast';

interface EditProfileDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: GetUserDto;
  refetchUser: () => void;
}

const editProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
});

type EditProfileFormValues = z.infer<typeof editProfileSchema>;

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  isOpen,
  onClose,
  user,
  refetchUser,
}) => {
  const { toast } = useToast();
  const { mutateAsync: updateUser } = useUpdateUser(user.id);

  const form = useForm<EditProfileFormValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
    },
  });

  const onSubmit = async (data: EditProfileFormValues) => {
    try {
      const updateData: UpdateUserDto = {
        id: user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      };

      await updateUser(updateData);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
      });

      refetchUser();
      onClose();
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user profile information below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='firstName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='First Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='lastName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input type='text' placeholder='Last Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type='submit'>Update</Button>
            </DialogFooter>
          </form>
        </Form>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
