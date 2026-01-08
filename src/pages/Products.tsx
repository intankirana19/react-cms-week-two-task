import { useNavigate } from "react-router-dom"
import { useProducts } from "../hooks/useProducts"
import { useEffect } from "react"

export default function Products() {
  const { products, deleteProduct, loadProducts, isLoaded } = useProducts()
  const navigate = useNavigate()

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  if(!isLoaded) return <div className="flex justify-center mt-12">Sedang memuat data...</div>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Produk</h1>

        <button
          onClick={() => navigate("/products/new")}
          className="bg-[#7B1E3A] text-white px-4 py-2 rounded"
        >
          + Tambah Produk
        </button>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">Belum Ada Produk</p>
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
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">{p.name}</td>
                <td className="p-2">{p.price}</td>
                <td className="p-2 flex gap-2 justify-center">
                  <button
                    onClick={() =>
                      navigate(`/products/${p.id}/edit`)
                    }
                    className="bg-white border-2 border-grey-50 text-grey-50 px-4 py-2 rounded cursor-pointer hover:bg-grey-100 hover:text-white"
                  >
                    Ubah
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="bg-white border-2 border-[#7B1E3A] text-[#7B1E3A] px-4 py-2 rounded cursor-pointer hover:bg-[#7B1E3A] hover:text-white"
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
