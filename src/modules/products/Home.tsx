import { useUser } from '../users/context/userContext';

const Home = () => {
  const userContext = useUser();

  return (
    <div className='p-4 bg-gray-100 rounded-lg shadow'>
      <h2 className='text-xl font-bold mb-2'>User Context Debug</h2>
      <pre className='whitespace-pre-wrap bg-white p-2 rounded'>
        {JSON.stringify(userContext, null, 2)}
      </pre>
    </div>
  );
};

export default Home;
