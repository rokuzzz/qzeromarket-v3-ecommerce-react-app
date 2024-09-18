import React from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../shared/components/ui/sheet';
import { ScrollArea } from '../shared/components/ui/scroll-area';
import { Separator } from '../shared/components/ui/separator';
import { Button } from '../shared/components/ui/button';
import { useCart } from '../cart/context/cartContext';
import CartItem from './components/CartItem';
import { Link } from 'react-router-dom';

const CartSheet = () => {
  const { cartItems, productsMap, isLoading, error, clearCart } = useCart();

  const totalAmount = cartItems.reduce((total, item) => {
    const product = productsMap[item.productId];
    return product ? total + product.price * item.quantity : total;
  }, 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className='text-sm text-neutral-500 hover:text-black cursor-pointer transition-colors duration-200 mr-3'>
          Cart ({cartItems.length})
        </span>
      </SheetTrigger>
      <SheetContent side='right' className='w-96 flex flex-col'>
        <SheetHeader>
          <SheetTitle className='uppercase'>Cart</SheetTitle>
        </SheetHeader>
        <Separator />
        <span className='text-neutral-500 text-sm font-thin'>
          {cartItems.length} item{cartItems.length !== 1 && 's'} in cart
        </span>
        <Separator />
        <ScrollArea className='flex-grow'>
          <div className='py-2 space-y-6'>
            {isLoading ? (
              <p>Loading cart items...</p>
            ) : error ? (
              <p className='text-red-500'>Error loading cart items.</p>
            ) : cartItems.length === 0 ? (
              <></>
            ) : (
              cartItems.map((item) => (
                <CartItem key={item.id} cartItem={item} />
              ))
            )}
          </div>
        </ScrollArea>

        <div className='mt-auto pt-4'>
          <Separator />
          {cartItems.length > 0 ? (
            <div className='flex justify-between items-center py-2'>
              <Button
                variant='link'
                onClick={clearCart}
                className='text-red-500 p-0'
              >
                Clear Cart
              </Button>
              <p className='font-bold'>Total: €{totalAmount.toFixed(2)}</p>
            </div>
          ) : (
            <Button
              className='w-full uppercase'
              variant={'default'}
              size={'lg'}
              asChild
            >
              <Link to={'/products'} className='text-xs font-bold'>
                Start Shopping
              </Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
