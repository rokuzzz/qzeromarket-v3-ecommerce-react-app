import React from 'react';
import { useUser } from './context/userContext';
import { useGetAllUsers } from './api/userApi';
import { useSearchParams } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useUser();
  const [searchParams] = useSearchParams();
  const { data } = useGetAllUsers({ page: 1, perPage: 10 });

  console.log(data);
  return (
    <div>
      <p>{user?.email}</p>
      <p>{user?.firstName}</p>
      <p>{user?.lastName}</p>
      <p>{user?.role}</p>
    </div>
  );
};

export default AdminDashboard;
