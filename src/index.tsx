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
import ErrorPage from './modules/shared/pages/ErrorPage';
import HomePage from './modules/shared/pages/HomePage';
import Register from './modules/auth/Register';
import Login from './modules/auth/Login';
import UserProfilePage from './modules/users/UserProfilePage';
import AdminDashboard from './modules/users//AdminDashboard';
import Products from './modules/products/Products';
import ProductDetails from './modules/products/ProductDetails';
import { CartProvider } from './modules/cart/context/cartContext';

const container = document.getElementById('root')!;
const root = createRoot(container);

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
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
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      {
        path: '/user-profile',
        element: (
          <ProtectedRoute>
            <UserProfilePage />
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
    ],
  },
]);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <UserProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
