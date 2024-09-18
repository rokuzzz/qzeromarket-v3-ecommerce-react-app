import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface CustomNavLinkProps extends NavLinkProps {
  isCategoryLink?: boolean;
}

export const CustomNavLink: React.FC<CustomNavLinkProps> = ({
  children,
  isCategoryLink,
  ...props
}) => (
  <NavLink
    {...props}
    className={({ isActive }) =>
      `text-sm ${
        isCategoryLink
          ? isActive
            ? 'text-black underline underline-offset-2 font-bold'
            : 'text-gray-600 hover:text-gray-900 font-light'
          : `flex flex-row items-center font-light ${
              isActive ? 'text-black' : 'text-neutral-500 hover:text-black'
            }`
      }`
    }
  >
    {children}
  </NavLink>
);
