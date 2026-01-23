import { memo } from "react"
import { Link } from "react-router-dom"
import { useCartStore } from "../stores/cart.store"
// import { Button } from "../../../shared/components/Button"
import { ShoppingCart } from "lucide-react"

export const HeaderCart = memo(function HeaderCart() {
  const count = useCartStore((s) =>
    s.items.reduce((a, b) => a + b.quantity, 0)
  )

  return (
    // <Link to="/checkout" className="relative bg-black text-white font-bold text-center px-3 pt-0.75 pb-1.5 rounded hover:bg-gray-800 cursor-pointer">
    <Link to="/checkout" className="relative">
      {/* <Button variant="secondary" className="relative"> */}
        <ShoppingCart className="text-white w-6 h-6"></ShoppingCart>
        {
            // count > 0 && 
          (
            <span className="absolute -top-2 -right-3 bg-white border-2 border-primary-200 text-primary-200 text-[10px] rounded-full w-5 h-5 text-center">
              <p>{count}</p>
            </span>
        )}
      {/* </Button> */}
    </Link>
  )
})
