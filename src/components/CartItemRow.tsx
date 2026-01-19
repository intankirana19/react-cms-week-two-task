import { memo, useCallback } from "react"
import type { CartItem } from "../types/cart"
import { useCartStore } from "../store/cart.store"

export const CartItemRow = memo(function CartItemRow({ item }: { item: CartItem }) {
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)

  const inc = useCallback(() => updateQty(item.id, item.quantity + 1), [item, updateQty])
  const dec = useCallback(() => updateQty(item.id, item.quantity - 1), [item, updateQty])

  return (
    <div className="flex items-center justify-between border-b pb-2">
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-sm">{item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={dec}>-</button>
        <span>{item.quantity}</span>
        <button onClick={inc}>+</button>
        <button onClick={() => removeItem(item.id)}>Hapus</button>
      </div>
    </div>
  )
})
