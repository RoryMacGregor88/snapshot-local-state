import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { z } from 'zod';

const APP_CONFIG_ENDPOINT = 'http://localhost:3000/api/app/config';

export const AppConfigData = z.object({
  name: z.string(),
});

export type AppConfig = z.infer<typeof AppConfigData>;

export const useAppConfig = (): UseQueryResult<AppConfig> =>
  useQuery({
    placeholderData: { name: '' },
    queryKey: ['appConfig'],
    queryFn: async () => {
      const response = await fetch(APP_CONFIG_ENDPOINT);
      if (!response.ok) {
        const error = await response.json();

        throw new Error(`Error fetching app config, Message: ${error.message}`);
      } else {
        const data: AppConfig = await response.json();

        return AppConfigData.parse(data);
      }
    },
  });
