import useSWR from 'swr';
import { fetcher } from '.';

interface QuotaResponse {
  quota: number;
}

interface UseQuotaReturn {
  quota: number;
  isLoading: boolean;
  error: Error | undefined;
  mutate: () => void;
}

export function useQuota(): UseQuotaReturn {
  const { data, error, isLoading, mutate } = useSWR<QuotaResponse>(
    "/api/quota",
    fetcher<QuotaResponse>,
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: false,
    }
  );

  return {
    quota: data?.quota || 0,
    isLoading,
    error,
    mutate,
  };
} 