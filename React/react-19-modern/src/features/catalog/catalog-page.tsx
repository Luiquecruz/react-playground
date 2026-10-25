import { useSearchParams } from 'react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'motion/react'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { toast } from 'sonner'
import { PageHeader } from '@/components/layout/page-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { productCategories, type Product, type ProductCategory } from '@/lib/api'
import { productQueries } from '@/lib/queries'
import { cn, currencyFormatter } from '@/lib/utils'
import { useCartStore } from '@/stores/cart-store'
import { useToggleFavorite } from '@/features/catalog/use-toggle-favorite'

type CategoryFilter = ProductCategory | 'all' | 'favorites'

const filters: CategoryFilter[] = ['all', 'favorites', ...productCategories]

export function CatalogPage() {
  const { data: products } = useSuspenseQuery(productQueries.all())
  const [searchParams, setSearchParams] = useSearchParams()
  const activeFilter = (searchParams.get('category') ?? 'all') as CategoryFilter

  const visibleProducts = products.filter((product) => {
    if (activeFilter === 'all') {
      return true
    }
    if (activeFilter === 'favorites') {
      return product.favorite
    }
    return product.category === activeFilter
  })

  function selectFilter(filter: CategoryFilter) {
    setSearchParams(filter === 'all' ? {} : { category: filter }, { replace: true })
  }

  return (
    <>
      <PageHeader
        title="Catalog"
        description="Products are server state cached by TanStack Query, favorites use optimistic mutations with rollback, the cart is client state in a persisted Zustand store and the filter lives in the URL."
        tags={[
          'useSuspenseQuery',
          'useMutation',
          'zustand/persist',
          'useSearchParams',
          'motion layout',
        ]}
      />
      <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Filter products">
        {filters.map((filter) => (
          <Button
            key={filter}
            size="sm"
            variant={filter === activeFilter ? 'primary' : 'outline'}
            className="capitalize"
            aria-pressed={filter === activeFilter}
            onClick={() => selectFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
      <motion.ul layout className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibleProducts.map((product) => (
            <motion.li
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            >
              <ProductCard product={product} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {visibleProducts.length === 0 && (
        <p className="text-center text-sm text-zinc-500">No products match this filter.</p>
      )}
    </>
  )
}

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)
  const quantityInCart = useCartStore(
    (state) => state.items.find((item) => item.product.id === product.id)?.quantity ?? 0,
  )
  const toggleFavorite = useToggleFavorite()

  function addToCart() {
    addItem(product)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative grid h-36 place-items-center bg-gradient-to-br from-brand-50 to-indigo-100 text-4xl font-black text-brand-600/30 dark:from-brand-700/20 dark:to-indigo-900/30">
        {product.name
          .split(' ')
          .map((word) => word[0])
          .join('')}
        <motion.button
          whileTap={{ scale: 0.8 }}
          aria-label={product.favorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-pressed={product.favorite}
          onClick={() => toggleFavorite.mutate(product.id)}
          className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/80 text-zinc-500 shadow-sm backdrop-blur dark:bg-zinc-900/80"
        >
          <Heart className={cn('size-4', product.favorite && 'fill-rose-500 text-rose-500')} />
        </motion.button>
      </div>
      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold">{product.name}</p>
            <Badge variant="neutral" className="mt-1 capitalize">
              {product.category}
            </Badge>
          </div>
          <span className="flex items-center gap-1 text-sm text-amber-500">
            <Star className="size-4 fill-current" />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-bold tabular-nums">
            {currencyFormatter.format(product.price)}
          </span>
          <Button size="sm" onClick={addToCart}>
            <ShoppingCart />
            {quantityInCart > 0 ? `In cart (${quantityInCart})` : 'Add'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
