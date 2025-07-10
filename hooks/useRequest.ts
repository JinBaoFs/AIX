import useSWR, { SWRConfiguration } from 'swr'
import axios from '@w/lib/axios'

export const fetcher = (url: string) => axios.get(url).then(res => res.data)

export function useRequest<T = any>(
  url: string | null,
  config?: SWRConfiguration
) {
  const shouldFetch = typeof url === 'string' ? url : null

  const { data, error, isLoading, mutate } = useSWR<T>(
    shouldFetch,  // ✅ 这样就符合 StrictKey 类型要求
    fetcher,
    config
  )

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
