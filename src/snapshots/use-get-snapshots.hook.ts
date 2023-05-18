import { useQuery } from '@tanstack/react-query';

export const useGetSnapshots = () =>
  useQuery({
    queryKey: ['snapshots'],
    queryFn: async () => {
      const response = await fetch('/api/snapshots');

      if (!response.ok) {
        return Promise.reject('Error fetching snapshots.');
      }

      return await response.json();
    },
  });
