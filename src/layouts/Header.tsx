import { HeaderCart } from "../features/cart/components/HeaderCart"
import { useAuth } from "../features/auth/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { Button } from "../shared/components/Button"
import { LogOut, Menu } from "lucide-react"

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
    <header className="bg-primary-200 text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Menu onClick={onToggleSidebar} ></Menu>

        <span className="font-semibold tracking-wide">
          ADMIN TOKO INTAN
        </span>
      </div>

      <div className="flex items-center gap-6">
        <HeaderCart/>

        <Button variant="tertiary" size="sm" className="flex gap-2" onClick={handleLogout}>
          <LogOut></LogOut>
          Keluar
        </Button>
      </div>
    </header>
  )
}
