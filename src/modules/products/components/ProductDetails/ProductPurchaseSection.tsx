import React from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

import { Button } from '../../../shared/components/ui/button';
import { useToast } from '../../../shared/hooks/use-toast';
import { useCart } from '../../../cart/context/cartContext';
import { useUser } from '../../../users/context/userContext';
import { CreateCartItemDto } from '../../../cart/types/cartTypes';

interface ProductPurchaseSectionProps {
  productId: number;
  stock: number;
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
}

const ProductPurchaseSection = ({
  productId,
  stock,
  quantity,
  incrementQuantity,
  decrementQuantity,
}: ProductPurchaseSectionProps) => {
  const { addItemToCart } = useCart();
  const { user } = useUser();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please log in to add items to your cart.',
        variant: 'destructive',
      });
      return;
    }

    const cartItemData: CreateCartItemDto = {
      userId: user.id,
      productId,
      quantity,
    };

    try {
      await addItemToCart(cartItemData);
      toast({
        title: 'Success',
        description: 'Item added to cart successfully.',
        variant: 'default',
      });
    } catch (error) {
      console.error('Failed to add item to cart', error);
      toast({
        title: 'Error',
        description: 'Failed to add item to cart. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='flex flex-col'>
      <p className='text-neutral-500 text-sm pl-[1px]'>{stock} in stock</p>
      <div className='flex flex-row items-center space-y-0 space-x-4'>
        <div className='flex items-center space-x-1'>
          <Button variant='outline' size='icon' onClick={decrementQuantity}>
            <Minus className='h-4 w-4' />
          </Button>
          <Button variant='outline' size='icon'>
            {quantity}
          </Button>
          <Button variant='outline' size='icon' onClick={incrementQuantity}>
            <Plus className='h-4 w-4' />
          </Button>
        </div>
        <Button className='w-full sm:w-48' onClick={handleAddToCart}>
          <ShoppingCart className='mr-2 h-4 w-4' /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductPurchaseSection;
