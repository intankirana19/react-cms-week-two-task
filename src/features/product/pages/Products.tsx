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
import { Pagination } from "../../../shared/components/Pagination"

export default function Products() {
  const [search, setSearch] = useState("")
  const [openProductFormDialog, setOpenProductFormDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Produk</h1>

        <div className="flex gap-2">
          <ProductSearch value={search} onChange={setSearch} />

          <button
            onClick={handleAddProduct}
            className="bg-primary-200 text-white px-4 py-2 rounded"
          >
            + Tambah Produk
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">Tidak ada produk.</p>
      ) : (
        <>
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Nama</th>
              <th className="p-2 text-left">Harga</th>
              <th className="p-2"></th>
            </tr>
          </thead>

          <tbody>
            {paginatedProducts.map((p) => (
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
                    className="bg-white border-2 border-primary-200 text-primary-200 px-4 py-2 rounded"
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

        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredProducts.length}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
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
