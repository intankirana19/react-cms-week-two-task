import { memo, useCallback, useState } from "react"
// import { ConfirmRemoveDialog } from "../../../oldComponents/ConfirmRemoveDialog"
import type { ProductType } from "../../product/types/product"
import { useCartStore } from "../stores/cart.store"
import { RemoveFromCartConfirmationDialog } from "./RemoveFromCartConfirmationDialog"

export const AddToCartButton = memo(function AddToCartButton({ product }: { product: ProductType }) {
  const { items, addItem, updateQty, removeItem } = useCartStore()

  // const [confirmOpen, setConfirmOpen] = useState(false)
  const [openRemoveFromCartDialog, setOpenRemoveFromCartDialog] = useState(false);

  const cartItem = items.find((i) => i.id === product.id)

  const handleAdd = useCallback(() => {
    addItem({ id: product.id, name: product.name, price: Number(product.price) })
  }, [addItem, product])

  const handlePlus = useCallback(() => {
    updateQty(product.id, (cartItem?.quantity || 0) + 1)
  }, [updateQty, cartItem, product])

  const handleMinus = useCallback(() => {
    if (cartItem?.quantity === 1) setOpenRemoveFromCartDialog(true)
    else updateQty(product.id, cartItem!.quantity - 1)
  }, [cartItem, updateQty, product])

  if (!cartItem) {
    return (
      <button
        onClick={handleAdd}
        className="bg-[#7B1E3A] text-white px-3 py-1 rounded w-full h-full"
      >
        Add to Cart
      </button>
    )
  }

  return (
    <>
      <div className="flex justify-center items-center gap-2 w-full h-full">
        <button onClick={handleMinus} className="border px-2 rounded">-</button>
        <span>{cartItem.quantity}</span>
        <button onClick={handlePlus} className="border px-2 rounded">+</button>
      </div>

      <RemoveFromCartConfirmationDialog
        open={openRemoveFromCartDialog}
        onOpenChange={setOpenRemoveFromCartDialog}
        onConfirm={() => {
          removeItem(product.id)
          setOpenRemoveFromCartDialog(false)
        }}
      />

      {/* <ConfirmRemoveDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          removeItem(product.id)
          setConfirmOpen(false)
        }}
      /> */}
    </>
  )
})
