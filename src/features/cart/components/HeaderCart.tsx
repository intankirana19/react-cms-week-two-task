import { memo } from "react"
import { Link } from "react-router-dom"
import { useCartStore } from "../stores/cart.store"

export const HeaderCart = memo(function HeaderCart() {
  const count = useCartStore((s) =>
    s.items.reduce((a, b) => a + b.quantity, 0)
  )

  return (
    <Link to="/checkout" className="relative bg-black text-white font-bold text-center px-3 pt-0.75 pb-1.5 rounded hover:bg-gray-800 cursor-pointer">
      Keranjang
      {
        // count > 0 && 
      (
        <span className="absolute -top-2 -right-2 bg-white border-2 border-primary-200 text-primary-200 text-xs rounded-full px-1">
          {count}
        </span>
      )}
    </Link>
  )
})
