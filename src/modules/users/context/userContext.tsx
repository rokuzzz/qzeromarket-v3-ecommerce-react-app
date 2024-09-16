import React, { createContext, useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';

import { GetUserDto } from '../types/userTypes';
import { useGetUserById } from '../api/userApi';

interface TokenPayload {
  nameid: string; // Adjust this according to your JWT structure
  role: string;
  exp: number;
  iat: number;
}

interface UserContextType {
  token: string | null;
  user: GetUserDto | undefined;
  setToken: (token: string | null) => void;
  logout: () => void;
  isLoading: boolean;
  error: Error | null;
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
      queryClient.removeQueries({ queryKey: ['getUserById'] });
    }
  };

  const logout = () => {
    setToken(null);
  };

  // Decode token to get userId
  let userId: number | null = null;
  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      userId = parseInt(decoded.nameid, 10);
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }

  // Use the existing useGetUserById hook
  const {
    data: user,
    isLoading,
    error,
  } = useGetUserById(userId, {
    enabled: userId !== null,
  });

  return (
    <UserContext.Provider
      value={{ token, user, setToken, logout, isLoading, error }}
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
