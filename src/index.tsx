import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { UserProvider } from '../src/modules/users/context/userContext';
import PublicRoute from './modules/shared/components/Routes/PublicRoute';
import ProtectedRoute from './modules/shared/components/Routes/ProtectedRoute';
import Login from './modules/auth/Login';
import UserProfile from './modules/users/UserProfile';
import AdminDashboard from './modules/users//AdminDashboard';
import Products from './modules/products/Products';
import ProductDetails from './modules/products/ProductDetails';

const container = document.getElementById('root')!;
const root = createRoot(container);

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Error page</div>,
    children: [
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/products/category/:categoryId',
        element: <Products />,
      },
      {
        path: '/products/:productId',
        element: <ProductDetails />,
      },
      {
        path: '/login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: '/register',
        element: <div>Register page</div>,
      },
      {
        path: '/user-profile',
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin-dashboard',
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      // ... other routes
    ],
  },
]);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
