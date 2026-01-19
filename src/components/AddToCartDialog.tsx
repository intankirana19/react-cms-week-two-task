import { useNavigate } from "react-router-dom"

type Props = {
  open: boolean
  onClose: () => void
}

export function AddToCartDialog({ open, onClose }: Readonly<Props>) {
  const navigate = useNavigate()

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded space-y-4 w-80">
        <p className="font-semibold">Produk berhasil ditambahkan ke keranjang!</p>

        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Kembali
          </button>

          <button
            onClick={() => navigate("/checkout")}
            className="px-4 py-2 bg-[#7B1E3A] text-white rounded"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  )
}
