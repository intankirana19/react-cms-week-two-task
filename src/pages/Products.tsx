import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useDebounce } from "../hooks/useDebounce"
import ProductSearch from "../components/ProductSearch"
import { useSuspenseQuery } from "@tanstack/react-query"
// import { fetchProducts } from "../api/products"
import { useProducts } from "../hooks/useProducts"
import type { Product } from "../types/product"
import { productService } from "../api/services"

export default function Products() {
  const navigate = useNavigate()
  const { deleteProduct } = useProducts()

  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 500)

  const { data: products } = useSuspenseQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => productService.getList(),
    // queryFn: fetchProducts,
  })

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Produk</h1>

        <div className="flex gap-2">
          <ProductSearch value={search} onChange={setSearch} />

          <button
            onClick={() => navigate("/products/new")}
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
                    onClick={() => navigate(`/products/${p.id}/edit`)}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
