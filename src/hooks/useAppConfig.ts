import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { z } from 'zod';

export const AppConfigData = z.object({
  name: z.string(),
});

type AppConfig = z.infer<typeof AppConfigData>;

export const useAppConfig = (): UseQueryResult<AppConfig> =>
  useQuery(
    ['appConfig'],
    async () => {
      const response = await fetch('api/app/config');

      if (response.ok) {
        const data: AppConfig = await response.json();
        return AppConfigData.parse(data);
      }
    },
    {
      retry: 5,
    },
  );
