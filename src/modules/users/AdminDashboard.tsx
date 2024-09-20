import { useState } from 'react';
import Sidebar from './components/AdminDashboard/Sidebar';
import UsersTable from './components/AdminDashboard/UsersTable';
import ProductsTable from './components/AdminDashboard/ProductsTable';
import { useGetAllUsers } from '../users/api/userApi';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const {
    data: usersData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllUsers();

  return (
    <>
      {/* Message for small screens */}
      <div className='lg:hidden flex items-center justify-center h-screen bg-gray-100 p-4'>
        <p className='text-center text-gray-800 font-semibold'>
          The admin dashboard is only available on larger screens. Please use a
          desktop device.
        </p>
      </div>

      {/* Dashboard content for larger screens */}
      <div className='hidden lg:flex h-screen bg-gray-100 border-y'>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className='flex-1 p-8'>
          <div className='mb-8'>
            <h2 className='text-3xl font-bold text-gray-800'>
              {activeTab === 'users' ? 'Users' : 'Products'}
            </h2>
          </div>
          {activeTab === 'users' && (
            <UsersTable
              usersData={usersData}
              isLoading={isLoading}
              isError={isError}
              error={error}
              refetch={refetch}
            />
          )}
          {activeTab === 'products' && <ProductsTable />}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
