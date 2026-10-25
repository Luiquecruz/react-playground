import { QueryClient, queryOptions } from '@tanstack/react-query'
import { fetchMessages, fetchMetrics, fetchProducts } from '@/lib/api'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
    },
  },
})

export const productQueries = {
  all: () => queryOptions({ queryKey: ['products'], queryFn: fetchProducts }),
}

export const messageQueries = {
  all: () => queryOptions({ queryKey: ['messages'], queryFn: fetchMessages }),
}

export const metricQueries = {
  all: () => queryOptions({ queryKey: ['metrics'], queryFn: fetchMetrics }),
}
