import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import type { UserSchemaType } from "../../../api/schemas/user.schema"

type AuthState = {
  accessToken: string | null;
  user: UserSchemaType | null
  isAuthenticated: boolean;
  setAccessToken: (token: string | null) => void;
  login: (token: string, user: UserSchemaType) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist( // pakai persist utk simpan ke localstorage,kalau udh ada api?
    (set,get) => ({
      accessToken: null,
      user: null,
      isAuthenticated: false,
      setAccessToken: (token) =>
        set({
          accessToken: token,
          isAuthenticated: !!token,
        }),
      login: (token,user) => set({ 
        accessToken: token,
        user,
        isAuthenticated: true 
      }),
      logout: () => set({ 
        accessToken: null,
        user: null,
        isAuthenticated: false 
      }),
      initialize: () => {
        const state = get();
        set({ isAuthenticated: !!state.accessToken });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage) // sementara simpan ke session utk auto logout pas closed,kalau udh ada api?
    }
  )
)
