import React from 'react';
import { CustomNavLink } from '../ui/CustomNavLink';
import { GetCategoryDto } from '@/products/types/categoryTypes';

interface CategoriesNavbarProps {
  categories: GetCategoryDto[];
  isLoading: boolean;
}

const DesktopCategoriesNavbar = ({ categories, isLoading }: CategoriesNavbarProps) => (
  <div className='bg-gray-100'>
    <div className='flex justify-between items-center px-16 xl:px-40 py-2'>
      <div className='flex-1 flex justify-between items-center'>
        <CustomNavLink to='/products' isCategoryLink end>
          All Products
        </CustomNavLink>
        {!isLoading &&
          categories.map((category) => (
            <CustomNavLink
              key={category.id}
              to={`/products/category/${category.id}`}
              isCategoryLink
            >
              {category.name}
            </CustomNavLink>
          ))}
        {/* This empty div ensures the navbar maintains its height when empty */}
        {(isLoading || categories.length === 0) && <div className='h-5'></div>}
      </div>
    </div>
  </div>
);

export default DesktopCategoriesNavbar;
