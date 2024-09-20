import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../shared/components/ui/table';
import OrderRow from './OrderRow';

interface OrderListProps {
  orders: any[];
}

const OrderList = ({ orders }: OrderListProps) => {
  if (orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className='space-y-4'>
      <h3 className='text-xl font-semibold'>
        {orders.length} {orders.length > 1 ? 'Orders' : 'Order'}
      </h3>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderList;
