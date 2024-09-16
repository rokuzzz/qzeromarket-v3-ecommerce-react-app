import { useUser } from './context/userContext';

const UserProfile = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <div>
      <p>{user?.firstName}</p>
      <p>{user?.lastName}</p>
    </div>
  );
};

export default UserProfile;
