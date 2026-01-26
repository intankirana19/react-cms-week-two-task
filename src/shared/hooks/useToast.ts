import { create } from "zustand"
import type { ToastProps } from "../components/Toast"
 
type ToastInput = Omit<ToastProps, "id" | "onClose">
 
type ToastStore = {
  toasts: ToastProps[]
  addToast: (toast: ToastInput) => void
  removeToast: (id: string) => void
  success: (title: string, message?: string) => void
  error: (title: string, message?: string) => void
}
 
export const useToast = create<ToastStore>((set, get) => ({
  toasts: [],
 
  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random()}`
 
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          ...toast,
          id,
          onClose: get().removeToast,
        },
      ],
    }))
  },
 
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
 
  success: (title, message) =>
    get().addToast({ type: "success", title, message }),
 
  error: (title, message) =>
    get().addToast({ type: "error", title, message }),
}))