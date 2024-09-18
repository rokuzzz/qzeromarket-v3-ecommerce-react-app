import ProductCard from './ProductCard';
import { GetProductDto } from '../types/productTypes';

interface ProductListProps {
  products: GetProductDto[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
}

const ProductList = ({
  products,
  isLoading,
  hasError,
  errorMessage,
}: ProductListProps) => {
  if (isLoading) return <p>Loading products...</p>;
  if (hasError) return <p className='text-red-500'>Error: {errorMessage}</p>;

  return (
    <div className='grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
