import React from 'react';
import { TableRow, TableCell } from '../../../shared/components/ui/table';
import { useQueries } from '@tanstack/react-query';
import { api } from '../../../shared/api/apiClient';

interface OrderRowProps {
  order: any;
}

const getProductById = async (productId: number) => {
  return api.get(`products/${productId}`).json();
};

const OrderRow = ({ order }: OrderRowProps) => {
  const productIds = order.orderItems.map((item: any) => item.productId);

  const productQueries = useQueries({
    queries: productIds.map((productId: number) => ({
      queryKey: ['getProductById', productId],
      queryFn: () => getProductById(productId),
    })),
  });

  const isLoading = productQueries.some((query) => query.isLoading);
  const isError = productQueries.some((query) => query.isError);

  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={4}>Loading order details...</TableCell>
      </TableRow>
    );
  }

  if (isError) {
    return (
      <TableRow>
        <TableCell colSpan={4}>Error loading order details</TableCell>
      </TableRow>
    );
  }

  const productsMap: { [key: number]: any } = {};
  productQueries.forEach((query, index) => {
    productsMap[productIds[index]] = query.data;
  });

  const totalPrice = order.orderItems.reduce((sum: number, item: any) => {
    const product = productsMap[item.productId];
    const price = product ? product.price : 0;
    return sum + price * item.quantity;
  }, 0);

  const itemsDisplay = order.orderItems
    .map((item: any) => {
      const product = productsMap[item.productId];
      return product
        ? `${product.title} (x${item.quantity})`
        : `Product ID ${item.productId} (x${item.quantity})`;
    })
    .join(', ');

  return (
    <TableRow>
      <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
      <TableCell className='md:pr-16'>{itemsDisplay}</TableCell>
      <TableCell>€{totalPrice.toFixed(2)}</TableCell>
    </TableRow>
  );
};

export default OrderRow;
