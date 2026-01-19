import { memo, useCallback, useState } from "react"
import type { Product } from "../types/product"
import { useCartStore } from "../store/cart.store"
import { AddToCartDialog } from "./AddToCartDialog"

export const AddToCartButton = memo(function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem)
  const [open, setOpen] = useState(false)

  const handleAdd = useCallback(() => {
    addItem({ id: product.id, name: product.name, price: Number(product.price) })
    setOpen(true)
  }, [addItem, product])

  return (
    <>
      <button
        onClick={handleAdd}
        className="bg-[#7B1E3A] text-white px-3 py-1 rounded"
      >
        Add to Cart
      </button>

      <AddToCartDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
})
