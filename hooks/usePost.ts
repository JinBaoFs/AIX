// lib/request.ts
import axios from '@w/lib/axios'

export const postData = <T = any>(
  url: string,
  data?: any,
  headers: Record<string, string> = {}
) => {
  return axios.post<T>(url, data, {
    headers: {
      'Content-Type': 'application/json', // 默认
      ...headers,
    },
  })
}
