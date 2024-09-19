import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HTTPError } from 'ky';
import { z } from 'zod';

import { useRegister } from './api/authApi';
import { RegisterDto } from './types/authTypes';
import { useToast } from '../shared/hooks/use-toast';
import { ToastAction } from '../shared/components/ui/toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../shared/components/ui/form';
import { Input } from '../shared/components/ui/input';
import { Button } from '../shared/components/ui/button';
import { CardFooter } from '../shared/components/ui/card';

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
      // Exclude confirmPassword from the data sent to the server
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

  return (
    <div className='flex sm:justify-center sm:mt-16'>
      <div className='w-full sm:max-w-md p-8 space-y-6 bg-white sm:rounded-lg sm:shadow-lg'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='example@email.com'
                      {...field}
                    />
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
                      <Input
                        type='password'
                        placeholder='************'
                        {...field}
                      />
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
                      <Input
                        type='password'
                        placeholder='************'
                        {...field}
                      />
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

            <CardFooter className='flex flex-col space-y-2 p-0'>
              <Button type='submit' className='w-full' disabled={isPending}>
                {isPending ? (
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                ) : (
                  'Register'
                )}
              </Button>
              <Link to='/login'>
                <Button type='button' variant='link' className='p-0'>
                  Already have an account? Login
                </Button>
              </Link>
            </CardFooter>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
