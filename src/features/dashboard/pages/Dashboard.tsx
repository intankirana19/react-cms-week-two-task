import { useSuspenseQuery } from "@tanstack/react-query"
import { fetchProducts } from "../../../api/products"
import type { ProductType } from "../../product/types/product"

export default function Dashboard() {
  const { data: products } = useSuspenseQuery<ProductType[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Dashboard
      </h1>

      <div className="bg-white p-4 rounded shadow w-64">
        <p className="text-gray-500">Total Produk</p>
        <p className="text-3xl font-bold text-primary-200">
          {products.length}
        </p>
      </div>
    </>
  )
}
