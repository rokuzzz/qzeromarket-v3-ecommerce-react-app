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
import { Link, useNavigate } from 'react-router-dom';
import { useCreateOrder } from '../users/api/orderApi';
import { useUser } from '../users/context/userContext';
import { useToast } from '../shared/hooks/use-toast';

const CartSheet = () => {
  const {
    cartItems,
    productsMap,
    isLoading,
    error,
    clearCart,
    refetchCartItems,
  } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const totalAmount = cartItems.reduce((total, item) => {
    const product = productsMap[item.productId];
    return product ? total + product.price * item.quantity : total;
  }, 0);

  const createOrder = useCreateOrder({
    onSuccess: () => {
      refetchCartItems();
      toast({
        title: 'Order Placed',
        description: 'Your order has been placed successfully.',
        variant: 'default',
      });
      navigate('/user-profile');
    },
    onError: (error: any) => {
      console.error('Failed to place order', error);
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handlePlaceOrder = () => {
    if (!user) {
      toast({
        title: 'Login Required',
        description: 'Please log in to place an order.',
        variant: 'destructive',
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: 'Cart is Empty',
        description: 'Add items to your cart before placing an order.',
        variant: 'destructive',
      });
      return;
    }

    const orderData = {
      userId: user.id,
    };

    createOrder.mutate(orderData);
  };

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
              <p>Your cart is empty.</p>
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
            <>
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
              <Button
                className='w-full uppercase mt-2'
                variant={'default'}
                size={'lg'}
                onClick={handlePlaceOrder}
              >
                Place Order
              </Button>
            </>
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
