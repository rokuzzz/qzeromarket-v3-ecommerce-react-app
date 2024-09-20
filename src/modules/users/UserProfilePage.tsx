import { useUser } from './context/userContext';
import UserProfileContainer from './components/UserProfileContainer';
import { useGetAllOrders } from './api/orderApi';

const UserProfilePage = () => {
  const {
    user,
    isLoading: isUserLoading,
    error: userError,
    refetch: refetchUser,
  } = useUser();

  const {
    data: ordersData,
    isLoading: isOrdersLoading,
    error: ordersError,
    refetch: refetchOrders,
  } = useGetAllOrders({ userId: user?.id }, { enabled: !!user });

  const isLoading = isUserLoading || isOrdersLoading;
  const error = userError || ordersError;

  const handleRefetch = () => {
    refetchUser();
    refetchOrders();
  };

  return (
    <div className='container mx-auto px-0 space-y-8'>
      <UserProfileContainer
        user={user}
        orders={ordersData?.items}
        isLoading={isLoading}
        error={error}
        refetch={handleRefetch}
      />
    </div>
  );
};

export default UserProfilePage;
