import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

import { Button } from '../../../shared/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../shared/components/ui/table';
import { GetUserDto } from '../../types/userTypes';
import EditUserDialog from '../EditUserDialog';
import DeleteUserDialog from './DeleteUserDialog';

interface UsersTableProps {
  usersData: { items: GetUserDto[] } | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

const UsersTable: React.FC<UsersTableProps> = ({
  usersData,
  isLoading,
  isError,
  error,
  refetch,
}) => {
  const [editingUser, setEditingUser] = useState<GetUserDto | null>(null);
  const [deletingUser, setDeletingUser] = useState<GetUserDto | null>(null);

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users: {error?.message}</p>;
  if (!usersData) return null;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersData.items.map((user: GetUserDto) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <div className='flex space-x-2'>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => setEditingUser(user)}
                  >
                    <Pencil className='h-4 w-4' />
                    <span className='sr-only'>Edit</span>
                  </Button>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => setDeletingUser(user)}
                  >
                    <Trash2 className='h-4 w-4 text-red-500' />
                    <span className='sr-only'>Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {editingUser && (
        <EditUserDialog
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          user={editingUser}
          refetchUser={refetch}
        />
      )}

      {deletingUser && (
        <DeleteUserDialog
          isOpen={!!deletingUser}
          onClose={() => setDeletingUser(null)}
          user={deletingUser}
          onDelete={refetch}
        />
      )}
    </>
  );
};

export default UsersTable;
