import {useState, useEffect, useMemo} from "react"

export function useCart() {
  const [items, setItems] = useState(() => {
    if (typeof window === "undefined") return []
    const savedCart = localStorage.getItem("cart")
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
    console.log('items',items)
    console.log('totalItems',totalItems)
    console.log('totalPrice',totalPrice)
    console.log('addItem',addItem)
    console.log('removeItem',removeItem)
    console.log('updateItemQuantity',updateItemQuantity)
    console.log('clearCart', clearCart)
  }, [items]);

  const totalItems = useMemo(() =>
    items.reduce((sum, item) => sum + item.quantity, 0), [items]
  );

  const totalPrice = useMemo(() =>
      items.reduce((sum, item) => sum + (item.price_info.price * item.quantity), 0).toFixed(2),
    [items]
  );

  const addItem = (item, quantity = 1) => {
    setItems(prev => {
      const existingItems = prev.find(i => i.sku === item.sku);

      if (existingItems) {
        return prev.map(i => i.sku === item.sku ? {...i, quantity: i.quantity + quantity} : i);
      }

      return [...prev, {...item, quantity}]
    });
  };

  const removeItem = (sku) => {
    setItems(prev => prev.filter(item => item.sku !== sku));
  };

  const updateItemQuantity = (sku, quantity) => {
    if (quantity < 0) {
      removeItem(sku)
      return
    }

    setItems(prev => prev.map(item => item.sku === sku ? {...item, quantity} : item));
  };

  const clearCart = () => setItems([]);

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart
  }
}