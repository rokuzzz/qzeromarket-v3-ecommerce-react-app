import { CustomNavLink } from '../ui/CustomNavLink';
import { GetCategoryDto } from '@/shared/types/categoryTypes';

interface CategoriesNavbarProps {
  categories: GetCategoryDto[];
}

const CategoriesNavbar = ({ categories }: CategoriesNavbarProps) => (
  <div className='bg-gray-100'>
    <div className='flex justify-between items-center px-16 xl:px-40 py-2'>
      <div className='flex-1 flex justify-between items-center'>
        <CustomNavLink to='/products' isCategoryLink>
          All Products
        </CustomNavLink>
        {categories.map((category) => (
          <CustomNavLink
            key={category.id}
            to={`/products/category/${category.id}`}
            isCategoryLink
          >
            {category.name}
          </CustomNavLink>
        ))}
      </div>
    </div>
  </div>
);

export default CategoriesNavbar;
