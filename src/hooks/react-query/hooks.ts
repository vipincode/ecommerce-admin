import { StoreProps } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { createStore } from './api';
import toast from 'react-hot-toast';

export function useCreateStore() {
  return useMutation<StoreProps, Error, StoreProps>({
    mutationFn: createStore,
    onSuccess: (data) => {
      toast.success('Store created successfully!');
      console.log('Store created successfully:', data);
    },
    onError: (error) => {
      toast.error(`Error creating store: ${error.message}`);
      console.error('Error creating store:', error);
    },
  });
}
