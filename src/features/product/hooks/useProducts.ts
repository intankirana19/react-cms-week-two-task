// import { useProductStore } from "../store/product.store"

// export function useProducts() {
//   const products = useProductStore((s) => s.products)
//   const addProduct = useProductStore((s) => s.addProduct)
//   const updateProduct = useProductStore((s) => s.updateProduct)
//   const deleteProduct = useProductStore((s) => s.deleteProduct)
//   const loadProducts = useProductStore((s) => s.loadProducts)
//   const isLoaded = useProductStore((s) => s.isLoaded)

//   return {
//     products,
//     addProduct,
//     updateProduct,
//     deleteProduct,
//     loadProducts,
//     isLoaded
//   }
// }

import { useQueryClient } from "@tanstack/react-query"
import type { ProductInputSchemaType } from "../../../api/schemas/product.schema"
import type { ProductType } from "../types/product"

// type ProductInput = {
//   name: string
//   price: string
// }

export function useProducts() {
  const queryClient = useQueryClient()

  function addProduct(data: ProductInputSchemaType) {
    queryClient.setQueryData<ProductType[]>(["products"], (old) => [
      ...(old ?? []),
      {
        id: crypto.randomUUID(),
        name: data.name,
        price: String(data.price),
      },
    ])
  }

  function updateProduct(id: string, data: ProductInputSchemaType) {
    queryClient.setQueryData<ProductType[]>(["products"], (old) =>
      old
        ? old.map((p) => (p.id === id ? { ...p, ...data, price: String(data.price) } : p))
        : []
    )
  }

  function deleteProduct(id: string) {
    queryClient.setQueryData<ProductType[]>(["products"], (old) =>
      old ? old.filter((p) => p.id !== id) : []
    )
  }

  return {
    addProduct,
    updateProduct,
    deleteProduct,
  }
}
