import { useProductStore } from "../store/product.store"

export function useProducts() {
  const products = useProductStore((s) => s.products)
  const addProduct = useProductStore((s) => s.addProduct)
  const updateProduct = useProductStore((s) => s.updateProduct)
  const deleteProduct = useProductStore((s) => s.deleteProduct)

  return {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  }
}
