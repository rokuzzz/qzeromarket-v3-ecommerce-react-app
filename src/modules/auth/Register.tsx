import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { z } from 'zod';

import { useRegister } from './api/authApi';
import { RegisterDto } from './types/authTypes';
import { useToast } from '../shared/hooks/use-toast';
import { ToastAction } from '../shared/components/ui/toast';
import AuthForm from './components/AuthForm';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../shared/components/ui/form';
import { Input } from '../shared/components/ui/input';

const registerFormSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    avatar: z
      .instanceof(File)
      .refine((file) => file.size > 0, 'Avatar is required')
      .refine(
        (file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
        'Only JPG and PNG images are allowed'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync: register, isPending } = useRegister();
  const { toast } = useToast();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      avatar: undefined,
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await register(registerData as RegisterDto);

      toast({
        title: 'Registration Successful',
        description: 'You have successfully registered. Please log in.',
      });

      navigate('/login');
    } catch (err: any) {
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (err instanceof HTTPError && err.response) {
        const errorResponse = await err.response.json();
        if (errorResponse && errorResponse.detail) {
          errorMessage = errorResponse.detail;
        }
      }

      toast({
        title: 'Uh oh! Something went wrong.',
        description: errorMessage,
        variant: 'destructive',
        action: <ToastAction altText='Try again'>Try again</ToastAction>,
      });
    }
  };

  const renderFields = () => (
    <>
      <FormField
        control={form.control}
        name='email'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type='email' placeholder='example@email.com' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className='flex space-x-4'>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='************' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='************' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className='flex space-x-4'>
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input type='text' placeholder='John' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Doe' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name='avatar'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Avatar</FormLabel>
            <FormControl>
              <Input
                type='file'
                accept='image/*'
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    field.onChange(file);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );

  return (
    <AuthForm
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      renderFields={renderFields}
      submitText='Register'
      alternativeText='Already have an account? Login'
      alternativeLink='/login'
    />
  );
};

export default Register;
