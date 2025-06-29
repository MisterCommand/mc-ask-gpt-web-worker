import { useQuota } from './useQuota'; 

// Fetcher function for SWR
export const fetcher = <T>(...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json()) as Promise<T>;

export { useQuota };