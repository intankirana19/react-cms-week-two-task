import { useProducts } from "../hooks/useProducts"

export default function Dashboard() {
  const { products } = useProducts()

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Dashboard
      </h1>

      <div className="bg-white p-4 rounded shadow w-64">
        <p className="text-gray-500">Total Produk</p>
        <p className="text-3xl font-bold text-[#7B1E3A]">
          {products.length}
        </p>
      </div>
    </>
  )
}
