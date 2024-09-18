import React, { createContext, useContext } from 'react';
import {
  useGetAllCartItems,
  useCreateCartItem,
  useUpdateCartItem,
  useDeleteCartItem,
} from '../api/cartApi';
import { GetCartItemDto, CreateCartItemDto } from '../types/cartTypes';
import { useUser } from '../../users/context/userContext';
import { ApiError } from '../../shared/types/sharedTypes';
import { GetProductDto } from '../../products/types/productTypes';
import { api } from '../../shared/api/apiClient';
import { useQueries } from '@tanstack/react-query';

interface CartContextProps {
  cartItems: GetCartItemDto[];
  productsMap: { [productId: number]: GetProductDto };
  isLoading: boolean;
  error: ApiError | null;
  addItemToCart: (item: CreateCartItemDto) => Promise<void>;
  updateCartItemQuantity: (
    cartItemId: number,
    quantity: number
  ) => Promise<void>;
  removeItemFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refetchCartItems: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();

  const {
    data,
    isLoading: isCartLoading,
    isError,
    error,
    refetch,
  } = useGetAllCartItems({ userId: user?.id || 0 }, { enabled: !!user });

  const cartItems = data?.items || [];

  // Fetch products for cart items
  const productQueries = useQueries({
    queries: cartItems.map((item) => ({
      queryKey: ['getProductById', item.productId],
      queryFn: async () =>
        api.get(`products/${item.productId}`).json<GetProductDto>(),
      enabled: !!item.productId,
    })),
  });

  const isProductsLoading = productQueries.some((query) => query.isLoading);
  const productsMap = productQueries.reduce((acc, result, index) => {
    if (result.data) {
      acc[cartItems[index].productId] = result.data;
    }
    return acc;
  }, {} as { [productId: number]: GetProductDto });

  const createCartItem = useCreateCartItem({
    onSuccess: () => refetch(),
  });

  const updateCartItem = useUpdateCartItem({
    onSuccess: () => refetch(),
  });

  const deleteCartItem = useDeleteCartItem({
    onSuccess: () => refetch(),
  });

  const addItemToCart = async (item: CreateCartItemDto) => {
    const existingCartItem = cartItems.find(
      (cartItem) => cartItem.productId === item.productId
    );

    if (existingCartItem) {
      // Update the quantity of the existing cart item
      const newQuantity = existingCartItem.quantity + item.quantity;
      await updateCartItemQuantity(existingCartItem.id, newQuantity);
    } else {
      // Add new cart item
      await createCartItem.mutateAsync(item);
    }
  };

  const updateCartItemQuantity = async (
    cartItemId: number,
    quantity: number
  ) => {
    await updateCartItem.mutateAsync({ cartItemId, data: { quantity } });
  };

  const removeItemFromCart = async (cartItemId: number) => {
    await deleteCartItem.mutateAsync(cartItemId);
  };

  const clearCart = async () => {
    if (!cartItems.length) return;
    for (const item of cartItems) {
      await deleteCartItem.mutateAsync(item.id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        productsMap,
        isLoading: isCartLoading || isProductsLoading,
        error: isError ? error : null,
        addItemToCart,
        updateCartItemQuantity,
        removeItemFromCart,
        clearCart,
        refetchCartItems: refetch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
