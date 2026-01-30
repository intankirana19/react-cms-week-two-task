import { Navigate } from "react-router-dom"
import type { ReactNode } from "react"

type RoleGuardProps = {
  children: ReactNode,
  isAllowed: boolean
}

export default function RoleGuard({ children,isAllowed }: Readonly<RoleGuardProps>) {
  if (!isAllowed) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
