import { Pencil } from 'lucide-react';

import { Button } from '../../../shared/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../shared/components/ui/table';

const products = [
  { id: 1, name: 'Laptop', price: 999.99, stock: 50 },
  { id: 2, name: 'Smartphone', price: 499.99, stock: 100 },
  { id: 3, name: 'Headphones', price: 99.99, stock: 200 },
];

const ProductsTable = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Stock</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {products.map((product) => (
        <TableRow key={product.id}>
          <TableCell>{product.id}</TableCell>
          <TableCell>{product.name}</TableCell>
          <TableCell>${product.price.toFixed(2)}</TableCell>
          <TableCell>{product.stock}</TableCell>
          <TableCell>
            <Button variant='ghost' size='icon'>
              <Pencil className='h-4 w-4' />
              <span className='sr-only'>Update</span>
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ProductsTable;
