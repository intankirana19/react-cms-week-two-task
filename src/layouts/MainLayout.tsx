import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100">
        <Header onToggleSidebar={() => setSidebarOpen((v) => !v)} />

        <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onToggle={() => setSidebarOpen((v) => !v)}
        />


        <main
            className={`transition-all duration-200 p-6 ${
            sidebarOpen ? "ml-56" : "ml-0"
            }`}
        >
            <Outlet />
        </main>
    </div>
  )
}
