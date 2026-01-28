import { memo, useCallback, useState } from "react"
import type { CartItem } from "../types/cart"
import { useCartStore } from "../stores/cart.store"
// import { ConfirmRemoveDialog } from "../../../oldComponents/ConfirmRemoveDialog"
import { RemoveFromCartConfirmationDialog } from "./RemoveFromCartConfirmationDialog"
import { Button } from "../../../shared/components/Button"

export const CartItemRow = memo(function CartItemRow({ item }: { item: CartItem }) {
  const updateQty = useCartStore((s) => s.updateQty)
  const removeItem = useCartStore((s) => s.removeItem)

  // const [confirmOpen, setConfirmOpen] = useState(false)
  const [openRemoveFromCartDialog, setOpenRemoveFromCartDialog] = useState(false);

  const inc = useCallback(() => updateQty(item.id, item.quantity + 1), [item.id, item.quantity, updateQty])
  const dec = useCallback(() => {
      if (item.quantity === 1) setOpenRemoveFromCartDialog(true)
      else updateQty(item.id, item.quantity - 1)
  }, [item.id, item.quantity, updateQty])

  return (
    <>
      <div className="flex items-center justify-between border-b pb-2">
        <div>
          <p className="font-medium">{item.name}</p>
          <p className="text-sm">{item.price}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="tertiary" size="sm" onClick={dec}>-</Button>

          <span>{item.quantity}</span>

          <Button variant="tertiary" size="sm" onClick={inc}>+</Button>
          {/* <button onClick={() => removeItem(item.id)}>Hapus</button> */}
        </div>
      </div>

      <RemoveFromCartConfirmationDialog
              open={openRemoveFromCartDialog}
              onOpenChange={setOpenRemoveFromCartDialog}
              onConfirm={() => {
                removeItem(item.id)
                setOpenRemoveFromCartDialog(false)
              }}
            />

      {/* <ConfirmRemoveDialog
              open={confirmOpen}
              onClose={() => setConfirmOpen(false)}
              onConfirm={() => {
                removeItem(item.id)
                setConfirmOpen(false)
              }}
            /> */}
    </>
  )
})
