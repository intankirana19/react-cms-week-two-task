import { useMemo } from "react"
import { useCartStore } from "../stores/cart.store"

export function useCartTotals() {
  const items = useCartStore((s) => s.items)

  return useMemo(() => {
    const subtotal = items.reduce((a, b) => a + b.price * b.quantity, 0)
    const tax = subtotal * 0.11
    const total = subtotal + tax

    return { subtotal, tax, total }
  }, [items])
}
