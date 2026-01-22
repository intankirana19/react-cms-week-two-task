// import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDebounce } from "../../../shared/hooks/useDebounce"
import ProductSearch from "../../../oldComponents/ProductSearch"
import { useSuspenseQuery } from "@tanstack/react-query"
// import { fetchProducts } from "../api/products"
import { useErrorBoundary } from "react-error-boundary"
import { productService } from "../../../api/services/product.service"
import { AddToCartButton } from "../../cart/components/AddToCartButton"
import { useProducts } from "../hooks/useProducts"
import type { ProductType } from "../types/product"
import { ProductFormDialog } from "../components/ProductFormDialog"
import type { ProductInputSchemaType } from "../../../api/schemas/product.schema"

export default function Products() {
  const [search, setSearch] = useState("")
  const [openProductFormDialog, setOpenProductFormDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null)

  // const navigate = useNavigate()
  const { addProduct, updateProduct,deleteProduct } = useProducts()
  const debouncedSearch = useDebounce(search, 500)
  const { showBoundary } = useErrorBoundary();
  const { data: products, isError, error } = useSuspenseQuery<ProductType[]>({
    queryKey: ["products"],
    queryFn: () => productService.getList(),
    // queryFn: fetchProducts,
  })

  if(isError) {
    showBoundary(error)
    return null
  }

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  const handleAddProduct = () => {
    setSelectedProduct(null)
    setOpenProductFormDialog(true)
  }

  const handleEditProduct = (product: ProductType) => {
    setSelectedProduct(product)
    setOpenProductFormDialog(true)
  }

  const handleUpdate = async (id: string | null, input: ProductInputSchemaType) => {
    if (id) {
      updateProduct(id, input)
    } else {
      addProduct(input)
    }

    setOpenProductFormDialog(false)
  }


  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Produk</h1>

        <div className="flex gap-2">
          <ProductSearch value={search} onChange={setSearch} />

          <button
            onClick={handleAddProduct}
            className="bg-[#7B1E3A] text-white px-4 py-2 rounded"
          >
            + Tambah Produk
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">Tidak ada produk.</p>
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Nama</th>
              <th className="p-2 text-left">Harga</th>
              <th className="p-2"></th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.price}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => handleEditProduct(p)}
                    className="bg-white border-2 border-grey-50 px-4 py-2 rounded"
                  >
                    Ubah
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="bg-white border-2 border-[#7B1E3A] text-[#7B1E3A] px-4 py-2 rounded"
                  >
                    Hapus
                  </button>
                  <div className="w-28">
                    <AddToCartButton product={p} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ProductFormDialog
        open={openProductFormDialog}
        onOpenChange={setOpenProductFormDialog}
        product={selectedProduct}
        onSubmit={handleUpdate}
      />
    </div>

    
  )
}
