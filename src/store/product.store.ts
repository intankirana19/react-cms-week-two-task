import { create } from "zustand"

export type Product = {
  id: number
  name: string
  price: number
}

type ProductState = {
  products: Product[]
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: number, data: Omit<Product, "id">) => void
  deleteProduct: (id: number) => void
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],

  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        { id: Date.now(), ...product },
      ],
    })),

  updateProduct: (id, data) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
}))
