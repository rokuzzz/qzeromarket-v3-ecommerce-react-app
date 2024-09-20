import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../shared/components/ui/avatar';
import { GetUserDto } from '../../types/userTypes';

interface UserInfoCardProps {
  user: GetUserDto;
}

const UserInfoCard = ({ user }: UserInfoCardProps) => {
  return (
    <div className='flex items-center space-x-4 mb-6'>
      <Avatar className='h-20 w-20'>
        <AvatarImage
          src={`http://localhost:5169/${user.avatar}`}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <AvatarFallback>
          {user.firstName[0]}
          {user.lastName[0]}
        </AvatarFallback>
      </Avatar>
      <div>
        <h2 className='text-2xl font-bold'>
          {user.firstName} {user.lastName}
        </h2>
        <p className='text-muted-foreground'>{user.email}</p>
      </div>
    </div>
  );
};

export default UserInfoCard;
