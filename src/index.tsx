import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

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
        element: <div>Home page</div>,
      },
      {
        path: '/login',
        element: <div>Login page</div>,
      },
      {
        path: '/register',
        element: <div>Register page</div>,
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
