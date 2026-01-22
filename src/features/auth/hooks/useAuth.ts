import { useAuthStore } from "../stores/auth.store"

export function useAuth() {
  const { isAuthenticated, login, logout } = useAuthStore()
  return { isAuthenticated, login, logout }
}
