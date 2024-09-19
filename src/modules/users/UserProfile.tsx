import { useUser } from './context/userContext';
import ProfileCard from './components/ProfileCard';
import { useGetAllOrders } from './api/orderApi';

const UserProfile = () => {
  const {
    user,
    isLoading: isUserLoading,
    error: userError,
    refetch,
  } = useUser();
  const { data: orders, isLoading: isOrdersLoading } = useGetAllOrders(
    { userId: user?.id },
    { enabled: !!user }
  );

  const orderCount = orders?.items.length || 0;

  return (
    <div className='container mx-auto px-0 space-y-8'>
      <ProfileCard
        user={user}
        isLoading={isUserLoading || isOrdersLoading}
        error={userError}
        refetch={refetch}
        orderCount={orderCount}
      />
    </div>
  );
};

export default UserProfile;
