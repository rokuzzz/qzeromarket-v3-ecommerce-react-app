import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { Role } from '../../../users/types/userTypes';
import { useUser } from '../../../users/context/userContext';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredRole?: Role;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectTo = '/login',
}) => {
  const { user, isLoading } = useUser();
  const location = useLocation();

  if (!user && !isLoading) {
    // User is not authenticated
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // User does not have the required role, redirect to profile
    return <Navigate to='/user-profile' replace />;
  }

  return children;
};

export default ProtectedRoute;
