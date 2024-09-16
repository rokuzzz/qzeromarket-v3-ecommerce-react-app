import React, { createContext, useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { GetUserDto } from '../types/userTypes';
import { useGetCurrentUser } from '../api/userApi';

interface UserContextType {
  token: string | null;
  user: GetUserDto | undefined;
  setToken: (token: string | null) => void;
  logout: () => void;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void; // Add this line
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setTokenState] = React.useState<string | null>(
    localStorage.getItem('token')
  );

  const queryClient = useQueryClient();

  const setToken = (newToken: string | null) => {
    setTokenState(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
      queryClient.removeQueries({ queryKey: ['getCurrentUser'] });
    }
  };

  const logout = () => {
    setToken(null);
    queryClient.removeQueries({ queryKey: ['getCurrentUser'] });
  };

  const {
    data: user,
    isLoading,
    error,
    refetch: refetchUser,
  } = useGetCurrentUser({
    enabled: !!token,
  });

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        setToken,
        logout,
        isLoading,
        error,
        refetch: refetchUser, // Add this line
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
