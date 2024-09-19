import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { HTTPError } from 'ky';

import { useUser } from '../users/context/userContext';
import { useLogin } from './api/authApi';
import { LoginDto } from './types/authTypes';
import { ToastAction } from '../shared/components/ui/toast';
import { useToast } from '../shared/hooks/use-toast';
import AuthForm from './components/AuthForm';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../shared/components/ui/form';
import { Input } from '../shared/components/ui/input';

const loginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Field is required'),
});

const Login = () => {
  const { mutateAsync: login, isPending } = useLogin();
  const { toast } = useToast();
  const { setToken } = useUser();

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
      setToken(result.token);

      toast({
        title: 'Success',
        description: "You've successfully logged in!",
      });
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
      <FormField
        control={form.control}
        name='password'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type='password' placeholder='************' {...field} />
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
      submitText='Login'
      alternativeText="Don't have an account? Register"
      alternativeLink='/register'
    />
  );
};

export default Login;
