import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GetProductDto } from '../types/productTypes';

interface ProductCardProps {
  product: GetProductDto;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const firstImageUrl = `http://localhost:5169/${product.productImage[0].url}`;

  const secondImageUrl = product.productImage[1]?.url
    ? `http://localhost:5169/${product.productImage[1].url}`
    : null;

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
        <h3 className='font-opensans text-base font-bold leading-tight text-center line-clamp-1 mt-2 px-4'>
          {product.title}
        </h3>
        <p className='text-amber-500 text-sm font-opensans font-bold text-center mt-2'>
          €{product.price.toFixed(2)}
        </p>
      </div>
    </NavLink>
  );
};

export default ProductCard;
