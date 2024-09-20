import React, { useState } from 'react';
import { Eye, Trash2, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '../../../shared/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../shared/components/ui/table';
import {
  useGetAllProducts,
  useDeleteProduct,
} from '../../../products/api/productApi';
import { GetProductDto } from '../../../products/types/productTypes';
import DeleteProductDialog from './DeleteProductDialog';
import CreateProductDialog from './CreateProductDialog';
import { useToast } from '../../../shared/hooks/use-toast';

const ProductsTable: React.FC = () => {
  const {
    data: productsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllProducts();
  const [deletingProduct, setDeletingProduct] = useState<GetProductDto | null>(
    null
  );
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const { toast } = useToast();
  const deleteProduct = useDeleteProduct();

  const handleDeleteProduct = async (productId: number) => {
    try {
      await deleteProduct.mutateAsync(productId);
      toast({
        title: 'Product Deleted',
        description: 'The product has been successfully deleted.',
      });
      refetch();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete product. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setDeletingProduct(null);
    }
  };

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Error loading products: {error.detail}</p>;
  if (!productsData) return null;

  return (
    <>
      <div className='mb-4'>
        <Button onClick={() => setIsCreatingProduct(true)}>
          <PlusCircle className='mr-2 h-4 w-4' />
          Create Product
        </Button>
      </div>
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
          {productsData.items.map((product: GetProductDto) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.title}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <div className='flex space-x-2'>
                  <Button variant='outline' size='icon' asChild>
                    <Link to={`/products/${product.id}`}>
                      <Eye className='h-4 w-4' />
                      <span className='sr-only'>View</span>
                    </Link>
                  </Button>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => setDeletingProduct(product)}
                  >
                    <Trash2 className='h-4 w-4 text-red-500' />
                    <span className='sr-only'>Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {deletingProduct && (
        <DeleteProductDialog
          isOpen={!!deletingProduct}
          onClose={() => setDeletingProduct(null)}
          product={deletingProduct}
          onDelete={() => handleDeleteProduct(deletingProduct.id)}
        />
      )}

      <CreateProductDialog
        isOpen={isCreatingProduct}
        onClose={() => setIsCreatingProduct(false)}
        refetchProducts={refetch}
      />
    </>
  );
};

export default ProductsTable;
