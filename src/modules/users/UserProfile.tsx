import { useUser } from './context/userContext';
import ProfileCard from './components/ProfileCard';

const UserProfile = () => {
  const { user, isLoading, error, refetch } = useUser();

  return (
    <div className='container mx-auto px-0 space-y-8'>
      <ProfileCard
        user={user}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />
    </div>
  );
};

export default UserProfile;
