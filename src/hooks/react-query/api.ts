import { StoreProps } from '@/types';
import axios from 'axios';

/**
 * @CreateStore
 * Create a new store by sending data to the API.
 */
export const createStore = async (values: StoreProps) => {
  const response = await axios.post('/api/stores', values);
  return response.data;
};
