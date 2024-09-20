import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GetProductDto } from '../../types/productTypes';

interface ProductCardProps {
  product: GetProductDto;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  let firstImageUrl: string;
  let secondImageUrl: string | null;

  if (product.productImage.length > 1) {
    // If there are two or more images, swap their order
    firstImageUrl = `https://romankuzero-ecommerce-api-2024.azurewebsites.net/${product.productImage[1].url}`;
    secondImageUrl = `https://romankuzero-ecommerce-api-2024.azurewebsites.net/${product.productImage[0].url}`;
  } else {
    // If there's only one image or no images, keep the original order
    firstImageUrl = `https://romankuzero-ecommerce-api-2024.azurewebsites.net/${
      product.productImage[0]?.url || ''
    }`;
    secondImageUrl = null;
  }

  return (
    <NavLink to={`/products/${product.id}`}>
      <div
        className='flex flex-col items-center'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='w-full aspect-[1/1] relative overflow-hidden'>
          <img
            src={firstImageUrl}
            alt={product.title}
            className={`absolute inset-0 w-full h-full object-cover bg-transparent transition-opacity duration-700 ${
              isHovered && secondImageUrl ? 'opacity-0' : 'opacity-100'
            }`}
          />
          {secondImageUrl && (
            <img
              src={secondImageUrl}
              alt={`${product.title} - alternate view`}
              className={`absolute inset-0 w-full h-full object-cover bg-transparent transition-opacity duration-700 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>
        <h3 className='font-opensans text-sm font-bold leading-tight text-center line-clamp-1 mt-2 px-4'>
          {product.title}
        </h3>
        <p className='text-amber-500 text-xs font-opensans font-bold text-center mt-2'>
          €{product.price.toFixed(2)}
        </p>
      </div>
    </NavLink>
  );
};

export default ProductCard;
