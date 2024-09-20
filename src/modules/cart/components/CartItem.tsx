import { Plus, Minus } from 'lucide-react';

import { Button } from '../../shared/components/ui/button';
import { useCart } from '../../cart/context/cartContext';
import { GetCartItemDto } from '../types/cartTypes';

interface CartItemProps {
  cartItem: GetCartItemDto;
}

const CartItem = ({ cartItem }: CartItemProps) => {
  const { updateCartItemQuantity, removeItemFromCart, productsMap } = useCart();

  const product = productsMap[cartItem.productId];

  if (!product) {
    return <p>Loading product...</p>;
  }

  const incrementQuantity = () => {
    updateCartItemQuantity(cartItem.id, cartItem.quantity + 1);
  };

  const decrementQuantity = () => {
    if (cartItem.quantity > 1) {
      updateCartItemQuantity(cartItem.id, cartItem.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItemFromCart(cartItem.id);
  };

  const productImageUrl = product.productImage[0]?.url
    ? `https://romankuzero-ecommerce-api-2024.azurewebsites.net/${product.productImage[0].url}`
    : '/placeholder-image.png';

  return (
    <div className='flex space-x-6'>
      <img
        src={productImageUrl}
        alt={product.title}
        className='w-28 h-28  aspect-[1/1] object-cover bg-neutral-300'
      />
      <div className='flex-1'>
        <p className='text-sm font-normal uppercase line-clamp-1 '>
          {product.title}
        </p>
        <p className='text-[10px] font-semibold'>€{product.price.toFixed(2)}</p>
        <div className='flex items-center space-x-4 mt-2'>
          <Button
            className='rounded-full w-[30px] h-[30px]'
            variant='outline'
            size='icon'
            onClick={decrementQuantity}
          >
            <Minus className='h-4 w-4' />
          </Button>
          <span className='text-xs'>{cartItem.quantity}</span>
          <Button
            className='rounded-full w-[30px] h-[30px]'
            variant='outline'
            size='icon'
            onClick={incrementQuantity}
          >
            <Plus className='h-4 w-4' />
          </Button>
          <Button
            className='text-[10px] text-neutral-500'
            variant='link'
            size='icon'
            onClick={handleRemove}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
