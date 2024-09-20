import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../../shared/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../../../shared/components/ui/form';
import { Input } from '../../../shared/components/ui/input';
import { Button } from '../../../shared/components/ui/button';
import { CreateProductDto } from '../../../products/types/productTypes';
import { useCreateProduct } from '../../../products/api/productApi';
import { useToast } from '../../../shared/hooks/use-toast';

interface CreateProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  refetchProducts: () => void;
}

const createProductSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required').transform(Number),
  stock: z.string().min(1, 'Stock is required').transform(Number),
  categoryId: z.string().min(1, 'Category ID is required').transform(Number),
  productImages: z.any(),
});

type FormValues = z.infer<typeof createProductSchema>;

const CreateProductDialog: React.FC<CreateProductDialogProps> = ({
  isOpen,
  onClose,
  refetchProducts,
}) => {
  const { toast } = useToast();
  const createProduct = useCreateProduct();

  const form = useForm<FormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: 'Example Title',
      description: 'Example Description',
      price: 0,
      stock: 0,
      categoryId: 0,
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const productData: CreateProductDto = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
        categoryId: Number(data.categoryId),
        productImage: Array.from(data.productImages),
      };

      await createProduct.mutateAsync(productData);
      toast({
        title: 'Product Created',
        description: 'The product has been successfully created.',
      });
      refetchProducts();
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
      toast({
        title: 'Error',
        description: 'Failed to create product. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} type='number' step='0.01' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='stock'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input {...field} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category ID</FormLabel>
                  <FormControl>
                    <Input {...field} type='number' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='productImages'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      multiple
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit'>Create Product</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductDialog;
