import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type AuthState = {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist( // pakai persist utk simpan ke localstorage,kalau udh ada api?
    (set) => ({
      isAuthenticated: false,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage) // sementara simpan ke session utk auto logout pas closed,kalau udh ada api?
    }
  )
)
