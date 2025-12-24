import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import type { ReactNode } from "react"

type ProtectedRouteProps = {
  children: ReactNode
}

export default function ProtectedRoute({ children }: Readonly<ProtectedRouteProps>) {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
