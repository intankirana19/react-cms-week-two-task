import { useNavigate } from "react-router-dom"
// import { useCallback } from "react"
import { CartList } from "../components/CartList"
import { CartSummary } from "../components/CartSummary"
import { useCartStore } from "../stores/cart.store"
import { Button } from "../../../shared/components/Button"
import { useToast } from "../../../shared/hooks/useToast"
import { ToastContainer } from "../../../shared/components/Toast"

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items)
  const clear = useCartStore((s) => s.clear)
  const navigate = useNavigate()

  const { 
    toasts, 
    success,
    error 
  } = useToast();

  // const handleSubmit = useCallback(() => {
  //   alert("Pembayaran berhasil!")
  //   clear()
  //   navigate("/products")
  // }, [clear, navigate])

  const handleSubmit = () => {
    try {
      // console.log(input)
      success("Pembayaran berhasil!")
      clear()
      navigate("/products")
    } catch {
      error("Pembayaran gagal.")
    }
  }

  if (!items.length) {
    return <p>Keranjang kosong</p>
  }

  return (
    <>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Checkout</h1>

        <CartList />
        <CartSummary />

        <Button onClick={handleSubmit}>Bayar Sekarang</Button>

        {/* <button
          onClick={handleSubmit}
          className="bg-primary-200 text-white px-6 py-3 rounded"
        >
          Bayar Sekarang
        </button> */}
      </div>

      <ToastContainer toasts={toasts} />
    </>
  )
}
