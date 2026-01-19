import { useCartStore } from "../store/cart.store"
import type { CartItem } from "../types/cart"


export function CartItemRow({ item }: Readonly<{ item: CartItem }>) {
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)

  return (
    <div className="flex items-center justify-between border-b pb-2">
      <div>
        <p className="font-medium">{item.name}</p>
        <p className="text-sm">Rp {item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => updateQty(item.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQty(item.id, item.quantity + 1)}>+</button>
        <button onClick={() => removeItem(item.id)}>Hapus</button>
      </div>
    </div>
  )
}
