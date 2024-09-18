import { useGetAllProducts } from './api/productApi';
import ProductList from './components/ProductList';

const Products = () => {
  const { data, isLoading, isError, error } = useGetAllProducts();

  const products = data?.items || [];

  return (
    <div className='container px-0 py-8'>
      <ProductList
        products={products}
        isLoading={isLoading}
        hasError={isError}
        errorMessage={error?.detail || ''}
      />
    </div>
  );
};

export default Products;
