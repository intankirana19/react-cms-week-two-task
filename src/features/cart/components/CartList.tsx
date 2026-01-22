import { useCartStore } from "../stores/cart.store"
import { CartItemRow } from "./CartItemRow"

export function CartList() {
  const items = useCartStore((s) => s.items)

  if (!items.length) return <p>Keranjang kosong</p>

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <CartItemRow key={item.id} item={item} />
      ))}
    </div>
  )
}
