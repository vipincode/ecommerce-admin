'use client';
import * as z from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Modal from '@/components/ui/modal';
import { useStoreModal } from '@/hooks/use-store-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useCreateStore } from '@/hooks/react-query/hooks';

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const { mutate, isError, isPending, isSuccess, error, data } = useCreateStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      mutate(values);
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  return (
    <Modal
      title='Create Store'
      description='Add a new store to manage products and categories'
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='E-Commerce'
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Your public display store name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='pt-6 space-x-2 flex justify-end items-center w-full'>
                <Button
                  variant='outline'
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={isPending}
                >
                  {isPending ? 'Creating store...' : 'Continue'}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        {isPending && <p>Creating store...</p>}
        {isError && <p>Error: {error?.message}</p>}
        {isSuccess && <p>Store created successfully: {data?.name}</p>}
      </div>
    </Modal>
  );
};
