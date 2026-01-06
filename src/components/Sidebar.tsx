import { useNavigate } from "react-router-dom"

type Props = {
  open: boolean
  onClose: () => void
  onToggle: () => void
}

export default function Sidebar({open, onClose, onToggle}: Readonly<Props>) {
  const navigate = useNavigate()

  if (!open) return null

  return (
    <aside className="fixed top-0 left-0 h-full w-56 bg-[#7B1E3A] text-white z-50">
      <div className="p-4 font-semibold border-b border-white/20 flex items-center gap-3">
        <button
          onClick={onToggle}
          className="text-xl leading-none"
        >
          ☰
        </button>
        <span>Menu</span>
      </div>

      <nav className="p-4 space-y-2">
        <button
            type="button"
            className="w-full text-left px-2 py-1 rounded hover:bg-[#9B2C4A]"
            onClick={() => {
                navigate("/products")
                onClose()
            }}
            >
            Produk
        </button>


        <div className="px-2 py-1 text-white/50 cursor-not-allowed">
          Menu 2
        </div>

        <div className="px-2 py-1 text-white/50 cursor-not-allowed">
          Menu 3
        </div>
      </nav>
    </aside>
  )
}
