import { beforeEach, describe, expect, it } from 'vitest'
import type { Product } from '@/lib/api'
import { selectCartCount, selectCartTotal, useCartStore } from '@/stores/cart-store'

const headphones: Product = {
  id: 'p-1',
  name: 'Aurora Headphones',
  category: 'audio',
  price: 249,
  rating: 4.8,
  favorite: false,
}

const mouse: Product = {
  id: 'p-9',
  name: 'Glide Wireless Mouse',
  category: 'computing',
  price: 69,
  rating: 4.3,
  favorite: false,
}

describe('cart store', () => {
  beforeEach(() => {
    useCartStore.getState().clear()
  })

  it('adds new products and increments existing ones', () => {
    const { addItem } = useCartStore.getState()
    addItem(headphones)
    addItem(headphones)
    addItem(mouse)

    const state = useCartStore.getState()
    expect(state.items).toHaveLength(2)
    expect(selectCartCount(state)).toBe(3)
    expect(selectCartTotal(state)).toBe(249 * 2 + 69)
  })

  it('removes the item when quantity reaches zero', () => {
    const { addItem, updateQuantity } = useCartStore.getState()
    addItem(mouse)
    updateQuantity(mouse.id, 0)

    expect(useCartStore.getState().items).toEqual([])
  })

  it('removes a specific item', () => {
    const { addItem, removeItem } = useCartStore.getState()
    addItem(headphones)
    addItem(mouse)
    removeItem(headphones.id)

    expect(useCartStore.getState().items.map((item) => item.product.id)).toEqual([mouse.id])
  })
})
