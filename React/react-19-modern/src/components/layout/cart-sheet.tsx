import { AnimatePresence, motion } from 'motion/react'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { currencyFormatter } from '@/lib/utils'
import { selectCartCount, selectCartTotal, useCartStore } from '@/stores/cart-store'

export function CartSheet() {
  const items = useCartStore((state) => state.items)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clear = useCartStore((state) => state.clear)
  const count = useCartStore(selectCartCount)
  const total = useCartStore(selectCartTotal)

  function checkout() {
    toast.success('Order placed', {
      description: `${count} items · ${currencyFormatter.format(total)}`,
    })
    clear()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="relative" aria-label="Open cart">
          <ShoppingCart />
          <span className="hidden sm:inline">Cart</span>
          <AnimatePresence>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                className="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full bg-brand-600 text-[10px] font-bold text-white"
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </DialogTrigger>
      <DialogContent side="right">
        <DialogTitle>Your cart</DialogTitle>
        <DialogDescription>Persisted with Zustand middleware in localStorage.</DialogDescription>
        <ul className="flex flex-1 flex-col gap-3 overflow-y-auto">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.li
                key={item.product.id}
                layout
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                className="flex items-center gap-3 rounded-xl border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.product.name}</p>
                  <p className="text-xs text-zinc-500">
                    {currencyFormatter.format(item.product.price)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Decrease ${item.product.name}`}
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  >
                    <Minus />
                  </Button>
                  <span className="w-6 text-center text-sm tabular-nums">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Increase ${item.product.name}`}
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove ${item.product.name}`}
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 />
                  </Button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
          {items.length === 0 && (
            <li className="grid flex-1 place-items-center text-sm text-zinc-500">Cart is empty.</li>
          )}
        </ul>
        <div className="flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <span className="text-sm text-zinc-500">Total</span>
          <span className="text-lg font-semibold tabular-nums">
            {currencyFormatter.format(total)}
          </span>
        </div>
        <Button size="lg" disabled={items.length === 0} onClick={checkout}>
          Checkout
        </Button>
      </DialogContent>
    </Dialog>
  )
}
