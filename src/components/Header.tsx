import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"

type Props = {
  onToggleSidebar: () => void
}

export default function Header({ onToggleSidebar }: Readonly<Props>) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/login")
  }

  return (
    <header className="bg-[#7B1E3A] text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="text-2xl">
          ☰
        </button>
        <span className="font-semibold tracking-wide">
          ADMIN TOKO INTAN
        </span>
      </div>

      <button
        onClick={handleLogout}
        className="bg-white text-[#7B1E3A] font-bold text-center px-3 py-1 rounded hover:bg-gray-100"
      >
        Keluar
      </button>
    </header>
  )
}
