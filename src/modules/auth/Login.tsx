import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { HTTPError } from 'ky';

import { useLogin } from './api/authApi';
import { LoginDto } from './types/authTypes';
import { ToastAction } from '../shared/components/ui/toast';
import { useToast } from '../shared/hooks/use-toast';
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

const loginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const Login = () => {
  const { mutateAsync: login, isPending, isError, error } = useLogin();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginDto) => {
    try {
      const result = await login(data);
      localStorage.setItem('token', result.token);
      toast({
        title: 'Success',
        description: "You've successfully logged in!",
      });
      navigate('/');
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
    <div className='flex items-center justify-center min-h-screen -mt-20 sm:-mt-28'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg sm:shadow-lg'>
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

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
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
                  'Submit'
                )}
              </Button>
              <Link to='/register'>
                <Button type='reset' variant='link' className='p-0'>
                  Don't have an account? Register
                </Button>
              </Link>
            </CardFooter>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
