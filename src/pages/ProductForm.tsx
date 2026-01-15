import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useSuspenseQuery } from "@tanstack/react-query"
import { fetchProducts } from "../api/products"
import { useProducts } from "../hooks/useProducts"
import type { Product } from "../types/product"
import { zodResolver } from "@hookform/resolvers/zod"
import { productInputSchema, type ProductInput } from "../api/schemas/product.schema"

// type FormValues = {
//   name: string
//   price: string
// }

export default function ProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addProduct, updateProduct } = useProducts()

  const { data: products } = useSuspenseQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  })

  const editingProduct = products.find((p) => p.id === id)

  const { register, handleSubmit, formState: { errors }  } = useForm<ProductInput>({
    resolver: zodResolver(productInputSchema),
    defaultValues: editingProduct ?  {
      name: editingProduct.name,
      price: Number(editingProduct.price),
    }: {
      name: "",
      price: 0,
    },
  })

  function onSubmit( data: ProductInput) {
    if (editingProduct) {
      updateProduct(editingProduct.id, data)
    } else {
      addProduct(data)
    }

    navigate("/products")
  }

  // const { register, handleSubmit } = useForm<FormValues>({
  //   defaultValues: editingProduct ?? {
  //     name: "",
  //     price: "0",
  //   },
  // })

  // function onSubmit(data: FormValues) {
  //   if (editingProduct) {
  //     updateProduct(editingProduct.id, data)
  //   } else {
  //     addProduct(data)
  //   }

  //   navigate("/products")
  // }

  return (
    <div className="flex justify-center mt-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow w-full max-w-md"
      >
        <h1 className="text-xl font-bold mb-4">
          {editingProduct ? "Ubah" : "Tambah"}
        </h1>

        <input
          {...register("name")}
          placeholder="Nama Produk"
          className="border p-2 w-full mb-3"
        />
        {errors.name && 
            <p className="text-sm text-red-600 mt-1">
              {errors.name.message}
            </p>
        }

        <input
          {...register("price")}
          type="number"
          placeholder="Harga"
          className="border p-2 w-full mb-4"
        />
        {errors.price && 
          <p className="text-sm text-red-600 mt-1">
            {errors.price.message}
          </p>
        }

        <button className="bg-[#7B1E3A] cursor-pointer text-white px-4 py-2 rounded w-full">
          Simpan
        </button>
      </form>
    </div>
  )
}
