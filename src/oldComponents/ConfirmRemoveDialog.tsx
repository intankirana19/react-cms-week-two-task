type Props = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function ConfirmRemoveDialog({ open, onClose, onConfirm }: Readonly<Props>) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded space-y-4 w-80">
        <p className="font-semibold">Yakin mau menghapus produk ini dari keranjang?</p>

        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Kembali
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  )
}
