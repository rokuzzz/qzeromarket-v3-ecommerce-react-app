import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const ErrorPage = () => {
  const error = useRouteError();

  let errorMessage: string;
  let errorCode: number | string = '';

  if (isRouteErrorResponse(error)) {
    errorCode = error.status;
    errorMessage = error.statusText || error.data?.message || 'Unknown error';
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <div className='flex flex-col space-y-4 items-center justify-center min-h-screen'>
      <h1 className='text-2xl'>Oops!</h1>
      <div>
        {errorCode && <h1 className='text-8xl font-extrabold'>{errorCode}</h1>}
        <p className='text-center max-w-md text-lg font-semibold uppercase'>
          {errorMessage}
        </p>
      </div>
      <Link to='/'>
        <Button size={'lg'} variant={'link'}>
          Back to home page
        </Button>
      </Link>
    </div>
  );
};

export default ErrorPage;
