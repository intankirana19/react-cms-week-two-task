import { useCartTotals } from "../hooks/useCartTotals"

export function CartSummary() {
  const { subtotal, tax, total } = useCartTotals()

  return (
    <div className="space-y-1 border-t pt-3">
      <p>Subtotal: {subtotal}</p>
      <p>PPN (11%): {tax}</p>
      <h3 className="font-semibold">Total: {total}</h3>
    </div>
  )
}
