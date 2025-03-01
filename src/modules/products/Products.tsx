import { useParams } from 'react-router-dom';

import { useGetAllProducts } from './api/productApi';
import { useGetCategoryById } from '../categories/api/categoryApi';
import ProductList from './components/Products/ProductList';

const TitleSkeleton = () => (
  <div className='h-9 w-48 bg-gray-200 rounded animate-pulse'></div>
);

const Products = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const categoryIdNumber = categoryId ? parseInt(categoryId, 10) : undefined;

  const {
    data: productsData,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useGetAllProducts({
    categoryId: categoryIdNumber,
  });

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetCategoryById(categoryIdNumber || null);

  const products = productsData?.items || [];

  const renderTitle = () => {
    if (categoryIdNumber) {
      if (isCategoryLoading) {
        return <TitleSkeleton />;
      }
      return (
        <h2 className='text-2xl font-bold mb-4'>
          {categoryData?.name || 'Category Not Found'}
        </h2>
      );
    }
    return <h2 className='text-2xl font-bold mb-8'>All Products</h2>;
  };

  return (
    <div className='container px-0 py-12'>
      {renderTitle()}
      <ProductList
        products={products}
        isLoading={isProductsLoading}
        hasError={isProductsError}
        errorMessage={productsError?.detail || ''}
      />
    </div>
  );
};

export default Products;
