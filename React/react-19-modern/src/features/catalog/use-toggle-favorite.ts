import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { toggleProductFavorite, type Product } from '@/lib/api'
import { productQueries } from '@/lib/queries'

export function useToggleFavorite() {
  const queryClient = useQueryClient()
  const queryKey = productQueries.all().queryKey

  return useMutation({
    mutationFn: toggleProductFavorite,
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey })
      const previousProducts = queryClient.getQueryData<Product[]>(queryKey)
      queryClient.setQueryData<Product[]>(queryKey, (products = []) =>
        products.map((product) =>
          product.id === productId ? { ...product, favorite: !product.favorite } : product,
        ),
      )
      return { previousProducts }
    },
    onError: (error, _productId, context) => {
      queryClient.setQueryData(queryKey, context?.previousProducts)
      toast.error(error.message)
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  })
}
