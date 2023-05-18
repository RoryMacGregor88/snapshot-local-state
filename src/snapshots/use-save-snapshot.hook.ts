import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useSnapshots } from '~/snapshots/use-snapshot.hook';

export const useSaveSnapshot = () => {
  const QC = useQueryClient();
  const { localState } = useSnapshots();
  console.log('locaolState: ', localState);
  return useMutation({
    mutationKey: ['snapshots'],
    mutationFn: async (): Promise<null> => {
      const response = await fetch('/api/snapshots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(localState),
      });

      if (!response.ok) {
        return Promise.reject('Error saving snapshot.');
      }

      return await response.json();
    },
    onSuccess: () => {
      QC.invalidateQueries(['snapshots']);
    },
  });
};
