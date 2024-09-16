import { useUser } from './context/userContext';

const AdminDashboard = () => {
  const { user } = useUser();

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
