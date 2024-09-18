import { Plus, Minus, ShoppingCart } from 'lucide-react';

import { Button } from '../../../shared/components/ui/button';

interface ProductPurchaseSectionProps {
  stock: number;
  quantity: number;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
}

const ProductPurchaseSection = ({
  stock,
  quantity,
  incrementQuantity,
  decrementQuantity,
}: ProductPurchaseSectionProps) => (
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
      <Button className='w-full sm:w-48'>
        <ShoppingCart className='mr-2 h-4 w-4' /> Add to Cart
      </Button>
    </div>
  </div>
);

export default ProductPurchaseSection;
