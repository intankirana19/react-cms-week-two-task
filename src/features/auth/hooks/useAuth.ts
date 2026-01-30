import { useAuthStore } from "../stores/auth.store"

export function useAuth() {
  const { isAuthenticated, login, logout } = useAuthStore() //store udh diganti buat mutation useLogin
  return { isAuthenticated, login, logout }
}
