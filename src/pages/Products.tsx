import { useNavigate } from "react-router-dom"
import { useProducts } from "../hooks/useProducts"

export default function Products() {
  const { products, deleteProduct } = useProducts()
  const navigate = useNavigate()

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
                    className="text-blue-600"
                  >
                    Ubah
                  </button>
                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="text-red-600"
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
