import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetProductById } from './api/productApi';
import { useGetCategoryById } from '../shared/api/categoryApi';
import ProductImage from './components/ProductDetails/ProductImage';
import ProductMainInfo from './components/ProductDetails/ProductMainInfo';
import ProductAdditionalInfo from './components/ProductDetails/ProductAdditionalInfo';
import ProductPurchaseSection from './components/ProductDetails/ProductPurchaseSection';

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const productIdNumber = productId ? parseInt(productId, 10) : null;

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductById(productIdNumber);

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetCategoryById(product?.categoryId || null);

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    if (!product) return;
    setQuantity((prev) => (prev < product.stock ? prev + 1 : product.stock));
  };

  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (isLoading) return <p>Loading product...</p>;
  if (isError || !product)
    return (
      <p className='text-red-500'>
        Error: {error?.detail || 'Failed to load product'}
      </p>
    );

  return (
    <div className='container px-0 py-8'>
      <div className='flex flex-col lg:flex-row gap-8'>
        <ProductImage
          imageUrl={
            product.productImage.length > 1
              ? product.productImage[1].url
              : product.productImage[0].url
          }
          title={product.title}
        />

        <div className='flex-1 flex flex-col px-4 sm:px-0 space-y-4'>
          <ProductMainInfo
            title={product.title}
            rating={0}
            price={product.price}
            description={product.description}
          />

          <ProductAdditionalInfo categoryName={categoryData?.name || 'N/A'} />

          <ProductPurchaseSection
            stock={product.stock}
            quantity={quantity}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
