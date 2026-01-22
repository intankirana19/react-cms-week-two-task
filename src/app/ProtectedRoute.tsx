import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"
import { useAuth } from "../features/auth/hooks/useAuth"

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
