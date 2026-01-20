import { memo } from "react"
import { Link } from "react-router-dom"
import { useCartStore } from "../store/cart.store"

export const HeaderCart = memo(function HeaderCart() {
  const count = useCartStore((s) =>
    s.items.reduce((a, b) => a + b.quantity, 0)
  )

  return (
    <Link to="/checkout" className="relative">
      Keranjang
      {
        // count > 0 && 
      (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
          {count}
        </span>
      )}
    </Link>
  )
})
