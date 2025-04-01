import useSWR from 'swr';

export function useUsers() {
  return useSWR('all-users');
}

export function useProducts() {
  return useSWR('/api/products');
}