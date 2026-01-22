import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import { useToggle } from "../shared/hooks/useToggle"
import Header from "./Header"

export default function MainLayout() {
  const sidebar = useToggle(false)

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onToggleSidebar={sidebar.toggle} />

      <Sidebar
        open={sidebar.value}
        onClose={sidebar.close}
        onToggle={sidebar.toggle}
      />

      <main
        className={`transition-all duration-200 p-6 ${
          sidebar.value ? "ml-56" : "ml-0"
        }`}
      >
        <Outlet />
      </main>
    </div>
  )
}
