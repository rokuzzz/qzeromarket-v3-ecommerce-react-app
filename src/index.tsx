import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import Home from './modules/products/Home';
import Login from './modules/auth/Login';
import UserProfile from './modules/users/UserProfile';
import AdminDashboard from './modules/users//AdminDashboard';
import { UserProvider } from '../src/modules/users/context/userContext';
import PublicRoute from './modules/shared/components/Routes/PublicRoute';

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
        path: '/',
        element: <Home />,
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
        element: <UserProfile />,
      },
      {
        path: '/admin-dashboard',
        element: <AdminDashboard />,
      },
      {
        path: '/products/:productId',
        element: <div>Product details page</div>,
      },
      {
        path: '/profile',
        element: <div>User profile page</div>,
      },
      {
        path: '/orders',
        element: <div>Order history page</div>,
      },
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
