import { create } from "zustand"
import { fetchProducts } from "../../../api/products"
import type { ProductType } from "../types/product"

type ProductInput = {
  name: string
  price: string
}

type ProductState = {
  products: ProductType[]
  isLoaded: boolean
  loadProducts: () => Promise<void>
  addProduct: (data: ProductInput) => void
  updateProduct: (id: string, data: ProductInput) => void
  deleteProduct: (id: string) => void
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  isLoaded: false,

  loadProducts: async () => {
    if (get().isLoaded) return

    const apiProducts = await fetchProducts()

    set({
      products: apiProducts,
      isLoaded: true,
    })
  },

  addProduct: (data) =>
    set((state) => ({
      products: [
        ...state.products,
        {
          id: crypto.randomUUID(),
          name: data.name,
          price: data.price,
        },
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