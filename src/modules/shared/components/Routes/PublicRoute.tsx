import React from 'react';
import { Navigate } from 'react-router-dom';

import { useUser } from '../../../users/context/userContext';

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user } = useUser();

  if (user) {
    // User is already authenticated; redirect them away from the login page
    return user.role === 'Admin' ? (
      <Navigate to='/admin-dashboard' replace />
    ) : (
      <Navigate to='/user-profile' replace />
    );
  }

  return children;
};

export default PublicRoute;
