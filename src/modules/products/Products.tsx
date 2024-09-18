import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetAllProducts } from './api/productApi';
import { useGetCategoryById } from '../shared/api/categoryApi';
import ProductList from './components/Products/ProductList';

const TitleSkeleton = () => (
  <div className='h-9 w-48 bg-gray-200 rounded animate-pulse'></div>
);

const Products = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  // Convert categoryId to a number or undefined
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

  // Determine the title or show skeleton based on loading state
  const renderTitle = () => {
    if (categoryIdNumber) {
      if (isCategoryLoading) {
        return <TitleSkeleton />;
      }
      return (
        <h2 className='text-3xl font-bold mb-4'>
          {categoryData?.name || 'Category Not Found'}
        </h2>
      );
    }
    return <h2 className='text-3xl font-bold mb-4'>All Products</h2>;
  };

  return (
    <div className='container px-0 py-8'>
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
