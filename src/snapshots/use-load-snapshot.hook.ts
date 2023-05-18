import { useMutation } from '@tanstack/react-query';

import { useSnapshots } from '~/snapshots/use-snapshot.hook';

export const useLoadSnapshot = () => {
  const { updateLocalState } = useSnapshots();
  return useMutation({
    mutationFn: async (id): Promise<null> => {
      const response = await fetch(`/api/snapshots/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return Promise.reject('Error loading snapshot.');
      }

      const data = await response.json();

      updateLocalState(data);
      return data;
    },
  });
};
