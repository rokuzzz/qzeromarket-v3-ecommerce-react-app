import React from 'react';
import { Link } from 'react-router-dom';
import { UseFormReturn } from 'react-hook-form';

import { Form } from '../../shared/components/ui/form';
import { Button } from '../../shared/components/ui/button';
import { CardFooter } from '../../shared/components/ui/card';

interface AuthFormProps {
  form: UseFormReturn<any>;
  onSubmit: (data: any) => Promise<void>;
  isPending: boolean;
  renderFields: () => React.ReactNode;
  submitText: string;
  alternativeText: string;
  alternativeLink: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  form,
  onSubmit,
  isPending,
  renderFields,
  submitText,
  alternativeText,
  alternativeLink,
}) => {
  return (
    <div className='flex sm:justify-center sm:mt-16'>
      <div className='w-full sm:max-w-md p-8 space-y-6 bg-white sm:rounded-lg sm:shadow-lg'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            {renderFields()}
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
                  submitText
                )}
              </Button>
              <Link to={alternativeLink}>
                <Button type='button' variant='link' className='p-0'>
                  {alternativeText}
                </Button>
              </Link>
            </CardFooter>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;
