import { NavLink, NavLinkProps } from 'react-router-dom';

interface CustomNavLinkProps extends NavLinkProps {
  isCategoryLink?: boolean;
}

export const CustomNavLink = ({
  children,
  isCategoryLink,
  ...props
}: CustomNavLinkProps) => (
  <NavLink
    {...props}
    className={({ isActive }) =>
      `text-sm ${
        isCategoryLink
          ? isActive
            ? 'text-black underline underline-offset-2'
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
