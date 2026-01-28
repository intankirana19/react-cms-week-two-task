import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { UserSchemaType } from "../../../api/schemas/user.schema"

type AuthState = {
  user: UserSchemaType | null
  isAuthenticated: boolean
  login: (user: UserSchemaType | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist( // pakai persist utk simpan ke localstorage,kalau udh ada api?
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user,isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage) // sementara simpan ke session utk auto logout pas closed,kalau udh ada api?
    }
  )
)
