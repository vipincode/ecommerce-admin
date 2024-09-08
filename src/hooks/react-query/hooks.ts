import { StoreProps } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { createStore } from './api';
import toast from 'react-hot-toast';

export function useCreateStore() {
  return useMutation<StoreProps, Error, StoreProps>({
    mutationFn: createStore,
    onSuccess: (data) => {
      toast.success('Store created successfully!');

      //this is set the url after reset if anybody try to remove url it get back to same url
      window.location.assign(`/${data?.id}`);
      console.log('Store created successfully:', data);
    },
    onError: (error) => {
      toast.error(`Error creating store: ${error.message}`);
      console.error('Error creating store:', error);
    },
  });
}
