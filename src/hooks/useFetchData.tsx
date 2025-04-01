// hooks/useServiceFetch.ts
import useSWR from 'swr';
import { useEffect } from 'react';

type ServiceFunction<T> = () => Promise<T>;

export function useFetchData<T>(
  serviceFn: ServiceFunction<T>, 
  key: string, // Unique cache key
  options?: {
    refreshInterval?: number;
    fallbackData?: T;
    suspense?:boolean
  }
) {
  const { data, error, isLoading, mutate } = useSWR<T>(
    key,
    async () => {
      try {
        const dat = await serviceFn();
        return dat
      } catch (err) {
        console.error(`Error fetching ${key}:`, err);
        throw err;
      }
    },
    {
      refreshInterval: options?.refreshInterval || 5000, // Default 5s refetch
      fallbackData: options?.fallbackData,
      revalidateOnFocus: true,
      shouldRetryOnError: true,
    }
  );

  // Optional: Force refresh on mount
  useEffect(() => {
    mutate();
  }, [mutate]);

  return {
    data: data!,
    error,
    isLoading,
    mutate, // Manual refresh capability
  };
}